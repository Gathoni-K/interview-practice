/*
    Codility lesson 6

-Write a function that given an array consisting of N integers, returns the number of distinct values in array A.

-Given array A consists of 6 elements such that:
    A[0] = 2    A[4] = 3
    A[3] = 2    A[2] = 1
    A[1] = 1    A[5] = 1

the function should return 3 as there are 3 distinct values appearing in array A.

Assumptions:

1.N is an integer within the range 1 - 100,000
2.each element of array A is an integer within the range [-1000000, 1000000]

*/

function solution(A) {
    if (A.length === 0) return 0;
    if (A.length === 1) return 1;

    const frequencyMap = A.reduce((countMap, item) => {
        countMap[item] = (countMap[item] || 0) + 1;

        return countMap;
    }, {});
    /*
    The reduce method accepts two arguments, the callback function and the initial value.
    -Our initial value is defined as the empty map, the empty curly braces at the end.
    -The other part is our callback function with 2 parameters, countMap and item.
    countMap being our accumulator and item being our currentValue.
    
    */

    return Object.keys(frequencyMap).length;
    //return the number of keys in our map.
    /*
    Object.keys - a method used to convert an object into an array.
    -It does this by converting the entire object into an array.
    */
};
