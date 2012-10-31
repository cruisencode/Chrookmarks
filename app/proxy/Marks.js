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
  loadChildren: function (children, marks) {
    var i,
        result,
        mark;

    for (i = 0; i < children.length; i++) {
      result = children[i];
      mark = Ext.create('Chromarks.model.Mark', {
        id: result.id,
        text: result.title,
        qtitle: (result.url && result.url.length > 0 ? result.title : undefined),
        qtip: (result.url && result.url.length > 0 ? '<u>' + result.url + '</u><br/><br/>' + new Date(result.dateAdded).toLocaleString() : undefined),
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
  },
  update: function (operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      if (operation.records[0].modified.parentId) {
        chrome.bookmarks.move(operation.records[0].get('id'), { parentId: operation.records[0].parentNode.get('id') }, function () {
          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback === "function") {
            callback.call(scope || thisProxy, operation);
          }
        });
      } else if (operation.records[0].modified.text) {
        chrome.bookmarks.update(operation.records[0].get('id'), { title: operation.records[0].get('text') }, function () {
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
