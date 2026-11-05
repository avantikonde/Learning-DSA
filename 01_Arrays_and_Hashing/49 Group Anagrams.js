var groupAnagrams = function(strs) {
    const map = new Map();
    for (const str of strs) {
        const Key = str.split('').sort().join('');
        if (!map.has(Key)) {
            map.set(Key, []);
        }
        map.get(Key).push(str);
    }
    return Array.from(map.values());
};  
