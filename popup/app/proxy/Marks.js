/*
 This file is part of Chrookmarks.

 Copyright (c) 2013, James Nuzzi

 Chrookmarks is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Chrookmarks is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Chrookmarks.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('popup.proxy.Marks', {
  extend: 'Ext.data.proxy.Proxy',
  alias: 'proxy.marksProxy',
  createTip: function (mark, markUrl, markTitle, markDate) {
    if (markUrl && markUrl.length > 0) {
      mark.set('qtitle', markTitle);
      mark.set('qtip', "<span style='text-decoration: underline'>" + markUrl + '</span><br/><br/>' + markDate.toLocaleDateString() + ' ' + markDate.toLocaleTimeString());
    }
  },
  loadChildren: function (children, marks) {
    var i,
        result,
        mark,
        markDate,
        id,
        title,
        url,
        hasUrl,
        showFavIcons = popup.optionsData.get('showFavIcons'),
        showTooltips = popup.optionsData.get('showTooltips');

    for (i = 0; i < children.length; i++) {
      result = children[i];
      markDate = new Date(result.dateAdded);
      id = result.id;
      title = result.title;
      url = result.url;
      hasUrl = (url && url.length > 0);
      mark = Ext.create('popup.model.Mark', {
        id: id,
        text: title,
        date: markDate,
        url: url,
        icon: (showFavIcons && hasUrl ? 'chrome://favicon/' + url : undefined),
        leaf: hasUrl,
        singleClickExpand: (hasUrl ? undefined : true),
        allowDrag: hasUrl,
        allowDrop: !hasUrl,
        expanded: (id === '1')
      });

      if (showTooltips === true) {
        this.createTip(mark, url, title, markDate);
      }

      marks.push(mark);
    }
  },
  update: function (operation, callback, scope) {
    var thisProxy = this;

    operation.setStarted();

    if (operation.records.length === 1) {
      var rec = operation.records[0];

      if (rec.modified.parentId && rec.modified.parentId.length > 0) {
        chrome.bookmarks.move(rec.get('id'), { parentId: rec.parentNode.get('id') }, function () {
          Ext.getCmp('bookmarkTree').getStore().sort();

          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback === 'function') {
            callback.call(scope || thisProxy, operation);
          }
        });
      } else {
        chrome.bookmarks.update(rec.get('id'), { 'url': rec.get('url'), 'title': rec.get('text') }, function (result) {
          thisProxy.createTip(rec, result.url, result.title, new Date(result.dateAdded));
          Ext.getCmp('bookmarkTree').getStore().sort();

          operation.setSuccessful();
          operation.setCompleted();

          if (typeof callback === 'function') {
            callback.call(scope || thisProxy, operation);
          }
        });
      }
    } else {
      operation.setException(chrome.i18n.getMessage('popupMarksProxyMultiNodeUpdateError'));
      operation.setCompleted();

      if (typeof callback === 'function') {
        callback.call(scope || thisProxy, operation);
      }
    }
  },
  destroy: function (operation, callback, scope) {
    var thisProxy = this;

    operation.setStarted();

    if (operation.records.length === 1) {
      chrome.bookmarks.removeTree(operation.records[0].get('id'), function () {
        operation.setSuccessful();
        operation.setCompleted();

        if (typeof callback === 'function') {
          callback.call(scope || thisProxy, operation);
        }
      });
    } else {
      operation.setException(chrome.i18n.getMessage('popupMarksProxyMultiNodeDeleteError'));
      operation.setCompleted();

      if (typeof callback === 'function') {
        callback.call(scope || thisProxy, operation);
      }
    }
  },
  read: function (operation, callback, scope) {
    var thisProxy = this,
        node = operation.params.node;

    operation.setStarted();

    chrome.bookmarks.getChildren((node === 'root' ? '0' : node), function (results) {
      var marks = [];

      thisProxy.loadChildren(results, marks);

      //return model instances in a result set
      operation.resultSet = Ext.create('Ext.data.ResultSet', {
        records: marks,
        total  : marks.length,
        loaded : true
      });

      //announce success
      operation.setSuccessful();
      operation.setCompleted();

      //finish with callback
      if (typeof callback === 'function') {
        callback.call(scope || thisProxy, operation);
      }
    });
  }
});
