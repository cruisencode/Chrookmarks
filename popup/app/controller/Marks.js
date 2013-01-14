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
Ext.define('popup.controller.Marks', {
  extend: 'Ext.app.Controller',
  views: [ 'Tree', 'TreeFilter', 'Edit', 'Delete', 'CtxMenu' ],
  refs: [
    { ref: 'tree', selector: 'markTree' }
  ],
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
      'ctxMenu menuitem[itemId=openCurrentTab]': {
        click: this.openInCurrentTab
      },
      'ctxMenu menuitem[itemId=openNewTab]': {
        click: this.openInNewTab
      },
      'ctxMenu menuitem[itemId=openNewWindow]': {
        click: this.openInNewWindow
      },
      'ctxMenu menuitem[itemId=openNewIncognito]': {
        click: this.openInNewIncognito
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
        selected = this.getTree().getSelectionModel().getLastSelected();

    view.down('form').loadRecord(selected);
    view.setTitle(chrome.i18n.getMessage(selected.isLeaf() ? 'popupEditBookmark' : 'popupEditFolder'));

    if (!selected.isLeaf()) {
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
        selected = this.getTree().getSelectionModel().getLastSelected();

    view.down('form').loadRecord(selected);
    view.setTitle(chrome.i18n.getMessage(selected.get('url') && selected.get('url').length > 0 ? 'popupDeleteBookmark' : 'popupDeleteFolder'));
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
      var url = node.get('url');

      if (e.ctrlKey === true) {
        chrome.tabs.create({ url: url, selected: false });
      } else if (popup.optionsData.get('openInNewTab') === true) {
        chrome.tabs.create({ url: url, selected: true });

        self.close();
      } else {
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.update(tab.id, { url: url });

          self.close();
        });
      }
    } else if (node.isExpanded()) {
      node.collapse();
    } else {
      node.expand();
    }
  },
  openInCurrentTab: function () {
    var selected = this.getTree().getSelectionModel().getLastSelected();

    if (selected.isLeaf()) {
      chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.update(tab.id, { url: selected.get('url') });
      });
    }
  },
  openInNewTab: function () {
    var selected = this.getTree().getSelectionModel().getLastSelected();

    if (selected.isLeaf()) {
      chrome.tabs.create({ url: selected.get('url'), selected: false });
    } else {
      chrome.bookmarks.getChildren(selected.get('id'), function (results) {
        var i,
            url;

        for (i = 0; i < results.length; i++) {
          url = results[i].url;

          if (url && url.length > 0) {
            chrome.tabs.create({ url: url, selected: false });
          }
        }
      });
    }
  },
  openInNewWindow: function () {
    this.createNewWindow(false);
  },
  openInNewIncognito: function () {
    this.createNewWindow(true);
  },
  createNewWindow: function (incognito) {
    var selected = this.getTree().getSelectionModel().getLastSelected();

    if (selected.isLeaf()) {
      chrome.windows.create({ url: selected.get('url'), incognito: incognito });
    } else {
      chrome.bookmarks.getChildren(selected.get('id'), function (results) {
        var urls = [ ],
            i,
            url;

        for (i = 0; i < results.length; i++) {
          url = results[i].url;

          if (url && url.length > 0) {
            urls.push(url);
          }
        }

        chrome.windows.create({ url: urls, incognito: incognito });
      });
    }
  },
  openOptions: function () {
    chrome.tabs.create({ url: chrome.extension.getURL("/options/production/index.html"), selected: true });

    self.close();
  },
  searchBookmarks: function (field, newValue) {
    var tree = this.getTree();

    if (!newValue || newValue === '') {
      tree.clearFilter();
      tree.expandPath('/root/1');
    } else {
      tree.filter(new RegExp('.*?' + newValue + '.*', 'i'), 'text');
    }
  }
});
