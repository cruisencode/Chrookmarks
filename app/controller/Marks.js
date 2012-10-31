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
var ctxMenu = new Ext.menu.Menu({
  items: [
    {
      text: 'Open in new tab',
      icon: 'icons/new-tab.png',
      handler: function () {
        var tree = Ext.ComponentQuery.query('markTree')[0];

        chrome.tabs.create({ url: tree.getSelectionModel().getLastSelected().get('url'), selected: false });
      }
    },
    '-',
    {
      text: 'Rename',
      icon: 'icons/rename.png',
      handler: function () {
        var tree = Ext.ComponentQuery.query('markTree')[0];

        Ext.MessageBox.prompt(
          'Rename Bookmark',
          'Bookmark Name:',
          function (buttonId, text) {
            if (buttonId === 'ok') {
              var node = tree.getSelectionModel().getLastSelected();

              node.set('text', text);
              node.commit(false);
            }
          },
          this,
          false,
          tree.getSelectionModel().getLastSelected().get('text')
        );
      }
    },
    {
      text: 'Delete',
      icon: 'icons/delete.png',
      handler: function () {
        var tree = Ext.ComponentQuery.query('markTree')[0],
            selectedNode = tree.getSelectionModel().getLastSelected();

        if (selectedNode !== tree.getRootNode()) {
          Ext.MessageBox.maxWidth = 300;
          Ext.Msg.confirm('Delete Bookmark', '<p style="font-weight: bold; text-wrap: normal;">' + selectedNode.get('text') + '</p><br/><p>Are you sure you want to delete this bookmark?</p>', function(button) {
            if (button === 'yes') {
              selectedNode.remove();
              selectedNode.commit(false);
            }
          });
        }
      }
    }
  ]
});

Ext.define('Chromarks.controller.Marks', {
  extend: 'Ext.app.Controller',
  stores: [ 'Marks' ],
  models: [ 'Mark' ],
  views: [ 'mark.Tree' ],
  init: function () {
    this.control({
      'markTree': {
        itemcontextmenu: this.contextMenu
      }
    });
  },
  contextMenu: function (view, record, item, index, event) {
    event.stopEvent();
    ctxMenu.showAt(event.getXY());
  }
});
