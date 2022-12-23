// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;
import "./Events.sol";

contract ListofEvents {

    address private owner;
    bool private haltevent = false;

    Events[] public createdevents;

    event eventiscreated(string eventname, string venue, string description, uint startdate, 
    uint enddate, uint price, uint duration, uint capacity, string imgHash, Events _address);

    function createEvent(string memory eventname, string memory venue, string memory description,
       uint64 startdate, uint64 enddate, uint64 price, uint32 duration, uint32 capacity,
       string memory imgHash) public  {

        require(!haltevent);
        address payable sender = payable(msg.sender);
        Events newEvent = new Events(eventname, venue, description, startdate, enddate, price, duration, capacity, imgHash, sender);
        createdevents.push(newEvent);
        emit eventiscreated(eventname, venue, description, startdate, enddate, price, duration, capacity, imgHash, newEvent);

    }

    function haltingevent() onlyOwner public {
        haltevent = true;
    }

   function getallevents() public view returns(Events[] memory) {
        return createdevents;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Action only for Event Creator");
        _;
    }

}