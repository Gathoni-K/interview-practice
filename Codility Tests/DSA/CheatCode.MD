# Cheatcodes.

## 1.Constraint.

-If the constraints sections hints the kind of solutions expected.

-If:

1. N <= 1000,  a O(N^2) nested loop is acceptable.
2. N <=100000, A O(N) or O(N log N) solution is acceptable, a single loop with Set, Map or Pointers is expected.

## 2.The 'Guard Clause' Lifesaver.

-Tests empty arrays or single-item arrays.

-The guard clauses are used to instantly catch extremes.

    function solution(A) {
        if (A.length === 0) return 0;
        //this is our guard clause
        if (A.length === 1) return A[0];
        //also a guard clause

        //...rest of our logic
    }

## 3.MAX_INT / MIN_INT Trap.

-When asked to find a minimum value, do not initialize tracking variable to 0 or 100, instead, initialize it to 'Infinity' or 'Number.MAX_SAFE_INTEGER' In JS.

-If looking for a max. value, initialize using '-Infinity'

## 4.Add Custom Test Case.

-To ensure our code is completely secure, type in the following evil edge cases:


    [] - empty
    [0, 0, 0] - all zeros
    [-1000, 1000] - extremes

-Run code against these to ensure it doesn't crash.

## 5.Correctness > Performance.

-On looking at the problem and no solution comes to mind, write the slow brute-force version.

-A slow solution perfectly handling the edge cases will get one 100% on correctness and 0% on performance, an overall score of 50% attained.

