// this is the same question but solved using sets

function solution(A) {
    if (A.length === 0) return 0;
    if (A.length === 1) return A[0];

    const lonerSet =  new Set();
    //initialize the new set like so

    for (const num of A){
        if (lonerSet.has(num)) {
            //checks in our set if the number is present
            lonerSet.delete(num);
            //if the number has been seen before, it is a pair and it should be removed
        }
        else{
            lonerSet.add(num);
            //if it is the first time seeing the number, add it to our set
        }

    }

    return lonerSet.values().next().value;
    //the only left in our set is the unpaired number.
    //we cannot return the value the same we would in an array as sets have no concept of indexes.

}