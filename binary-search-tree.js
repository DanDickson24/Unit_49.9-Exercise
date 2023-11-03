class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return this; 
      }
    }
  }

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
      } else {
        this.insertRecursively(val, current.left);
      }
    } else if (val > current.val) {
      if (!current.right) {
        current.right = new Node(val);
      } else {
        this.insertRecursively(val, current.right);
      }
    }

    return this;
  }

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    
    if (val === current.val) {
      return current;
    } else if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  dfsPreOrder(current = this.root, result = []) {
    if (current) {
      result.push(current.val);
      this.dfsPreOrder(current.left, result);
      this.dfsPreOrder(current.right, result);
    }
    return result;
  }

  dfsInOrder(current = this.root, result = []) {
    if (current) {
      this.dfsInOrder(current.left, result);
      result.push(current.val);
      this.dfsInOrder(current.right, result);
    }
    return result;
  }

  dfsPostOrder(current = this.root, result = []) {
    if (current) {
      this.dfsPostOrder(current.left, result);
      this.dfsPostOrder(current.right, result);
      result.push(current.val);
    }
    return result;
  }

  bfs() {
    const result = [];
    const queue = [];
    if (this.root) {
      queue.push(this.root);
      while (queue.length) {
        const current = queue.shift();
        result.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return result;
  }

  remove(val) {
    function findMinNode(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }

    function removeNode(current, value) {
      if (!current) {
        return null;
      }

      if (value < current.val) {
        current.left = removeNode(current.left, value);
      } else if (value > current.val) {
        current.right = removeNode(current.right, value);
      } else {
        if (!current.left) {
          return current.right;
        } else if (!current.right) {
          return current.left;
        }

        const minValueNode = findMinNode(current.right);
        current.val = minValueNode.val;
        current.right = removeNode(current.right, minValueNode.val);
      }
      return current;
    }

    this.root = removeNode(this.root, val);
    return this;
  }

  isBalanced() {
    function checkBalance(node) {
      if (!node) {
        return { balanced: true, height: 0 };
      }

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      if (
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1
      ) {
        return { balanced: true, height: Math.max(left.height, right.height) + 1 };
      }

      return { balanced: false, height: 0 };
    }

    const result = checkBalance(this.root);
    return result.balanced;
  }

  findSecondHighest() {
    function findSecondHighestNode(node) {
      if (!node || (!node.left && !node.right)) {
        return null;
      }

      if (node.right && !node.right.right && !node.right.left) {
        return node.val;
      }

      return findSecondHighestNode(node.right);
    }

    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    return findSecondHighestNode(this.root);
  }
}

module.exports = BinarySearchTree;
