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
Ext.define("popup.view.Tree", {
  extend: 'Ext.tree.Panel',
  requires: [ 'Ext.tree.plugin.TreeViewDragDrop' ],
  alias: 'widget.markTree',
  id: 'bookmarkTree',
  store: 'Marks',
  rootVisible: false,
  useArrows: true,
  animate: false,
  plugins:[
    Ext.create('popup.view.TreeFilter', {
      pluginId: 'treefilter',
      collapseOnClear: true,
      allowParentFolders: true
    })
  ],
  tbar: [
    {
      xtype: 'textfield',
      name: 'search',
      id: 'searchField',
      alias: 'widget.searchField',
      fieldStyle: 'background: white url(/icons/search.png) 1px 50% no-repeat; padding-left: 18px;',
      emptyText: 'Search Bookmarks'
    },
    '->',
    {
      xtype: 'button',
      action: 'options',
      tooltip: 'Options',
      icon: '/icons/options.png'
    }
  ],
  viewConfig: {
    plugins: {
      ptype: 'treeviewdragdrop',
      appendOnly: true,
      containerScroll: true
    }
  },
  initComponent: function () {
    this.callParent(arguments);
  }
});
