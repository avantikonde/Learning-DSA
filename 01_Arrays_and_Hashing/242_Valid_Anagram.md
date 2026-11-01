# 242. Valid Anagram

- **Difficulty:** Easy
- **Topic:** Arrays & Hashing
- **Pattern:** Frequency Counting (Hash Map / Fixed-Size Array)
- **LeetCode Link:** [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)

---

## 1. Problem Summary

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.
An **anagram** is a word formed by rearranging the letters of another word, using all original letters exactly once.

### Key Constraints & Observations
- If `s.length !== t.length`, they **cannot** be anagrams $\rightarrow$ immediate $O(1)$ early exit.
- Lowercase English letters only: the alphabet is fixed at size **26**.

---

## 2. Solutions & Complexity Comparison

| Approach | Time Complexity | Space Complexity | Why / Notes |
| :--- | :--- | :--- | :--- |
| **1. Sorting** | $O(n \log n)$ | $O(n)$ in JS | Simple to write, but creates temporary arrays and runs slower. |
| **2. Frequency Map (Your solution) ★** | **$O(n)$** | **$O(1)$** | **Optimal.** Single pass per string with early exit. |
| **3. Fixed Array (26 Buckets)** | **$O(n)$** | **$O(1)$** | Optimal memory layout, uses `charCodeAt()`. |

> [!NOTE]
> **Why is Space $O(1)$ and NOT $O(n)$?**
> Even if both strings are 1,000,000 characters long, our hash table or array will **never store more than 26 distinct keys** (letters 'a' through 'z'). Since 26 is a constant, space complexity is $O(26) = O(1)$.

---

## 3. Core DSA Concept: The Frequency Counter Pattern

### What is Frequency Counting?
Whenever a problem asks about permutations, anagrams, or occurrences of elements, avoid nested loops ($O(n^2)$) by converting the data into a **tally of occurrences**.

### Why Your 2-Loop Logic is Brilliant:
```javascript
for (const char of s) {
    count[char] = (count[char] || 0) + 1;
}

for (const char of t) {
    count[char] = (count[char] || 0) - 1;
    if (count[char] < 0) return false;
}
return true;
```
1. **Loop 1:** Tallies all character counts in string `s` ($+1$).
2. **Loop 2:** Decrements counts for string `t` ($-1$).
3. **The Early Exit Trick:**
   - If a character in `t` never existed in `s`, `count[char]` is `undefined`. `(undefined || 0) - 1` becomes `-1`, which is `< 0`, instantly returning `false`.
   - If a character in `t` appears more times than in `s`, the count drops below 0, instantly returning `false`.
   - Because `s.length === t.length` was validated at the start, if no count is negative, all counts **must mathematically be exactly 0**. You avoid a third loop over the object keys!

---

## 4. JavaScript Deep-Dive & Nuances

### 1. The Sorting Approach: Behind the Scenes
```javascript
return s.split('').sort().join('') === t.split('').sort().join('');
```
Why this is less optimal in JavaScript:
- **Strings are immutable in JS:** JS cannot sort strings in-place.
- `.split('')` allocates a brand new array of $n$ elements in memory.
- `.sort()` sorts that array in $O(n \log n)$.
- `.join('')` allocates another new string in memory.
- Total memory overhead: allocates multiple arrays and strings of length $n$.

### 2. The Idiomatic Frequency Counting Trick: `(count[char] || 0) + 1`
- If `count[char]` is `undefined` (first time seeing the letter), `undefined` is falsy, so it falls back to `0`. Then `0 + 1 = 1`.
- If `count[char]` already exists (e.g., `2`), `2` is truthy, so `2 + 1 = 3`.
- *Note:* In modern JS, you can also write `(count[char] ?? 0) + 1` using the Nullish Coalescing operator (`??`).

### 3. Alternative Optimal Pattern: 26-Element Typed Array
In low-level or high-performance JS, using an integer typed array is even faster than object key lookups:
```javascript
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    
    // Int32Array is pre-allocated with 26 zeros
    const freq = new Int32Array(26);
    
    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - 97]++;
        freq[t.charCodeAt(i) - 97]--;
    }
    
    for (let i = 0; i < 26; i++) {
        if (freq[i] !== 0) return false;
    }
    
    return true;
};
```
- `s.charCodeAt(i) - 97`: Converts `'a'` $\rightarrow$ `0`, `'b'` $\rightarrow$ `1`, ..., `'z'` $\rightarrow$ `25`.
- Directly indexes into memory without hashing or object property lookup overhead.

---

## 5. Interview Talking Points

1. **Length Check First:** *"First, if the lengths don't match, return false immediately in $O(1)$."*
2. **Brute Force vs Optimal:** *"A quick way is sorting both strings in $O(n \log n)$ time, but we can do better in $O(n)$ time using a frequency counter."*
3. **Space Complexity Precision:** *"Because the input consists only of lowercase English letters, the space complexity is $O(1)$ constant space since our table size is capped at 26."*
