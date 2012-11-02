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
Ext.define('Chromarks.view.mark.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.markTree',
  id: 'bookmarkTree',
  store: 'Marks',
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
      handler: function () {
        chrome.tabs.create({ url: chrome.extension.getURL("options.html"), selected: true });

        self.close();
      }
    }
  ],
  listeners: {
    itemclick: function (view, node, item, index, e) {
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
    }
  },
  itemdblclick: function (view, node, item, index, e) {
    e.stopEvent();
  },
  viewConfig: {
    plugins: {
      ptype: 'treeviewdragdrop',
      appendOnly: true,
      containerScroll: true
    }
  },
  initComponent: function () {
    this.callParent(arguments);
  }
});
