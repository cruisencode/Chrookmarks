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
Ext.define('Chromarks.view.mark.CtxMenu', {
  extend: 'Ext.menu.Menu',
  alias: 'widget.ctxMenu',
  initComponent: function () {
    this.items = [
      {
        text: 'Open in new tab',
        icon: 'resources/icons/new-tab.png',
        itemId: 'openNew'
      },
      '-',
      {
        text: 'Edit',
        icon: 'resources/icons/rename.png',
        itemId: 'edit'
      },
      {
        text: 'Delete',
        icon: 'resources/icons/delete.png',
        itemId: 'delete'
      }
    ];

    this.callParent(arguments);
  }
});
