// 1. Declare global variable to store the web3 instance
//import { create } from '/../node_modules/ipfs-http-client';
let EventContract;
//const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
 //     authorization: auth,},})

// 2. Set contract address and ABI
const Event_Contract_Address = "0x9Ec80457DdCa5c71AB42e0def68F6f36e99F6D7F";
const Event_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "eventname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "venue",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "startdate",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "enddate",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "price",
				"type": "uint64"
			},
			{
				"internalType": "uint32",
				"name": "duration",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "capacity",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "imgHash",
				"type": "string"
			}
		],
		"name": "createEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "eventname",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "venue",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startdate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "enddate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "capacity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "imgHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "contract Events",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "eventiscreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "haltingevent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "createdevents",
		"outputs": [
			{
				"internalType": "contract Events",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getallevents",
		"outputs": [
			{
				"internalType": "contract Events[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/* 3. Prompt user to sign in to MetaMask */
const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of pet smart contract */
    EventContract = new ethers.Contract(
      Event_Contract_Address,
      Event_Contract_ABI,
      signer
    );
  });
});


// 4. Creating variables for reusable dom elements
const eventFormSection = document.querySelector(".event-form-section");
const showeventFormBtn = document.querySelector(".show-event-form-btn");
const eventSection = document.querySelector(".event-detail-section");
const seteventButton = document.querySelector("#set-new-event");
const refreshBtn = document.querySelector(".refresh-event-details-btn");

document.getElementById('getdetail').style.display = 'none';

const eventNameInput = document.querySelector("#event-name");
const eventVenueInput = document.querySelector("#event-venue");
const DescriptionInput = document.querySelector("#description");
const StartDateInput = document.querySelector("#start-date");
const EndDateInput = document.querySelector("#end-date");
const DurationInput = document.querySelector("#duration");
const PriceInput = document.querySelector("#price");
const CapacityInput = document.querySelector("#capacity");

const geteventName = eventNameInput.value;
const geteventVenue = eventVenueInput.value;
const getDescription = DescriptionInput.value;
const getStartDate = StartDateInput.value;
const getEndDate = EndDateInput.value;
const getDuration = DurationInput.value; 
const getPrice = PriceInput.value;
const getCapacity = CapacityInput.value;
const getimgHasha = "";

/* 5. Function to set pet details */
const setNewevent = () => {
  // update button value
  seteventButton.value = "Setting Event...";
  document.getElementById('eventform').style.display = "";
  /* 5.1 Get inputs from pet form */
  

  // 5.2 Getting values from the inputs
  const eventName = eventNameInput.value;
  const eventVenue = eventVenueInput.value;
  const Description = DescriptionInput.value;
  const StartDate = "12";
  const EndDate = "13";
  const Duration = DurationInput.value.toString(); 
  const Price = PriceInput.value.toString();
  const Capacity = CapacityInput.value.toString();
  const imgHasha = "hi";

  /* 5.3 Set pet details in smart contract */
  EventContract.createEvent(eventName, eventVenue, Description, StartDate, EndDate, Price, Duration, Capacity, imgHasha)
    .then(() => {
      // update button value
      seteventButton.value = "Event Set...";

      /* 5.4 Reset form */
      eventNameInput.value = "";
      eventVenueInput.value = "";
      DescriptionInput.value = "";
	  StartDateInput.value = "";
	  EndDateInput.value = "";
	  DurationInput.value = "";
	  PriceInput.value = "";
	  CapacityInput.value = "";

      // update button value
      seteventButton.value = "Set Event";

      /* 5.5 Get pet details from smart contract */
      getCurrentEvent();
	  document.getElementById('eventform').style.display = "none";
	  document.getElementById('getdetail').style.display = '';
    })
    .catch((err) => {
      // If error occurs, display error message
      seteventButton.value = "Set Event";
      alert("Error setting event details" + err.message);
    });
};


/* Function to set pet details on click of button */
seteventButton.addEventListener("click", setNewevent);

const getCurrentEvent = async () => {
  seteventButton.value = "Getting Event...";

  /*EventContract.on('eventiscreated', function(eventname, venue, description, startdate, enddate, 
   price, duration, capacity, imgHash, _address) {
    console.log(eventname, venue, description, startdate, enddate, 
   price, duration, capacity, imgHash, _address);
	eventName = eventname;
	eventVenue = venue;
	Description = description;
	StartDate = startdate.toString(); 
	EndDate = enddate.toString();
	Duration = duration.toString();  
	Price = price.toString(); 
	Capacity = capacity.toString();
	imgHasha = imgHash;
  });*/

  /* 6.4 Display pet details in DOM */
  document.querySelector(".event-detail-name").innerText = geteventName;
  document.querySelector(".event-detail-venue").innerText = geteventVenue;
  document.querySelector(".event-detail-description").innerText = getDescription;
  document.querySelector(".event-detail-start-date").innerText = getStartDate;
  document.querySelector(".event-detail-end-date").innerText = getEndDate;
  document.querySelector(".event-detail-duration").innerText = getDuration;
  document.querySelector(".event-detail-price").innerText = getPrice;
  document.querySelector(".event-detail-capacity").innerText = getCapacity;
};

/* 7. Function to show the pet form on click of button */
showeventFormBtn.addEventListener("click", () => {
  eventSection.style.display = "none";
  eventFormSection.style.display = "block";
  seteventButton.value = "Submit";
});

/* 8. Function to refresh pet details */
refreshBtn.addEventListener("click", (e) => {
  e.target.innerText = "Refreshing...";
  getCurrentEvent().then(() => {
    e.target.innerText = "Refreshed";
    setTimeout(() => {
      e.target.innerText = "Refresh";
    }, 2000);
  });
});
