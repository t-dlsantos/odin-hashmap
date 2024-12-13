class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.capacity = 16;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  } 

  set(key, value) {
    const bucket = this.hash(key) % this.capacity;
    let current = this.buckets[bucket];
    
    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets.length === this.capacity * 0.75) {
      this.buckets.push(new Array(this.capacity * 2).fill(null));
    }

    while(current !== null)  {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }

    const newNode = new Node(key, value);
    newNode.next = this.buckets[bucket];
    this.buckets[bucket] = newNode;
  }

  
  get(key) {
    const bucket = this.hash(key) % this.capacity;
    let current = this.buckets[bucket];

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    
    while(current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next
    }

    return null;
  }


  has(key) {
    const bucket = this.hash(key) % this.capacity;

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let current = this.buckets[bucket];

    while (current !== null) {
      if (current.key === key)
        return true;
      current = current.next;
    }
    
    return false;
  }

  remove(key) {
    const bucket = this.hash(key) % this.capacity;

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let current = this.buckets[bucket];
    let previous = null;

    while (current !== null) {
      if (current.key === key) {
        if (current.next === null) {
          previous = null;
          return true;
        }
        else if (current === this.buckets[bucket]) {
          this.buckets[bucket] = current.next;
          return true;
        }
        else if (current.next !== null) {
          previous.next = current.next;
          return true;
        }
      }
      previous = current;
      current = current.next;
    }

    return false;
  }

  length() {
    let count = 0;
    let current = null;

    for (let i = 0; i < this.buckets.length; i++) {
      current = this.buckets[i];
      while (current !== null) {
        count++;
        current = current.next
      }
    }    
    return count;
  }

  clear() {
    this.buckets = new Array(16).fill(null)
  }

  keys() {
    let keys = [];
    let current = null;

    for (let i = 0; i < this.buckets.length; i++) {
      current = this.buckets[i];
      while (current !== null) {
        keys.push(current.key)
        current = current.next
      }
    }  
    
    return keys;
  }

  values() {
    let values = [];
    let current = null;

    for (let i = 0; i < this.buckets.length; i++) {
      current = this.buckets[i];
      while (current !== null) {
        values.push(current.value)
        current = current.next
      }
    }  
    
    return values;
  }

  entries() {
    let current = null;
    let array = [];



    for (let i = 0; i < this.buckets.length; i++) {
      current = this.buckets[i];
      while (current !== null) {
        array.push([ current.key, current.value ]);
        current = current.next;
      }
      
    }  

    return array;
  }

}

export default HashMap;