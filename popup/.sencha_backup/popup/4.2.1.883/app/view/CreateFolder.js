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
Ext.define("popup.view.CreateFolder", {
  extend: 'Ext.window.Window',
  alias: 'widget.createFolder',
  layout: 'fit',
  autoShow: true,
  modal: true,
  title: chrome.i18n.getMessage('popupCreateFolder'),
  initComponent: function () {
    this.items = [
      {
        xtype: 'form',
        width: 300,
        defaults: {
          labelAlign: 'top',
          labelStyle: 'font-weight:bold;',
          padding: 10
        },
        items: [
          {
            xtype: 'textfield',
            name: 'textNewFolder',
            anchor: '100%',
            fieldLabel: chrome.i18n.getMessage('popupName')
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: chrome.i18n.getMessage('popupSave'),
        action: 'save'
      },
      {
        text: chrome.i18n.getMessage('popupCancel'),
        scope: this,
        handler: this.close
      }
    ];

    this.callParent(arguments);
  }
});
