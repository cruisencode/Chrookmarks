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
Ext.define("options.view.Options", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.optionsOptions',
  id: 'optionsOptions',
  border: false,
  layout: 'card',
  items: [
    {
      border: false,
      xtype: 'optionsMarksForm'
    },
    {
      border: false,
      xtype: 'optionsViewForm'
    },
    {
      border: false,
      xtype: 'optionsAboutForm'
    }
  ]
});
