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
Ext.define("options.proxy.Options", {
  extend: 'Ext.data.Proxy',
  alias: 'proxy.optionsProxy',
  read: function (operation, callback, scope) {
    var thisProxy = this;

    chrome.storage.sync.get({
      'options': {
        'openInNewTab': true,
        'showTooltips': true,
        'popupWidth': '360',
        'popupHeight': '600'
      }
    }, function (items) {
      //return model instances in a result set
      operation.resultSet = new Ext.data.ResultSet({
        records: [ Ext.create('options.model.Options', items.options) ],
        total  : 1,
        loaded : true
      });

      //announce success
      operation.setSuccessful();
      operation.setCompleted();

      //finish with callback
      if (typeof callback === "function") {
        callback.call(scope || thisProxy, operation);
      }
    });
  },
  update: function (operation, callback, scope) {
    var thisProxy = this;

    if (operation.records.length === 1) {
      var rec = operation.records[0];

      chrome.storage.sync.set({
        'options': rec.data
      }, function () {
        if (chrome.runtime.lastError) {
          operation.setException(chrome.runtime.lastError.message);
          operation.setCompleted();
        } else {
          operation.setSuccessful();
          operation.setCompleted();
        }
        
        if (typeof callback === "function") {
          callback.call(scope || thisProxy, operation);
        }
      });
    } else {
      operation.setException('Error saving options.');
      operation.setCompleted();

      if (typeof callback === "function") {
        callback.call(scope || thisProxy, operation);
      }
    }
  }
});