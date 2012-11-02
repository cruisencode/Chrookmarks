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
  createTip: function (mark, markTitle, markDate) {
    var markUrl = mark.get('url');

    mark.set('qtitle', (markUrl && markUrl.length > 0 ? markTitle : undefined));
    mark.set('qtip', (markUrl && markUrl.length > 0 ? "<span style='text-decoration: underline'>" + markUrl + '</span><br/><br/>' + markDate.toLocaleDateString() + ' ' + markDate.toLocaleTimeString() : undefined));
  },
  loadChildren: function (children, marks) {
    var i,
        result,
        mark,
        markDate;

    for (i = 0; i < children.length; i++) {
      result = children[i];
      markDate = new Date(result.dateAdded);
      mark = Ext.create('Chromarks.model.Mark', {
        id: result.id,
        text: result.title,
        url: result.url,
        icon: (result.url && result.url.length > 0 ? "chrome://favicon/" + result.url : undefined),
        leaf: (result.url && result.url.length > 0),
        singleClickExpand: (result.url && result.url.length > 0 ? undefined : true),
        allowDrag: (result.url && result.url.length > 0),
        allowDrop: !(result.url && result.url.length > 0),
        expanded: (result.id === '1')
      });

      this.createTip(mark, result.title, markDate);

      marks.push(mark);
    }
  },
  update: function (operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      if (operation.records[0].modified.parentId) {
        chrome.bookmarks.move(operation.records[0].get('id'), { parentId: operation.records[0].parentNode.get('id') }, function () {
          Ext.getCmp('bookmarkStore').sort();

          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback === "function") {
            callback.call(scope || thisProxy, operation);
          }
        });
      } else if (operation.records[0].modified.text || operation.records[0].modified.url) {
        chrome.bookmarks.update(operation.records[0].get('id'), { 'url': operation.records[0].get('url'), 'title': operation.records[0].get('text') }, function (result) {
          thisProxy.createTip(operation.records[0], result.title, new Date(result.dateAdded));
          Ext.getCmp('bookmarkStore').sort();

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
      chrome.bookmarks.remove(operation.records[0].get('id'), function () {
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
    var thisProxy = this;

    if (operation.params.node === "root") {
      chrome.bookmarks.getTree(function (results) {
        var marks = [],
            children = results[0].children;

        thisProxy.loadChildren(children, marks);

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
    } else {
      chrome.bookmarks.getChildren(operation.params.node, function (results) {
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
  }
});