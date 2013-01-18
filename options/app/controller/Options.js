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
Ext.define('options.controller.Options', {
  extend: 'Ext.app.Controller',
  views: ["ViewForm","Title","Tabs","Options","MarksForm"],
  init: function () {
    this.control({
      'optionsTabs': {
        select: this.selectTab
      },
      'optionsMarksForm button[action=save]': {
        click: this.saveOptions
      },
      'optionsViewForm button[action=save]': {
        click: this.saveOptions
      }
    });
  },
  selectTab: function (view, record) {
    var layout = Ext.getCmp('optionsOptions').getLayout(),
        form;

    layout.setActiveItem(record.data.cardIndex);

    form = layout.getActiveItem().down('form');

    form.setLoading(chrome.i18n.getMessage('optionsControllerLoading'));

    options.model.Options.load(0, {
      scope: this,
      callback: function(record) {
        form.loadRecord(record);
        form.setLoading(false);
      }
    });
  },
  saveOptions: function () {
    var form = Ext.getCmp('optionsOptions').getLayout().getActiveItem().down('form'),
        record = form.getRecord(),
        values = {},
        errorTitle = chrome.i18n.getMessage('optionsControllerError');

    if (form.getForm().isValid()) {
      form.setLoading(chrome.i18n.getMessage('optionsControllerSaving'));

      form.items.each(function (f) {
         values[f.getName()] = f.getValue();
      });

      record.set(values);
      record.commit();
      record.save({
        callback: function (records, operation) {
          form.setLoading(false);

          if (operation.success === true) {
            Ext.Msg.alert(chrome.i18n.getMessage('optionsControllerSuccess'), chrome.i18n.getMessage('optionsControllerSuccessMsg'));
          } else {
            Ext.Msg.alert(errorTitle, chrome.i18n.getMessage('optionsControllerErrorMsg'));
          }
        }
      });
    } else {
      Ext.Msg.alert(errorTitle, chrome.i18n.getMessage('optionsControllerValidationErrorMsg'));
    }
  }
});
