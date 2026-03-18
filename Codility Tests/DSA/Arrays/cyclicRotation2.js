/*
-The main idea of this approach is to ensure that k is within bounds by taking k % n, where n is the array size.
-A temporary result array is created where the last k elements in the original array are placed at the beginning.
-The remaining n - k elements are then copied after these.
-The elements are then copied from the result array back to the original array to achieve an in-place update.

-The method uses index arithmetic to calculate positions effectively

*/

function rotateClockwise(arr, k) {
    const n = arr.length;

    k = k % n;
    //handles cases where k > n

    let res = [];
    //out temporary array to store the rotated elements

    for(let i = 0; i < n; i++) {
        if (i < k) {

            res.push(arr[n + i -k]);
            //adds last k elements to the front
        }
        else {
            res.push(arr[i - k]);
            //shifts the remaining elements
        }
    }

    for (let i = 0; i < n; i++) {
        arr[i] = res[i];
    }
    //copy rotated result back into OG array
}