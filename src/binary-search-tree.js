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

  find(data) {
    function findNodeTree(node) {
      if (!node) return null;
      if (node.data === data) return node;
      if (node.data < data) return findNodeTree(node.right);
      if (node.data > data) return findNodeTree(node.left);
      return null;
    }
    return findNodeTree(this.tree);
  }

  remove(data) {
    let curNode = this.tree;
    let prevNode = null;

    while (curNode) {
      if (curNode.data === data) {
        //есть ли дочерние ноды
        if (!curNode.left && !curNode.right) {
          if (!prevNode) this.tree = null;
          else
            prevNode.right === curNode
              ? (prevNode.right = null)
              : (prevNode.left = null);
          break;
        }
        // нет меньшего нода
        if (!curNode.left) {
          if (!prevNode) this.tree = curNode.right;
          else
            prevNode.left === curNode
              ? (prevNode.left = curNode.right)
              : (prevNode.right = curNode.right);
          break;
        }
        //нет большего нода
        if (!curNode.right) {
          if (!prevNode) this.tree = curNode.left;
          else
            prevNode.left === curNode
              ? (prevNode.left = curNode.left)
              : (prevNode.right = curNode.left);
          break;
        }
        //нет меньнего нода у правого поддерева
        if (!curNode.right.left) {
          if (!prevNode) {
            this.tree.data = curNode.right.data;
            this.tree.right = curNode.right.right;
          } else {
            if (prevNode.left === curNode) {
              prevNode.left.data = curNode.right.data;
              prevNode.left.right = curNode.right.right;
            } else {
              prevNode.right.data = curNode.right.data;
              prevNode.right.right = curNode.right.right;
            }
          }
          break;
        }
        //есть меньший нод
        let minNode = curNode.right.left;
        let prevNodeMinNode = curNode.right;
        while (minNode.left) {
          prevNodeMinNode = minNode;
          minNode = minNode.left;
        }
        curNode.data = minNode.data;
        prevNodeMinNode.left = minNode.right || null;
        break;
      }

      prevNode = curNode;
      if (curNode.data > data) curNode = curNode.left;
      else curNode = curNode.right;
    }
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
