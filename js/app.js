/*
 This file is part of Chromarks.

 Copyright (c) 2012, James Nuzzi

 Chromarks is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Chromarks is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Chromarks.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.require([
  'Ext.data.Proxy',
  'Ext.data.ResultSet',
  'Ext.data.Model',
  'Ext.data.TreeStore',
  'Ext.menu.Menu',
  'Ext.MessageBox',
  'Ext.container.Viewport',
  'Ext.tree.Panel'
]);

var tree;

function loadChildren(children, marks) {
  for (var i = 0; i < children.length; i++) {
    var result = children[i];
    var mark = Ext.create('Chromarks.model.Mark', {
      id: result.id,
      text: result.title,
      qtitle: (result.url && result.url.length > 0 ? result.title : undefined),
      qtip: (result.url && result.url.length > 0 ? '<u>' + result.url + '</u><br/><br/>' + new Date(result.dateAdded).toLocaleString().replace(/ \(.*?\)/i, "") : undefined),
      url: result.url,
      icon: (result.url && result.url.length > 0 ? "chrome://favicon/" + result.url : undefined),
      leaf: (result.url && result.url.length > 0),
      singleClickExpand: (result.url && result.url.length > 0 ? undefined : true),
      allowDrag: (result.url && result.url.length > 0),
      allowDrop: !(result.url && result.url.length > 0),
      expanded: (result.id === '1')
    });

    marks.push(mark);
  }
}

Ext.define("Chromarks.proxy.Marks", {
  extend: 'Ext.data.Proxy',
  alias: 'proxy.marks',
  update: function(operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      if (operation.records[0].modified.parentId) {
        chrome.bookmarks.move(operation.records[0].get('id'), { parentId: operation.records[0].parentNode.get('id') }, function() {
          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback == "function") {
            callback.call(scope || thisProxy, operation);
          }
        });
      } else if (operation.records[0].modified.text) {
        chrome.bookmarks.update(operation.records[0].get('id'), { title: operation.records[0].get('text') }, function() {
          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback == "function") {
            callback.call(scope || thisProxy, operation);
          }
        });
      }
    } else {
      operation.setException('Cannot update more than one node.');
      operation.setCompleted();

      if (typeof callback == "function") {
        callback.call(scope || thisProxy, operation);
      }
    }
  },
  destroy: function(operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      chrome.bookmarks.remove(operation.records[0].get('id'), function() {
        operation.setSuccessful();
        operation.setCompleted();

        if (typeof callback == "function") {
          callback.call(scope || thisProxy, operation);
        }
      });
    } else {
      operation.setException('Cannot delete more than one node.');
      operation.setCompleted();

      if (typeof callback == "function") {
        callback.call(scope || thisProxy, operation);
      }
    }
  },
  read: function(operation, callback, scope) {
    var thisProxy = this;

    if (operation.params.node === "root"){
      chrome.bookmarks.getTree(function(results){
        var marks = [];
        var children = results[0].children;

        loadChildren(children, marks);

        //return model instances in a result set
          operation.resultSet = new Ext.data.ResultSet({
            records: marks,
            total  : marks.length,
            loaded : true
          });

          //announce success
          operation.setSuccessful();
          operation.setCompleted();

          //finish with callback
          if (typeof callback == "function") {
            callback.call(scope || thisProxy, operation);
          }
      });
    } else {
      chrome.bookmarks.getChildren(operation.params.node, function(results){
        var marks = [];

        loadChildren(results, marks);

        //return model instances in a result set
          operation.resultSet = new Ext.data.ResultSet({
            records: marks,
            total  : marks.length,
            loaded : true
          });

          //announce success
          operation.setSuccessful();
          operation.setCompleted();

          //finish with callback
          if (typeof callback == "function") {
            callback.call(scope || thisProxy, operation);
          }
      });
    }
  }
});

Ext.define('Chromarks.model.Mark', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'text', type: 'string'},
    { name: 'url', type: 'string'}
  ],
  hasMany: { model: 'Chromarks.model.Mark', name: 'children' },
  proxy: { type: 'marks' }
});

var store = Ext.create('Ext.data.TreeStore', {
  model: 'Chromarks.model.Mark',
  autoLoad: true,
  autoSync: true,
  folderSort: true,
  sorters: [
    { property: 'text', direction: 'ASC' }
  ],
  root: {
    expanded: true
  }
});

var ctxMenu = new Ext.menu.Menu({
  items: [
    {
      text: 'Open in new tab',
      icon: 'icons/new-tab.png',
      handler: function() {
        chrome.tabs.create({ url: tree.getSelectionModel().getLastSelected().get('url'), selected: false });
      }
    },
    '-',
    {
      text: 'Rename',
      icon: 'icons/rename.png',
      handler: function() {
        Ext.MessageBox.prompt(
            'Rename Bookmark',
            'Bookmark Name:',
            function(buttonId, text) {
              if (buttonId === 'ok') {
                var node = tree.getSelectionModel().getLastSelected();

                node.set('text', text);
                node.commit(false);
              }
            },
            this,
            false,
            tree.getSelectionModel().getLastSelected().get('text')
        );
      }
    },
    {
      text: 'Delete',
      icon: 'icons/delete.png',
      handler: function() {
        var selectedNode = tree.getSelectionModel().getLastSelected();

        if (selectedNode != tree.getRootNode()) {
          Ext.MessageBox.maxWidth = 300;
          Ext.Msg.confirm('Delete Bookmark', '<p style="font-weight: bold; text-wrap: normal;">' + selectedNode.get('text') + '</p><br/><p>Are you sure you want to delete this bookmark?</p>', function(button) {
            if (button === 'yes') {
              selectedNode.remove();
              selectedNode.commit(false);
            }
          });
        }
      }
    }
  ]
});


Ext.application({
  name: 'Chromarks',
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      items: [
        tree = Ext.create('Ext.tree.Panel', {
          region: 'center',
          store: store,
          rootVisible: false,
          useArrows: true,
          animate: false,
          tbar: [
            {
              xtype: 'textfield',
              name: 'field1',
              fieldStyle: 'background: white url(icons/search.png) 1px 50% no-repeat; padding-left: 18px;',
              emptyText: 'Search Bookmarks'
            },
              '->',
            {
              xtype: 'button',
              tooltip: 'Options',
              icon: 'icons/options.png',
              handler: function() {
                chrome.tabs.create({ url: chrome.extension.getURL("options.html"), selected: true });

                self.close();
              }
            }
          ],
          listeners: {
            itemclick: function(view, node, item, index, e) {
              if(node.isLeaf()) {
                if (e.ctrlKey === true) {
                  chrome.tabs.create({ url: node.get('url'), selected: false });
                } else {
                  chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.update(tab.id, { url: node.get('url') });

                    self.close();
                  });
                }
              } else if(node.isExpanded()) {
                node.collapse();
              } else {
                node.expand();
              }
            }
          },
          itemdblclick: function(view, node, item, index, e) {
            e.stopEvent();
          },
          viewConfig: {
            plugins: {
              ptype: 'treeviewdragdrop',
              appendOnly: true,
              containerScroll: true
            }
          }
        })
      ]
    });
    tree.on('itemcontextmenu', function(view, record, item, index, event){
      ctxMenu.showAt(event.getXY());
      event.stopEvent();
    },this);
  }
});
