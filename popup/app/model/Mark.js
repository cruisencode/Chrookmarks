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
Ext.define('popup.model.Mark', {
  requires: [ 'popup.proxy.Marks' ],
  extend: 'Ext.data.Model',
  fields: [
    { name: 'text', type: 'string' },
    { name: 'url', type: 'string' }
  ],
  hasMany: { model: 'popup.model.Mark', name: 'children' },
  proxy: { type: 'marksProxy' }
});
