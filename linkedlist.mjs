import Node from "./node.mjs";

class LinkedList {
    headNode;
    tailNode;

    append(key, value) {
        if (this.headNode == null) {
            this.headNode = new Node(key, value);
            this.tailNode = this.headNode;
        } else {
            this.tailNode.nextNode = new Node(key, value);
            this.tailNode = this.tailNode.nextNode;
        }
    }

    prepend(key, value) {
        if (this.headNode == null) {
            this.headNode = new Node(key, value);
            this.tailNode = this.headNode;
        } else {
            let newNode = new Node(key, value, this.headNode);
            this.headNode = newNode;
        }
    }

    size() {
        let currentNode = this.headNode;
        let count = 0;
        while (currentNode != null) {
            currentNode = currentNode.nextNode;
            count++;
        }

        return count;
    }

    head() {
        return this.headNode;
    }

    tail() {
        return this.tailNode;
    }

    at(index) {
        let currentNode = this.headNode;
        let count = 0;
        while (currentNode != null && count !== index) {
            currentNode = currentNode.nextNode;
            count++;
        }

        if (count !== index) {
            return null;
        }

        return currentNode;
    }

    pop() {
        if (this.headNode == null) {
            return null;
        }

        if (this.headNode.nextNode == null) {
            let nodeValue = this.headNode.value;
            this.headNode = null;
            this.tailNode = null;
            return nodeValue;
        }

        let currentNode = this.headNode;
        while (currentNode.nextNode != null && currentNode.nextNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }

        let tailNodeValue = this.tailNode.value;
        currentNode.nextNode = null;
        this.tailNode = currentNode;

        return tailNodeValue;
    }

    contains(key) {
        if (this.headNode == null) {
            return false;
        }

        let currentNode = this.headNode;
        while (currentNode != null) {
            if (currentNode.key === key) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        return false;
    }

    find(key) {
        let currentNode = this.headNode;
        let count = 0;
        while (currentNode != null) {
            if (currentNode.key === key) {
                return count;
            }
            currentNode = currentNode.nextNode;
            count++;
        }
        
        return null;
    }

    toString() {
        let string = "";
        let currentNode = this.headNode;
        while (currentNode != null) {
            string += `( ${currentNode.key}, ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }
        string += "null";

        return string;
    }

    insertAt(key, value, index) {
        if (index === 0) {
            this.prepend(key, value);
        } else if (index >= this.size()) {
            this.append(key, value);
        } else {
            let nodeBeforeIndex = this.at(index - 1);
            let nodeAtIndex = this.at(index);
            let newNode = new Node(key, value, nodeAtIndex);
            nodeBeforeIndex.nextNode = newNode;
        }
    }

    removeAt(index) {
        if (this.headNode == null) {
            return null;
        }
        
        if (index === 0) {
            let removedValue = this.headNode.value;
            this.headNode = this.headNode.nextNode;
            if (this.headNode == null) {
                this.tailNode = null;
            }
            return removedValue;
        }

        if (index >= this.size()) {
            return null;
        }

        let nodeToRemove = this.at(index);
        let nodeBeforeRemoval = this.at(index - 1);
        nodeBeforeRemoval.nextNode = nodeToRemove.nextNode;
        return nodeToRemove.value;
    }
}

export default LinkedList;