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
Ext.application({
  name: 'Chromarks',
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      items: [
        {
          xtype: 'panel',
          region: 'west',
          layout: {
              type: 'vbox',
              align : 'stretch'
          },
          items: [
            {
              xtype: 'panel',
              width: 200,
              height: 72,
              html: '<p style="font-size: 18pt; font-weight: bold;"><img src="resources/icons/icon-48.png" /> Chromarks</p>'
            },
            {
              xtype: 'dataview',
              flex: 1,
              itemSelector: '.tab-list-item',
              overItemCls: 'tab-list-item-hover',
              tpl: '<tpl for="."><div class="tab-list-item">{title}</div></tpl>',
              store: Ext.create('Ext.data.ArrayStore', {
                storeId: 'tabStore',
                fields: [ 'title' ],
                data: [ [ 'Test 1' ], [ 'Test 2'] ]
              })
            }
          ]
        },
        {
          xtype: 'panel',
          region: 'center',
          html: '<p>Hello World 3</p>'
        }
      ]
    });
  }
});
