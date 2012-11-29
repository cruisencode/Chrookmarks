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
Ext.define('Chromarks.view.mark.Delete', {
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
            text: 'Are you sure you want to delete this item?'
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: 'Delete',
        action: 'delete'
      },
      {
        text: 'Cancel',
        scope: this,
        handler: this.close
      }
    ];

    this.callParent(arguments);
  }
});
