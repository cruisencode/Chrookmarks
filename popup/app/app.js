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
Ext.application({
  models: [ 'Mark' ],
  stores: [ 'Marks' ],
  controllers: [ 'Marks' ],
  name: 'popup',
  autoCreateViewport: false,
  enableQuickTips: true,
  init: function () {
    document.title = chrome.i18n.getMessage('extName');

    Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), { showDelay: 1000, hideDelay: 0 });
  },
  launch: function () {
    options.model.Options.load(0, {
      scope: this,
      callback: function(record) {
        popup.optionsData = record;

        document.body.style.width = popup.optionsData.get('popupWidth') + 'px';
        document.body.style.height = popup.optionsData.get('popupHeight') + 'px';

        this.getMarksStore().sort(popup.optionsData.get('sortBy'), popup.optionsData.get('sortOrder'));

        Ext.create('Ext.container.Viewport', {
          layout: 'fit',
          items: [ { xtype: 'markTree' } ]
        });

        Ext.getCmp('bookmarkTree').getRootNode().expand();
        Ext.getCmp('searchField').focus(false, true);
      }
    });
  }
});
