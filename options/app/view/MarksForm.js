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
Ext.define("options.view.MarksForm", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.optionsMarksForm',
  itemId: 'marksForm',
  layout: 'fit',
  initComponent: function () {
    this.items = [
      {
        xtype: 'form',
        title: chrome.i18n.getMessage('optionsBookmarks'),
        defaults: {
          labelStyle: 'font-weight: bold;',
          labelWidth: 180,
          padding: 10
        },
        items: [
          {
            xtype: 'checkbox',
            name: 'openInNewTab',
            fieldLabel: chrome.i18n.getMessage('optionsBookmarksOpenNewTab')
          },
          {
            xtype: 'combobox',
            name: 'sortBy',
            id: 'sortBy',
            fieldLabel: chrome.i18n.getMessage('optionsBookmarksSortBy'),
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'text',
            valueField: 'val',
            store: Ext.create('Ext.data.ArrayStore', {
              storeId: 'sortByStore',
              fields: [ 'text', 'val' ],
              data: [
                [ chrome.i18n.getMessage('optionsBookmarksSortByNone'), 'none' ],
                [ chrome.i18n.getMessage('optionsBookmarksSortByName'), 'text' ],
                [ chrome.i18n.getMessage('optionsBookmarksSortByDate'), 'date' ]
              ]
            })
          },
          {
            xtype: 'combobox',
            name: 'sortOrder',
            id: 'sortOrder',
            fieldLabel: chrome.i18n.getMessage('optionsBookmarksSortOrder'),
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'text',
            valueField: 'val',
            store: Ext.create('Ext.data.ArrayStore', {
              storeId: 'sortOrderStore',
              fields: [ 'text', 'val' ],
              data: [
                [ chrome.i18n.getMessage('optionsBookmarksSortOrderAscending'), 'ASC' ],
                [ chrome.i18n.getMessage('optionsBookmarksSortOrderDescending'), 'DESC' ]
              ]
            })
          },
          {
            xtype: 'checkbox',
            name: 'showFavIcons',
            fieldLabel: chrome.i18n.getMessage('optionsBookmarksShowFavIcons')
          },
          {
            xtype: 'checkbox',
            name: 'showTooltips',
            fieldLabel: chrome.i18n.getMessage('optionsBookmarksShowTooltips')
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: '<b>' + chrome.i18n.getMessage('optionsBookmarksSave') + '</b>',
        action: 'save',
        scale: 'large',
        marginBottom: 12
      }
    ];

    this.callParent(arguments);
  }
});
