const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  tree = null;
  root() {
    return this.tree;
  }

  add(data) {
    if (!this.tree) {
      this.tree = new Node(data);
      return;
    }
    function addNewNode(nodeTtee) {
      if (nodeTtee.data > data) {
        if (!nodeTtee.left) {
          nodeTtee.left = new Node(data);
          return;
        }
        addNewNode(nodeTtee.left);
      }
      if (nodeTtee.data < data) {
        if (!nodeTtee.right) {
          nodeTtee.right = new Node(data);
          return;
        }
        addNewNode(nodeTtee.right);
      }
    }
    addNewNode(this.tree);
  }

  has(data) {
    function checkHas(nodeTtee) {
      if (!nodeTtee) return false;
      if (nodeTtee.data === data) return true;
      if (nodeTtee.left?.data === data || nodeTtee.right?.data === data)
        return true;
      if (nodeTtee.data < data) return checkHas(nodeTtee.right);
      if (nodeTtee.data > data) return checkHas(nodeTtee.left);
      return false;
    }
    return checkHas(this.tree);
  }

  find(/* data */) {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }

  remove(/* data */) {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }

  min() {
    if (!this.tree) return null;

    let node = this.tree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.tree) return null;

    let node = this.tree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
