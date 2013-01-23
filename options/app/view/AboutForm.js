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
Ext.define("options.view.AboutForm", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.optionsAboutForm',
  layout: 'fit',
  initComponent: function () {
    this.items = [
      {
        xtype: 'form',
        title: chrome.i18n.getMessage('optionsAbout'),
        defaults: {
          labelStyle: 'font-weight: bold;',
          labelWidth: 180,
          padding: 10
        },
        items: [
          {
            xtype: 'displayfield',
            name: 'version',
            fieldLabel: chrome.i18n.getMessage('optionsAboutVersion'),
            value: chrome.runtime.getManifest().version
          },
          {
            xtype: 'displayfield',
            name: 'license',
            fieldLabel: chrome.i18n.getMessage('optionsAboutLegalNotice'),
            value: 'Chrookmarks<br/>' +
                'Copyright (c) 2013, James Nuzzi<br/>' +
                'All rights reserved.<br/>' +
                '<br/>' +
                '<a href="http://www.chrookmarks.com" target="_blank">http://www.chrookmarks.com</a><br/>' +
                '<br/>' +
                'Open Source License<br/>' +
                '------------------------------------------------------------------------------------------<br/>' +
                'This version of Chrookmarks is licensed under the terms of the Open Source GPL 3.0 license.<br/>' +
                '<br/>' +
                '<a href="http://www.gnu.org/licenses/gpl.html" target="_blank">http://www.gnu.org/licenses/gpl.html</a><br/>' +
                '<br/>' +
                '--<br/>' +
                '<br/>' +
                'Chrookmarks is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT OF THIRD-PARTY INTELLECTUAL PROPERTY RIGHTS.  See the GNU General Public License for more details.'
          },
          {
            xtype: 'component',
            margin: '20 10 20 10',
            padding: 0,
            autoEl: {
              tag: 'hr'
            }
          },
          {
            xtype: 'displayfield',
            name: 'donateUSD',
            fieldLabel: chrome.i18n.getMessage('optionsAboutDonateUSD'),
            value: '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">\
            <input type="hidden" name="cmd" value="_s-xclick">\
            <input type="hidden" name="hosted_button_id" value="MJA4WNAJRWRU4">\
            <table>\
            <tr><td><input type="hidden" name="on0" value="Donation Amount">Donation Amount:&nbsp;</td><td><select name="os0">\
            	<option value="$1 USD">Give a buck - $1.00 USD</option>\
            	<option value="$5 USD">Buy me a latte - $5.00 USD</option>\
            	<option value="$10 USD">Buy me 2 lattes - $10.00 USD</option>\
            	<option value="$20 USD">Buy me dinner - $20.00 USD</option>\
            	<option value="$50 USD">Buy me a nice dinner - $50.00 USD</option>\
            	<option value="$100 USD">Help pay my bills - $100.00 USD</option>\
            	<option value="$500 USD">Help pay my rent - $500.00 USD</option>\
            	<option value="$1000 USD">Send me on a vacation - $1,000.00 USD</option>\
            </select> </td></tr>\
            </table>\
            <br/>\
            <input type="hidden" name="currency_code" value="USD">\
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!">\
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
            </form>'
          },
          {
            xtype: 'displayfield',
            name: 'donateEUR',
            fieldLabel: chrome.i18n.getMessage('optionsAboutDonateEUR'),
            value: '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">\
            <input type="hidden" name="cmd" value="_s-xclick">\
            <input type="hidden" name="hosted_button_id" value="FVQEYDXCV3QV2">\
            <table>\
            <tr><td><input type="hidden" name="on0" value="Donation Amount">Donation Amount:&nbsp;</td><td><select name="os0">\
            	<option value="1 EUR">Give a buck - €1.00 EUR</option>\
            	<option value="5 EUR">Buy me a latte - €5.00 EUR</option>\
            	<option value="10 EUR">Buy me 2 lattes - €10.00 EUR</option>\
            	<option value="20 EUR">Buy me dinner - €20.00 EUR</option>\
            	<option value="50 EUR">Buy me a nice dinner - €50.00 EUR</option>\
            	<option value="100 EUR">Help pay my bills - €100.00 EUR</option>\
            	<option value="500 EUR">Help pay my rent - €500.00 EUR</option>\
            	<option value="1000 EUR">Send me on a vacation - €1,000.00 EUR</option>\
            </select> </td></tr>\
            </table>\
            <br/>\
            <input type="hidden" name="currency_code" value="EUR">\
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!">\
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
            </form>'
          }
        ]
      }
    ];

    this.callParent(arguments);
  }
});
