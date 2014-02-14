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
Ext.define('options.model.Options', {
  requires: [ 'options.proxy.Options' ],
  extend: 'Ext.data.Model',
  fields: [
    { name: 'openInNewTab', type: 'boolean' },
    { name: 'keepPopupOpen', type: 'boolean' },
    { name: 'sortBy', type: 'string', convert: null },
    { name: 'sortOrder', type: 'string', convert: null },
    { name: 'showFavIcons', type: 'boolean' },
    { name: 'showTooltips', type: 'boolean' },
    { name: 'tooltipDelay', type: 'string', convert: null },
    { name: 'popupWidth', type: 'string', convert: null },
    { name: 'popupHeight', type: 'string', convert: null }
  ],
  proxy: { type: 'optionsProxy' }
});
