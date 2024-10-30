import LinkedList from "./linkedlist.mjs";

const LOAD_FACTOR = 0.75;

class HashMap {

    buckets;

    constructor() {
        this.buckets = new Array(16);
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }

        return hashCode;
    }

    set(key, value) {
        const keyHash = this.hash(key);

        if ((this.buckets[keyHash] === undefined || this.buckets[keyHash] === null || !this.buckets[keyHash].contains(key)) && this.length() >= this.buckets.length * LOAD_FACTOR) {
            this.grow();
        }

        if (this.buckets[keyHash] === undefined || this.buckets[keyHash] === null) {
            this.buckets[keyHash] = new LinkedList();
        } else if (this.buckets[keyHash].contains(key)) {
            this.buckets[keyHash].removeAt(this.buckets[keyHash].find(key));
        }
        this.buckets[keyHash].append(key, value);
    }

    get(key) {
        const keyHash = this.hash(key);

        if (this.buckets[keyHash] !== undefined && this.buckets[keyHash] !== null) {
            const linkedListIndex = this.buckets[keyHash].find(key);
            if (linkedListIndex !== null) {
                return this.buckets[keyHash].at(linkedListIndex).value;
            }
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null ? true : false;
    }

    remove(key) {
        if (!this.has(key)) {
            return false;
        }

        const keyHash = this.hash(key);
        const linkedListIndex = this.buckets[keyHash].find(key);
        this.buckets[keyHash].removeAt(linkedListIndex);
        return true;
    }

    length() {
        let length = 0;
        this.buckets.forEach((linkedList) => {
            if (linkedList !== undefined && linkedList !== null) {
                length += linkedList.size();
            }
        });
        return length;
    }

    clear() {
        this.buckets = new Array(16);
    }

    keys() {
        let keysList = [];
        this.buckets.forEach((linkedList) => {
            if (linkedList !== undefined && linkedList !== null) {
                for (let i = 0; i < linkedList.size(); i++) {
                    keysList.push(linkedList.at(i).key);
                }
            }
        });
        return keysList;
    }

    values() {
        let valuesList = [];
        this.buckets.forEach((linkedList) => {
            if (linkedList !== undefined && linkedList !== null) {
                for (let i = 0; i < linkedList.size(); i++) {
                    valuesList.push(linkedList.at(i).value);
                }
            }
        });
        return valuesList;
    }

    entries() {
        let entriesList = [];
        this.buckets.forEach((linkedList) => {
            if (linkedList !== undefined && linkedList !== null) {
                for (let i = 0; i < linkedList.size(); i++) {
                    let node = linkedList.at(i);
                    entriesList.push({
                        key: node.key,
                        value: node.value
                    });
                }
            }
        });
        return entriesList;
    }

    grow() {
        const entriesList = this.entries();
        this.buckets = new Array(this.buckets.length * 2);
        entriesList.forEach(entry => {
            this.set(entry.key, entry.value);
        });
    }
}

export default HashMap;