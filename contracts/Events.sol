// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

// Everything related to Event Creation
contract Events is ERC721 {

    // Form Details

    struct FormDetails {
        string eventname;
        string venue;
        string description;
        uint64 startdate;
        uint64 enddate;
        uint64 price;
        uint32 duration;
        uint32 capacity;    
    }

    FormDetails public form;
    uint64 private ticketID;
    uint32 public constant maxtix = 3;
    string public imgHash;
    bool private cancelled = false;
    address payable public OwnerofEvent;
    

    event ticketbuy(address buyer, uint quantity, uint date, address indexed indexedPurchased );
    event tixtransfer(address _from, address _to, uint tknID);
    event getfunds(address eventadd, address eorganizer, uint scbalance );
    event tixrefund(address eventadd, address requestedBy, uint64 ticketID, uint64 price);

    constructor(string memory neweventname, 
       string memory newvenue, 
       string memory newdescription,
       uint64 newstartdate,
       uint64 newenddate,
       uint64 newprice,
       uint32 newduration,
       uint32 newcapacity,
       string memory newimgHash,
       address payable newowner) ERC721("neweventname", "TKT") {

        form.eventname = neweventname;
        form.venue = newvenue;
        form.description = newdescription;
        form.startdate = newstartdate;
        form.enddate = newenddate;
        form.duration = newduration;
        form.price = newprice;
        form.capacity = newcapacity;
        imgHash = newimgHash;
        OwnerofEvent = newowner;

    }

     // Creating a set event function
    function setEvent( 
       string memory neweventname, 
       string memory newvenue, 
       string memory newdescription,
       uint64 newstartdate,
       uint64 newenddate,
       uint64 newprice,
       uint32 newduration,
       uint32 newcapacity,
       string memory newimgHash
       
    ) public {
        
        form.eventname = neweventname;
        form.venue = newvenue;
        form.description = newdescription;
        form.startdate = newstartdate;
        form.enddate = newenddate;
        form.duration = newduration;
        form.price = newprice;
        form.capacity = newcapacity;
        imgHash = newimgHash;
        

    }

        // Creating a get function
    function getEvent() public view returns (
        string memory, 
        string memory, 
        string memory,
        uint64,
        uint64,
        uint64,
        uint32,
        uint32,
        string memory
    ){
        //FormDetails storage form = form[index];
        return (form.eventname, form.venue, form.description, form.startdate, 
        form.enddate, form.price, form.duration, form.capacity, imgHash);
    }

    function purchaseTicket(uint quantity) public payable {
        require(quantity <= maxtix, "A single user cannot purchase more than 3 tickets");
        require(form.capacity  >= quantity, "Tickets Over");
        require(msg.value >= form.price*(quantity), "Need more funds in account");
        
        for(uint8 i = 0; i < quantity; i++) {
            ticketID++;
            form.capacity--;
            _mint(msg.sender,ticketID);
        }

        emit ticketbuy(msg.sender, quantity, block.timestamp, msg.sender);
    }

    function checkticket(address _owner, uint tknID) onlyOwner public returns(bool) {
        if(ownerOf(tknID) == _owner) {
            _burn(tknID);
            return true;
        }  else {
            return false;
        }
    }

    function transfertix(address _to, uint tknID) public {
        require(address(0) != _to, "Address is invalid");
        transferFrom(msg.sender, _to, tknID);
        emit tixtransfer(msg.sender, _to, tknID);
    }

    function cancelevent() onlyOwner public {
        cancelled = true;
    }

    function checkcancel() public view returns(bool) {
        return cancelled;
    }

    function getOwnersTicket(address buyer) public view returns(uint[] memory) {

        uint balance = IERC721Enumerable(address(this)).balanceOf(buyer);

        uint[] memory tokens = new uint[](balance);

        for (uint i=0; i<balance; i++) {

            tokens[i] = (IERC721Enumerable(address(this)).tokenOfOwnerByIndex(buyer, i));
        }

        return tokens;
    }

    function getrefunds(uint64  tixID) public {
        require(address(0) != msg.sender, "Invalid Address");
        require(cancelled, "You can get a refund only if event is cancelled");
            _burn(tixID);
        payable(msg.sender).transfer(form.price);
       emit tixrefund(address(this), msg.sender, tixID, form.price);
    }

    function getfundsowner() onlyOwner public {
        require(block.timestamp > form.enddate && !cancelled, "Event is not over");
        payable(msg.sender).transfer(address(this).balance);
        selfdestruct(payable(msg.sender));
       emit getfunds(address(this), msg.sender, address(this).balance );
    }

    modifier onlyOwner {
        require(msg.sender == OwnerofEvent, "Action only for Event Creator");
        _;
    }

}
