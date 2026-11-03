
// Approach 1: Sorting 

var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}; 

// Approach 2
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    const count = {};

    for(const char of s ) {
        count[char] = (count[char] || 0) + 1;
    }

    for(const char of t ) {
        count[char] = (count[char] || 0) - 1;
        if (count[char] < 0) return false;
    }
    return true;

};