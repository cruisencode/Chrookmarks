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
Ext.define("popup.view.CtxMenu", {
  extend: 'Ext.menu.Menu',
  alias: 'widget.ctxMenu',
  isLeaf: true,
  initComponent: function () {
    this.items = [
      {
        text: chrome.i18n.getMessage('popupCtxMenuCurrentTab'),
        icon: '/icons/new-tab.png',
        itemId: 'openCurrentTab',
        hidden: !this.isLeaf
      },
      {
        text: chrome.i18n.getMessage(this.isLeaf ? 'popupCtxMenuNewTab' : 'popupCtxMenuNewTabs'),
        icon: '/icons/new-tab.png',
        itemId: 'openNewTab'
      },
      {
        text: chrome.i18n.getMessage('popupCtxMenuNewWindow'),
        icon: '/icons/new-tab.png',
        itemId: 'openNewWindow'
      },
      {
        text: chrome.i18n.getMessage('popupCtxMenuNewIncognito'),
        icon: '/icons/new-tab.png',
        itemId: 'openNewIncognito'
      },
      '-',
      {
        text: chrome.i18n.getMessage('popupCtxMenuCreateFolder'),
        icon: '/icons/folder_add.png',
        itemId: 'createNewFolder',
        hidden: this.isLeaf
      },
      {
        text: chrome.i18n.getMessage('popupCtxMenuEdit'),
        icon: '/icons/rename.png',
        itemId: 'edit'
      },
      {
        text: chrome.i18n.getMessage('popupDelete'),
        icon: '/icons/delete.png',
        itemId: 'delete'
      }
    ];

    this.callParent(arguments);
  }
});
