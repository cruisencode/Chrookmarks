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
Ext.define('Chromarks.controller.Marks', {
  extend: 'Ext.app.Controller',
  stores: [ 'Marks' ],
  models: [ 'Mark' ],
  views: [ 'mark.Tree', 'mark.Edit', 'mark.Delete', 'mark.CtxMenu' ],
  init: function () {
    this.control({
      'markTree': {
        itemcontextmenu: this.contextMenu,
        itemclick: this.openMark,
        itemdblclick: function () { e.stopEvent(); }
      },
      'markTree button[action=options]': {
        click: this.openOptions
      },
      'markTree textfield[id=searchField]': {
        change: this.searchBookmarks
      },
      'markEdit button[action=save]': {
        click: this.updateMark
      },
      'markDelete button[action=delete]': {
        click: this.removeMark
      },
      'ctxMenu menuitem[itemId=openNew]': {
        click: this.openInNewTab
      },
      'ctxMenu menuitem[itemId=edit]': {
        click: this.editMark
      },
      'ctxMenu menuitem[itemId=delete]': {
        click: this.deleteMark
      }
    });
  },
  editMark: function () {
    var view = Ext.widget('markEdit'),
        selected = Ext.getCmp('bookmarkTree').getSelectionModel().getLastSelected();

    view.down('form').loadRecord(selected);

    if (!selected.isLeaf()) {
      view.setTitle('Edit Folder');
      view.down('textfield[name="url"]').setDisabled(true);
    }

    view.down('textfield[name="text"]').focus(false, true);
  },
  updateMark: function (button) {
    var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();

    record.set(values);
    record.commit();
    win.close();
  },
  deleteMark: function () {
    var view = Ext.widget('markDelete'),
        selected = Ext.getCmp('bookmarkTree').getSelectionModel().getLastSelected();

    view.down('form').loadRecord(selected);
    view.setTitle('Delete Folder');
  },
  removeMark: function (button) {
    var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord();

    record.remove();
    record.commit();
    win.close();
  },
  contextMenu: function (view, record, item, index, event) {
    var ctxMenu = Ext.widget('ctxMenu', { isLeaf: record.isLeaf() });

    event.stopEvent();

    ctxMenu.showAt(event.getXY());
  },
  openMark: function (view, node, item, index, e) {
    if (node.isLeaf()) {
      if (e.ctrlKey === true) {
        chrome.tabs.create({ url: node.get('url'), selected: false });
      } else {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.update(tab.id, { url: node.get('url') });

          self.close();
        });
      }
    } else if (node.isExpanded()) {
      node.collapse();
    } else {
      node.expand();
    }
  },
  openInNewTab: function () {
    var selected = Ext.getCmp('bookmarkTree').getSelectionModel().getLastSelected();

    if (selected.isLeaf()) {
      chrome.tabs.create({ url: selected.get('url'), selected: false });
    } else {
      chrome.bookmarks.getChildren(selected.get('id'), function (results) {
        var i;

        for (i = 0; i < results.length; i++) {
          var result = results[i];

          if (result.url && result.url.length > 0) {
            chrome.tabs.create({ url: result.url, selected: false });
          }
        }
      });
    }
  },
  openOptions: function () {
    chrome.tabs.create({ url: chrome.extension.getURL("options.html"), selected: true });

    self.close();
  },
  searchBookmarks: function (field, newValue) {
    if (!newValue || newValue === "") {
      Ext.getCmp('bookmarkTree').clearFilter();
      Ext.getCmp('bookmarkTree').expandPath('/root/1');
    } else {
      Ext.getCmp('bookmarkTree').filter(new RegExp('.*?' + newValue + '.*', 'i'), 'text');
    }
  }
});
