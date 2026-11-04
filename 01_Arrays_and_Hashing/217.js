//Approach 1
const containsDuplicate = function(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true; 
    }
    set.add(num);x
  }

  return false;
};

//Approach 2: sorting

var containsDuplicate1 = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) return true;
    }
    return false;
};   