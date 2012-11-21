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
Ext.define("Chromarks.proxy.Options", {
  extend: 'Ext.data.Proxy',
  alias: 'proxy.optionsProxy',
  read: function (operation, callback, scope) {
    var thisProxy = this;

    chrome.storage.sync.get({
      'options': {
        'openInNewTab': true
      }
    }, function (items) {
      //return model instances in a result set
      operation.resultSet = new Ext.data.ResultSet({
        records: [ items.options ],
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
  }
});