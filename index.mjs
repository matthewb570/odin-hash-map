import HashMap from './hashmap.mjs';

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.buckets.length); // 16

test.set('apple', 'yellow');
test.set('banana', 'red');

console.log(test.buckets.length); // 16

test.set('moon', 'silver');

console.log(test.buckets.length); // 32

test.set('moon', 'yellow');

console.log(test.buckets.length); // 32

console.log(test.get('apple')); // yellow
console.log(test.get('kangaroo')); // null
console.log(test.has('apple')); // true
console.log(test.has('kangaroo')); // false
console.log(test.remove('apple')); // true
console.log(test.remove('apple')); // false
console.log(test.has('apple')); // false
console.log(test.length()); // 12
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.length()); // 0