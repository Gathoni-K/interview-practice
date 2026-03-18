/*
-An array consisting of N integers.

-Rotation of the array means that each element is shifted right by one idex,
last element of the array moved to the first place.

A = [3,8,9,7,6]
Rotated A = [6,3,8,9,7]

-The goal is to rotate array A k times, each element of A will be shifted to the right K times

-For example given:

    A = [3,48,9,7,6]
    K = 3
-The function should return the rotated array shown above, three rotations were made

Assumptions made:
1.N and K are integers within the range [0...100]
2.Each element of array A is an integer within the range [-10000....10000]

*/

function reverse(A, start, end) {
    while (start < end) {
        let temp = A[start];
        //variable to store the value in the first index
        A[start] = A[end];
        //setting the first index to the last index
        A[end] = temp;
        //setting the last index to the first
        start ++;
        //add to move to the next index
        end --;
        //subtract to move to the previous index
    }
}

function solution(A,k){

    if (A.length === 0) return 0;
    if (A.length === 1) return A;
    //our guard cases

    const n = A.length;

    k = k % n;
    //handles the case where k > n

    reverse(A, n - k, n -1);
    //reverse last k numbers

    reverse(A, 0, n - k -1);
    //reverse the first n-k terms

    reverse(A, 0, n -1);

    return [A];

}