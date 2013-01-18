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
Ext.define("popup.view.Delete", {
  extend: 'Ext.window.Window',
  alias: 'widget.markDelete',
  layout: 'fit',
  autoShow: true,
  modal: true,
  initComponent: function () {
    this.items = [
      {
        xtype: 'form',
        width: 300,
        defaults: {
          padding: 10
        },
        items: [
          {
            xtype: 'displayfield',
            name: 'text',
            anchor: '100%',
            fieldStyle: {
              fontWeight: 'bold'
            }
          },
          {
            xtype: 'label',
            text: chrome.i18n.getMessage('popupDeleteConfirm')
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: chrome.i18n.getMessage('popupDelete'),
        action: 'delete'
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
