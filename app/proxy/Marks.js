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
Ext.define("Chromarks.proxy.Marks", {
  extend: 'Ext.data.Proxy',
  alias: 'proxy.marksProxy',
  requires: [ 'Chromarks.model.Options' ],
  optionsData: null,
  constructor: function (config) {
    this.param = config.param;

    Chromarks.model.Options.load(0, {
      scope: this,
      callback: function(record) {
        this.optionsData = record;
      }
    });

    this.callParent(arguments);
  },
  createTip: function (mark, markTitle, markDate) {
    var markUrl = mark.get('url');

    mark.set('qtitle', (markUrl && markUrl.length > 0 ? markTitle : undefined));
    mark.set('qtip', (markUrl && markUrl.length > 0 ? "<span style='text-decoration: underline'>" + markUrl + '</span><br/><br/>' + markDate.toLocaleDateString() + ' ' + markDate.toLocaleTimeString() : undefined));
  },
  loadChildren: function (children, marks) {
    var i,
        result,
        mark,
        markDate,
        url,
        showTooltips = this.optionsData.get('showTooltips');

    for (i = 0; i < children.length; i++) {
      result = children[i];
      markDate = new Date(result.dateAdded);
      url = result.url;
      mark = Ext.create('Chromarks.model.Mark', {
        id: result.id,
        text: result.title,
        url: url,
        icon: (url && url.length > 0 ? "chrome://favicon/" + url : undefined),
        leaf: (url && url.length > 0),
        singleClickExpand: (url && url.length > 0 ? undefined : true),
        allowDrag: (url && url.length > 0),
        allowDrop: !(url && url.length > 0),
        expanded: (result.id === '1')
      });

      if (showTooltips === true) {
        this.createTip(mark, result.title, markDate);
      }

      marks.push(mark);
    }
  },
  update: function (operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      var rec = operation.records[0];

      if (rec.modified.parentId && rec.modified.parentId.length > 0) {
        chrome.bookmarks.move(rec.get('id'), { parentId: rec.parentNode.get('id') }, function () {
          Ext.getCmp('bookmarkTree').getStore().sort();

          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback === "function") {
            callback.call(scope || thisProxy, operation);
          }
        });
      } else {
        chrome.bookmarks.update(rec.get('id'), { 'url': rec.get('url'), 'title': rec.get('text') }, function (result) {
          thisProxy.createTip(rec, result.title, new Date(result.dateAdded));
          Ext.getCmp('bookmarkTree').getStore().sort();

          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback === "function") {
            callback.call(scope || thisProxy, operation);
          }
        });
      }
    } else {
      operation.setException('Cannot update more than one node.');
      operation.setCompleted();

      if (typeof callback === "function") {
        callback.call(scope || thisProxy, operation);
      }
    }
  },
  destroy: function (operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      chrome.bookmarks.removeTree(operation.records[0].get('id'), function () {
        operation.setSuccessful();
        operation.setCompleted();

        if (typeof callback === "function") {
          callback.call(scope || thisProxy, operation);
        }
      });
    } else {
      operation.setException('Cannot delete more than one node.');
      operation.setCompleted();

      if (typeof callback === "function") {
        callback.call(scope || thisProxy, operation);
      }
    }
  },
  read: function (operation, callback, scope) {
    var thisProxy = this,
        node = operation.params.node;

    chrome.bookmarks.getChildren((node === 'root' ? '0' : node), function (results) {
      var marks = [];

      thisProxy.loadChildren(results, marks);

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
      if (typeof callback === "function") {
        callback.call(scope || thisProxy, operation);
      }
    });
  }
});
