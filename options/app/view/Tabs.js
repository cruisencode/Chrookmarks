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
Ext.define("options.view.Tabs", {
  extend: 'Ext.view.View',
  alias: 'widget.optionsTabs',
  id: 'optionsTabs',
  trackOver: true,
  selModel: {
    deselectOnContainerClick: false
  },
  itemSelector: '.tab-list-item',
  overItemCls: 'tab-list-item-hover',
  selectedItemCls: 'tab-list-item-selected',
  tpl: '<tpl for="."><div class="tab-list-item">{title}</div></tpl>',
  store: Ext.create('Ext.data.ArrayStore', {
    storeId: 'tabStore',
    fields: [ 'title', 'cardIndex' ],
    data: [
      [ chrome.i18n.getMessage('optionsBookmarks'), 0 ],
      [ chrome.i18n.getMessage('optionsView'), 1 ],
      [ chrome.i18n.getMessage('optionsAbout'), 2 ]
    ]
  })
});
