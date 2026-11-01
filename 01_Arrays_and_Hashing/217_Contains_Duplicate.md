# 217. Contains Duplicate

- **Difficulty:** Easy
- **Topic:** Arrays & Hashing
- **Pattern:** Hash Set (Lookup & Deduplication)
- **LeetCode Link:** [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

---

## 1. Problem Summary

Given an integer array `nums`, return:
- `true` if any value appears at least twice in the array.
- `false` if every element is distinct.

### Example Walkthrough
- Input: `nums = [1, 2, 3, 1]` $\rightarrow$ Output: `true` (value `1` appears twice).
- Input: `nums = [1, 2, 3, 4]` $\rightarrow$ Output: `false` (all elements distinct).

---

## 2. Solutions & Complexity Comparison

| Approach | Time Complexity | Space Complexity | Pros / Cons |
| :--- | :--- | :--- | :--- |
| **1. Brute Force (Nested Loops)** | $O(n^2)$ | $O(1)$ | No extra memory, but TLE (Time Limit Exceeded) for large $n$. |
| **2. Sorting First** | $O(n \log n)$ | $O(1)$ or $O(n)$ | Saves space, but modifies array / slower runtime than $O(n)$. |
| **3. Hash Set (Early Exit) ★** | **$O(n)$** | **$O(n)$** | **Optimal.** Stops as soon as duplicate is found. |
| **4. Hash Set (One-Liner)** | $O(n)$ | $O(n)$ | Clean and concise, but always scans entire array. |

---

## 3. Core DSA Concept: The Hash Set

### Why use a Set over an Array?
- **Array search (`arr.includes(val)`):** $O(n)$ time. The engine scans item by item from index `0`. Inside a loop of $n$ items, using `arr.includes()` turns your code into $O(n^2)$.
- **Set search (`set.has(val)`):** **$O(1)$ amortized time**. JavaScript engines (like Google V8) implement `Set` using an underlying hash table. It hashes the element into an index directly.

### The Time-Space Trade-off
To speed up time from $O(n^2)$ down to $O(n)$, we "pay" for it with extra memory ($O(n)$ space) by storing visited numbers in the Set. This is the single most common trade-off in DSA.

---

## 4. JavaScript Deep-Dive & Nuances

### ⚠️ Pitfall 1: Missing Variable Declaration in `for...of`
In your initial code:
```javascript
for (num of nums) { // ❌ DANGEROUS!
```
- In sloppy mode, this leaks `num` as a **global variable** on `window` (or `global`).
- In strict mode (`"use strict"`), this throws a runtime `ReferenceError: num is not defined`.
- **Always declare loop variables:**
```javascript
for (const num of nums) { // ✅ Clean, block-scoped, immutable per iteration
```
*(Use `const` because on each iteration a fresh binding is created for that item).*

---

### 💡 Nuance 2: Set Equality Algorithm (`SameValueZero`)
JavaScript `Set` uses the **SameValueZero** algorithm for comparison:
- Unlike `===`, in a `Set`: `NaN` is treated as equal to `NaN` (so `new Set([NaN, NaN]).size === 1`).
- `+0` and `-0` are considered identical.
- Primitive values (numbers, strings, booleans) match by value. Objects/arrays match by reference address.

---

### 💡 Nuance 3: Early Exit vs. One-Liner

#### Approach A: Early-Exit Loop (Best for Interviews & Performance)
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = function(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return true; // Exits immediately on first duplicate
        }
        seen.add(num);
    }
    
    return false;
};
```
- **Best Case Time:** $O(1)$ — if the duplicate is at `nums[0]` and `nums[1]`, it returns on iteration 2!
- **Worst Case Time:** $O(n)$ — if all elements are unique or duplicate is at the very end.

#### Approach B: The Idiomatic JS 1-Liner
```javascript
const containsDuplicate = (nums) => new Set(nums).size !== nums.length;
```
- Creates a `Set` from the entire array and compares its `size` with `nums.length`.
- **Pros:** Very concise, expressive.
- **Cons:** Always processes every single element into memory even if duplicates are at the very start ($O(n)$ always).

---

## 5. Interview Checklist & How to Explain in an Interview

When asked this in an interview, talk through your thought process:
1. **Clarify inputs:** *"Can the array be empty or have 1 element? (If yes, return false immediately)."*
2. **State brute force:** *"The naive way is checking all pairs with two nested loops in $O(n^2)$ time and $O(1)$ space."*
3. **Propose optimal solution:** *"We can optimize time to $O(n)$ by using a Hash Set to track seen numbers. Lookups in a Set take $O(1)$ time on average."*
4. **State Big-O explicitly:**
   - **Time Complexity:** $O(n)$ — single pass through the array.
   - **Space Complexity:** $O(n)$ — up to $n$ unique elements stored in the Set.
