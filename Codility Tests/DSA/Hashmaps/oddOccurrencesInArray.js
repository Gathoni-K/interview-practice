/*
    Codility Lesson 2.

-A non-empty array A consisting of n integers is given. The array contains an odd number of elements
and each element of the array can be paired with another element having the same value,
except for one element left unpaired.

-In array A such that:

    A[0] = 9    A[2] = 9
    A[3] = 3    A[4] = 9
    A[6] = 9   A[1] = 3
    A[5] = 7

-The elements at:
    indexes 0 and 2 have the value 9
    indexes 1 and 3 have value 3
    indexes 4 and 6 have 9
    element at index 5 has value 7 and is unpaired

-Write a function that when given an array A with integers N fulfilling the above conditions, returns the value
of the unpaired element

Assumptions:
1.N is an odd integer within the range 
2.each element of array A is an integer within the range 1 - 1 million
3.all but one of the values in A occur an even number of times.

-The constraints tell us that a nested loop cannot be used.

*/

function solution(A) {

    if(A.length === 0) return 0;
    if (A.length === 1) return A[0];
    //above are our guard cases

    const frequencyMap = A.reduce((countMap, item) => {
        countMap[item] = (countMap[item] || 0) + 1;
        //line handling the heavy lifting of counting frequencies
        //the conditional part is a safety loop such that, if the answer is undefined, we pretend it is 0.
        //it is basically countMap acting as the blank piece of paper and hands over a number in the array and sets the tally to 1.
        //it tells JS, if the tally is undefined, set it to 0.

        return countMap;
    }, {});
    /*
    'reduce' is a method looping through an array and reduces it down into a 
    single thing.
    -The array of numbers is reduced into a single object acting as a Hash map
    
    countMap - acts as the blank notebook that is used as we walk through the array and tallies are written
    on it.
    item - is the current number we are looking at
    
    -the empty braces at the end tells JS that our countMap should start as an empty object
    */

    for(const key in frequencyMap) {
        //the for...in loop is designed to loop through the keys of an object
        if(frequencyMap[key] % 2 !== 0 ) {
            //here we are dividing the value by the modulo operator
            return Number(key);
        }
    }

}