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
Ext.define("popup.view.TreeFilter", {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.treeFilter',
  collapseOnClear: false, // collapse all nodes when clearing/resetting the filter
  allowParentFolders: false, // allow nodes not designated as 'leaf' (and their child items) to  be matched by the filter
  runningFilters: [],
  init: function (tree) {
    var me = this;

    me.tree = tree;

    tree.filter = Ext.Function.bind(me.filter, me);
    tree.clearFilter = Ext.Function.bind(me.clearFilter, me);
    tree.filterBy = Ext.Function.bind(me.filterBy, me);
  },
  filter: function (re, property, scope) {
    var me = this,
        rf;

    me.clearFilter(function() {
      if (Ext.isEmpty(re)) { // if the search field is empty
        return;
      }

      property = property || 'text';// property is optional - will be set to the 'text' property of the  treeStore record by default
      re = typeof re == "object" ? re : new RegExp(re, "ig"); // the regExp could be modified to allow for case-sensitive, starts  with, etc.

      rf = { key: re, stop: false };

      me.runningFilters.push(rf);

      // iterate over all nodes in the tree in order to evaluate them against the search criteria
      me.filterBy(rf, function (node) {
        return node.get(property).match(re); // if the node matches the search criteria and is a leaf (could be  modified to search non-leaf nodes)
      }, scope);
    }, scope);
  },
  filterBy: function (rf, fn, scope) {
    var me = this,
        tree = me.tree,
        matches = [], // array of nodes matching the search criteria
        root = Ext.valueFrom(scope, tree.getRootNode()), // root node of the tree
        visibleNodes = [], // array of nodes matching the search criteria + each parent non-leaf  node up to root
        viewNode;

    if (rf.stop || !fn) {
      me.removeRF(rf);

      return;
    }

    me.expandTree(root.childNodes, rf, function() {
      root.cascadeBy(function (node) {
        if (fn.call(scope || me, node)) {
          matches.push(node);// add the node to the matches array
        }
      });

      if (me.allowParentFolders === false) { // if me.allowParentFolders is false (default) then remove any  non-leaf nodes from the regex match
        Ext.each(matches, function (match) {
          if (match !== undefined) {
            if (!match.isLeaf()) {
              Ext.Array.remove(matches, match);
            }
          }
        });
      }

      Ext.each(matches, function (item) { // loop through all matching leaf nodes
        root.cascadeBy(function (node) { // find each parent node containing the node from the matches array
          if (node.contains(item) === true) {
            visibleNodes.push(node); // if it's an ancestor of the evaluated node add it to the visibleNodes  array
          }
        });

        // Commented out because this shows all children whether or not they pass the filter
        if (me.allowParentFolders === true && !item.isLeaf()) { // if me.allowParentFolders is true and the item is  a non-leaf item
          item.cascadeBy(function (node) { // iterate over its children and set them as visible
            visibleNodes.push(node);
          });
        }

        visibleNodes.push(item); // also add the evaluated node itself to the visibleNodes array
      });

      root.cascadeBy(function (node) { // finally loop to hide/show each node
        if (rf.stop) {
          return false;
        }

        viewNode = Ext.fly(tree.getView().getNode(node)); // get the dom element associated with each node

        if (viewNode) { // the first one is undefined ? escape it with a conditional
          viewNode.setVisibilityMode(Ext.Element.DISPLAY); // set the visibility mode of the dom node to display (vs offsets)
          viewNode.setVisible(Ext.Array.contains(visibleNodes, node));
        }
      });

      me.removeRF(rf);
    }, scope);
  },
  clearFilter: function(callback, scope) {
    var me = this,
        tree = this.tree,
        root = tree.getRootNode(),
        viewNode,
        i,
        len = me.runningFilters.length;

    for (i = 0; i < len; i++) {
      me.runningFilters[i].stop = true;
    }

    if (me.collapseOnClear) {
      tree.collapseAll(function() {
        root.cascadeBy(function (node) { // final loop to hide/show each node
          viewNode = Ext.fly(tree.getView().getNode(node)); // get the dom element associated with each node

          if (viewNode) { // the first one is undefined ? escape it with a conditional and show  all nodes
            viewNode.show();
          }
        });

        Ext.callback(callback, scope);
      });
    } else {
      Ext.callback(callback, scope);
    }
  },
  expandTree: function(nodesParam, rf, callback, scope) {
    var me = this,
        nodes = nodesParam.slice(0),
        node = nodes[0];

    if (rf.stop || !nodes || nodes.length < 1) {
      nodes = [];

      Ext.callback(callback, scope);

      return;
    }

    if (node.isExpandable()) {
      node.expand(false, function () {
        me.expandTree(node.childNodes, rf, function () {
          nodes.shift();

          me.expandTree(nodes, rf, callback, scope);
        }, scope);
      }, scope);
    } else {
      nodes.shift();

      me.expandTree(nodes, rf, callback, scope);
    }
  },
  removeRF: function(rf) {
    var me = this,
        i,
        len = me.runningFilters.length;

    for (i = 0; i < len; i++) {
      if (me.runningFilters[i].key === rf) {
        me.runningFilters.splice(i, 1);

        break;
      }
    }
  }
});
