// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    uint public count;

    function increment() public {
        count++;
    }

    function decrement() public {
        count--;
    }
}
