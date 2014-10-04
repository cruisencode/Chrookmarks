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

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
  compatibility: {
    ext: '4.2'
  },
  requires: ["Ext.layout.container.Border"],
  models:[
    'Options'
  ],
  views: [
    'AboutForm',
    'MarksForm',
    'Options',
    'Tabs',
    'Title',
    'ViewForm'
  ],
  controllers: [
    'Options'
  ],
  name: 'options',
  autoCreateViewport: false,
  init: function () {
    document.title = chrome.i18n.getMessage('extName') + ' - ' + chrome.i18n.getMessage('popupOptions');
  },
  launch: function () {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      items: [
        {
          xtype: 'panel',
          region: 'west',
          border: false,
          layout: {
              type: 'vbox',
              align : 'stretch'
          },
          items: [
            {
              xtype: 'optionsTitle'
            },
            {
              xtype: 'optionsTabs',
              flex: 1
            }
          ]
        },
        {
          xtype: 'optionsOptions',
          region: 'center'
        }
      ]
    });

    Ext.getCmp('optionsTabs').select(2);
  }
});
