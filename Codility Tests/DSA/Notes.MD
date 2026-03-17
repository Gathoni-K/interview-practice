# HASMAPS

## Odd Occurrences in Array - Lesson 2

**Approch 1**

-Use of maps.

-Initialization:

    new Map() - used to initialize a map.

-The O(1) lookup is the reason hash maps are used instead of arrays.

    countMap[item]

-Used to check if a piece of data exists instantly, without having to loop through everything to find it.

-Hashmaps stores data in key-value pairs, the key is what uniquely identifies a record, this being the number in our array and the values are the frequencies.

    countMap[item] = (countMap[item] || 0) + 1;

-The standard format for dynamically assigning or updating a value inside an object would be:

    object[key] = value

-Iteration through the map is handled by looping through the keys inside our map to find the final answer, this is handled in the for...in loop.

-The for...of loop can also be used.

-A JS Object only allows string or symbols as keys, thus the values in our arrays are turned to strings and thus need to be converted to a number before returning them.

    return Number(key);

**Approach 2**
-Use of sets.

-Set objects are collections of values.

-Stores unique values of any type, whether primitive values or object references.

-A value in the set may occur only once.

-One can iterate through the elements of a set in insertion order.

-The insertion order corresponds to the order in which the element was inserted into the set by the 'add()' method.

-The 'has' method checks if a value is in the set.

-A set-like object is one providing the following:

    size - property containing a number.
    has() - method taking an element and returning a boolean
    keys() - method returning an iterator of the elements in the set.


## Distinct - Lesson 6.

-Question tests on returning the tally of distinct values

**Approach 1.**

-Use sets.

-The most straightforward method

    function solution (A) {
        const uniqueValues = new Set(A);
        return uniqueValues.size;
    }

-The .size method is used to return the length of the Set.

-This method is like .length but for Sets and Maps.


**Approach 2.**

-Use of maps.

-Ensure our guard checks are there.

-Initialize our frequencyMap that will handle the tally.

-The reduce method collapses the array into a single item, and receives 2 arguments, the callback function and the initial value.

-The initial value in this case is our empty curly braces.

-OUr callback function receives 2 parameters, countMap and item.

-Item is our current value and countMap our accumulator,

-The accumulator acts as the loop's memory card.

-WHat happens is that our countMap acting as the blank piece of paper, goes through each item of the array noting down the frequency.

-If it is a number not seen before, the 1 is attached to it, and if it is encountered again, the 1 adds to the tally and so on till we have the total frequency of all the items.

-Convert our object to an array to return the length.


## Permcheck - Lesson 4.

`