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
  models: ["Mark"],
  stores: ["Marks"],
  controllers: ["Marks"],
  views: ["Tree","TreeFilter","Edit","Delete","CtxMenu"],
  name: 'popup',
  init: function () {
    options.model.Options.load(0, {
      scope: this,
      callback: function(record) {
        popup.optionsData = record;

        document.body.style.minWidth = popup.optionsData.get('popupWidth') + 'px';
        document.body.style.minHeight = popup.optionsData.get('popupHeight') + 'px';
      }
    });
    
    document.title = chrome.i18n.getMessage('extName');

    Ext.tip.QuickTipManager.init();
    Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), { showDelay: 1000, hideDelay: 0 });
  },
  launch: function () {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [ { xtype: 'markTree' } ]
    });

    Ext.getCmp('searchField').focus(false, true);
  }
});
