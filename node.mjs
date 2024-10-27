class Node {
    key;
    value;
    nextNode;

    constructor(key = null, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

export default Node;