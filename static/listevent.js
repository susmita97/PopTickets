let EventContract;

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
