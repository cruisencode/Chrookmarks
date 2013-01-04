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
Ext.define("options.view.ViewForm", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.optionsViewForm',
  itemId: 'viewForm',
  layout: 'fit',
  initComponent: function () {
    this.items = [
      {
        xtype: 'form',
        title: chrome.i18n.getMessage('optionsView'),
        defaults: {
          labelStyle: 'font-weight: bold;',
          labelWidth: 180,
          padding: 10
        },
        items: [
          {
            xtype: 'numberfield',
            name: 'popupWidth',
            fieldLabel: chrome.i18n.getMessage('optionsViewPopupWidth'),
            allowBlank: false,
            enforceMaxLength: true,
            maxLength: 3,
            size: 5,
            minValue: 180,
            maxValue: 800
          },
          {
            xtype: 'numberfield',
            name: 'popupHeight',
            fieldLabel: chrome.i18n.getMessage('optionsViewPopupHeight'),
            allowBlank: false,
            enforceMaxLength: true,
            maxLength: 3,
            size: 5,
            minValue: 240,
            maxValue: 600
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: '<b>' + chrome.i18n.getMessage('optionsViewSave') + '</b>',
        action: 'save',
        scale: 'large'
      }
    ];

    this.callParent(arguments);
  }
});
