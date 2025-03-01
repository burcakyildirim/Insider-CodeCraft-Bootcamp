let startingNum= 0;
let longestChain = 0;
const collatzCache = {};

function collatzLength(n) {
    if (n in collatzCache) return collatzCache[n];

    let count = 1;
    let original = n;

    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3*n + 1;
        }
        if (n in collatzCache) {
            count += collatzCache[n];
            break;
        }
        count++;
    }

    collatzCache[original] = count;
    return count;
}

for (let i = 1; i < 1000000; i++) {
    let length = collatzLength(i);
    if (length > longestChain) {
        longestChain = length;
        startingNum = i;
    }
}

console.log(startingNum);
