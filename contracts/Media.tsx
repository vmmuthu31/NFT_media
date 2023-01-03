export const MediaAddress: string =
  "0xd9145CCE52D386f254917e481eB44e9943F39138"
export const MediaABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"name": "ImageCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentTip",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalTipped",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"name": "ImageTipped",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "imageCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
		"name": "images",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalTipped",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "tipImageOwner",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imgUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_caption",
				"type": "string"
			}
		],
		"name": "uploadImage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]