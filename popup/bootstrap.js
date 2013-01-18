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
Ext.Loader.addClassPathMappings({
  "Ext": "../ext/src",
  "popup": "app",
  "Ext.ux.GroupTreeChunker": "../ext/src/ux/GroupTabPanel.js"
});Ext.ClassManager.addNameAlternateMappings({
  "Ext.ux.BoxReorderer": [],
  "Ext.ux.grid.filter.Filter": [],
  "Ext.ux.ajax.DataSimlet": [],
  "Ext.ux.grid.TransformGrid": [],
  "Ext.ux.FieldReplicator": [],
  "popup.view.Viewport": [],
  "Ext.ux.grid.filter.ListFilter": [],
  "Ext.ux.ajax.XmlSimlet": [],
  "Ext.ux.event.Driver": [],
  "Ext.ux.DataView.DragSelector": [],
  "Ext.ux.grid.menu.ListMenu": [],
  "Ext.ux.GMapPanel": [],
  "Ext.ux.form.MultiSelect": [
    "Ext.ux.Multiselect"
  ],
  "Ext.ux.DataView.LabelEditor": [],
  "Ext.ux.GroupTabPanel": [],
  "Ext.ux.grid.filter.StringFilter": [],
  "Ext.ux.statusbar.ValidationStatus": [],
  "Ext.ux.GroupTreeChunker": [],
  "Ext.ux.layout.Center": [],
  "Ext.ux.CheckColumn": [],
  "Ext.ux.PreviewPlugin": [],
  "Ext.ux.DataView.Animated": [],
  "Ext.ux.ajax.SimXhr": [],
  "Ext.ux.event.RecorderManager": [],
  "Ext.ux.ProgressBarPager": [],
  "Ext.ux.statusbar.StatusBar": [
    "Ext.ux.StatusBar"
  ],
  "Ext.ux.ajax.Simlet": [],
  "Ext.ux.SlidingPager": [],
  "Ext.ux.TabReorderer": [],
  "popup.view.Main": [],
  "Ext.ux.grid.filter.NumericFilter": [],
  "Ext.ux.grid.menu.RangeMenu": [],
  "Ext.ux.RowExpander": [],
  "Ext.ux.event.Recorder": [],
  "Ext.ux.event.Player": [],
  "Ext.ux.ajax.SimManager": [],
  "popup.controller.Main": [],
  "Ext.ux.grid.filter.BooleanFilter": [],
  "Ext.ux.ToolbarDroppable": [],
  "Ext.ux.event.Maker": [],
  "Ext.ux.TabScrollerMenu": [],
  "Ext.ux.IFrame": [],
  "Ext.ux.DataView.Draggable": [],
  "Ext.ux.TabCloseMenu": [],
  "Ext.ux.form.SearchField": [],
  "Ext.ux.LiveSearchGridPanel": [],
  "Ext.ux.grid.filter.DateFilter": [],
  "Ext.ux.TreePicker": [],
  "Ext.ux.form.ItemSelector": [
    "Ext.ux.ItemSelector"
  ],
  "Ext.ux.ajax.JsonSimlet": [],
  "Ext.ux.Spotlight": [],
  "Ext.ux.grid.FiltersFeature": [],
  "Ext.ux.data.PagingMemoryProxy": [
    "Ext.data.PagingMemoryProxy"
  ]
});Ext.ClassManager.addNameAliasMappings({
  "Ext.ux.BoxReorderer": [],
  "Ext.ux.grid.filter.Filter": [],
  "Ext.ux.ajax.DataSimlet": [],
  "Ext.ux.grid.TransformGrid": [],
  "Ext.ux.FieldReplicator": [],
  "popup.view.Viewport": [],
  "Ext.ux.grid.filter.ListFilter": [
    "gridfilter.list"
  ],
  "Ext.ux.ajax.XmlSimlet": [
    "simlet.xml"
  ],
  "Ext.ux.event.Driver": [],
  "Ext.ux.DataView.DragSelector": [],
  "Ext.ux.grid.menu.ListMenu": [],
  "Ext.ux.GMapPanel": [
    "widget.gmappanel"
  ],
  "Ext.ux.form.MultiSelect": [
    "widget.multiselectfield",
    "widget.multiselect"
  ],
  "Ext.ux.DataView.LabelEditor": [],
  "Ext.ux.GroupTabPanel": [
    "widget.grouptabpanel"
  ],
  "Ext.ux.grid.filter.StringFilter": [
    "gridfilter.string"
  ],
  "Ext.ux.statusbar.ValidationStatus": [],
  "Ext.ux.GroupTreeChunker": [],
  "Ext.ux.layout.Center": [
    "layout.ux.center"
  ],
  "Ext.ux.CheckColumn": [
    "widget.checkcolumn"
  ],
  "Ext.ux.PreviewPlugin": [
    "plugin.preview"
  ],
  "Ext.ux.DataView.Animated": [],
  "Ext.ux.ajax.SimXhr": [],
  "Ext.ux.event.RecorderManager": [
    "widget.eventrecordermanager"
  ],
  "Ext.ux.ProgressBarPager": [],
  "Ext.ux.statusbar.StatusBar": [
    "widget.statusbar"
  ],
  "Ext.ux.ajax.Simlet": [
    "simlet.basic"
  ],
  "Ext.ux.SlidingPager": [],
  "Ext.ux.TabReorderer": [],
  "popup.view.Main": [],
  "Ext.ux.grid.filter.NumericFilter": [
    "gridfilter.numeric"
  ],
  "Ext.ux.grid.menu.RangeMenu": [],
  "Ext.ux.RowExpander": [
    "plugin.rowexpander"
  ],
  "Ext.ux.event.Recorder": [],
  "Ext.ux.event.Player": [],
  "Ext.ux.ajax.SimManager": [],
  "popup.controller.Main": [],
  "Ext.ux.grid.filter.BooleanFilter": [
    "gridfilter.boolean"
  ],
  "Ext.ux.ToolbarDroppable": [],
  "Ext.ux.event.Maker": [],
  "Ext.ux.TabScrollerMenu": [
    "plugin.tabscrollermenu"
  ],
  "Ext.ux.IFrame": [
    "widget.uxiframe"
  ],
  "Ext.ux.DataView.Draggable": [],
  "Ext.ux.TabCloseMenu": [
    "plugin.tabclosemenu"
  ],
  "Ext.ux.form.SearchField": [
    "widget.searchfield"
  ],
  "Ext.ux.LiveSearchGridPanel": [],
  "Ext.ux.grid.filter.DateFilter": [
    "gridfilter.date"
  ],
  "Ext.ux.TreePicker": [
    "widget.treepicker"
  ],
  "Ext.ux.form.ItemSelector": [
    "widget.itemselectorfield",
    "widget.itemselector"
  ],
  "Ext.ux.ajax.JsonSimlet": [
    "simlet.json"
  ],
  "Ext.ux.Spotlight": [],
  "Ext.ux.grid.FiltersFeature": [
    "feature.filters"
  ],
  "Ext.ux.data.PagingMemoryProxy": [
    "proxy.pagingmemory"
  ]
});