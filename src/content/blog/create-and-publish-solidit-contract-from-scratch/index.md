---
title: Creating and Publishing a Solidity Contract from Scratch
date: 2022-01-10
cover: ./solidity-logo.png
tags: [ solidity, smart contracts, ethereum, smart chain, binance, truffle, ganache ]
---

For the last year I've been really interested in Blockchain technologies and specially the creation of _Solidity Contracts_. Unfortunately most of the tutorials that you find on the Internet assume that you don't want publish contract on a blockchain, that you don't want to use a local blockchain or that you have a dev environment already in place.

So in this article I'm going to create a very simple contract assuming only that I have installed node and Visual Studio Code. No extensions and no global `npm packages` are needed to follow along.

In this article, I **will not** be explaining what Solidity and blockchain are, or what smart contracts is. Those subjects for another article... Maybe 🤷.

## Setup your editor

Before we begin, lets start by getting our editor ready for Solidity development. For [Visual Studio Code](https://code.visualstudio.com) I recommend 2 extensions:

- [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) by Juan Blanco
- [DeFi](https://marketplace.visualstudio.com/items?itemName=ericglau.defi-ls) by Eric Lau

The Solidity Visual Studio Code extension by [Juan Blanco](https://github.com/juanfranblancol) is a must since it offers:

- Syntax Highlighting
- Code completion
- Linting
- Supports Prettier reformatting
- Allows you to run Mythx for security analysis

The DeFi extension by Eric Lau is a nice addition if you are thinking or creating real life contracts that are actually going to be on a real blockchain. Some of the reasons are:

- Gives you code snippets for specific DeFi protocols
- Gives you code completion for token addresses
- Gives you real-time data when you hover over a token address

To install this extension directly from the terminal you just have to issue:

```bash
code --install-extension JuanBlanco.solidity
code --install-extension ericglau.defi-ls
```

If you are using [Vim](https://www.vim.org) or [NeoVim](https://neovim.io) then I recommend you install the [Vim Polyglot](https://github.com/sheerun/vim-polyglot) plugin so you get syntax highlight.

## Truffle Intro

You can think of _Smart Contracts_ as back end applications that need to be deployed in an Application Container or _Virtual Machine_. There are multiple virtual machines, but by far the _Ethereum Virtual Machine_ the most used one. It's so popular that is used in different networks like the [Binance Chain](https://docs.binance.org/) or the [Polygon](https://polygon.technology/get-started/) chain.

Additionally the _Ethereum Virtual Machine_ "compatible" contracts can be written in multiple programming languages, being Solidity and Vyper the most used ones. Solidity resembles C++ while Vyper resembles Python.

But before deploying a Smart Contract to a blockchain, you need to test it, migrate it and compile it. That's where a Smart Contract _Framework_ comes into play. They include all the tools to develop, compile, test, migrate and deploy Smart Contracts on a blockchain.

In the case of Ethereum Virtual Machine contracts, there are 3 very famous frameworks:

- [Truffle](https://trufflesuite.com): The standard
- [Hardhat](https://hardhat.org): The new kid on the block
- [Brownie](https://eth-brownie.readthedocs.io/): If you want to use Python instead of JavaScript

Of the 3, [Truffle](https://trufflesuite.com/) is the most popular framework for writing smart contracts in Solidity and Vyper, even though Hardhat is rising in popularity.

Some of the properties of Truffle are:

- All the tooling is in JavaScript
- Supports compilation, deployment and testing of smart contracts
- It provides a **local** blockchain called _Ganache_
- For testing it uses the [Mocha](https://mocha.org) framework
- It requires Node already installed

Even tough Truffle is an [npm pacakge](https://www.npmjs.com/package/truffle) you still write your contracts in Solidity or Vyper but the testing, configuration and deployment are done using JavaScript.

## Setup a truffle project

Most of the Truffle tutorials you can find on the net, ask you to install truffle globally with `npm -g truffle`, but I really don't like that option since difference in versions can come into play, which is not good if you are working on a team and not by yourself. So that's why I use `npx` and install it locally:

```bash
mkdir truffle-test-project
cd $_
npm init -y
npm install --save-dev truffle
npm audit fix
```

The `npm audit fix` is to remove some of the warnings but not all of them.

You can verify that all went well by executing `npx truffle version`:

```bash
$ npx truffle version

Truffle v5.4.26 (core: 5.4.26)
Solidity - 0.8.10 (solc-js)
Node v16.13.1
Web3.js v1.5.3
```

Up to this point you have a _Node Project_ in place. To actually create a smart contract project you have to issue `npx truffle init`:

```bash
npx truffle init
```

This will create the project structure and some initial files you'll need for the development of your smart contract.

The `tree` command should return something like this:

```bash
$ tree -I node_modules # To get a list of files
.
├── contracts
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
├── package-lock.json
├── package.json
├── test
└── truffle-config.js

3 directories, 5 files
```

We're done as far a setup goes. Now we have to create a test contract.

## Creating the first contract

One of the things the define Truffle is that the project structure is always the same. This means that our contracts will be stored in the `contracts/` directory and the should have the `.sol` extension.

If you go into that folder, you'll find a `Migrations.sol` contract, which helps with the migrations and is used internally by Truffle. Don't delete it, but also don't mind it either.

For our contract, we'll be creating the `contracts/SimpleStorage.sol` file with the following contents:

```solidity
// contracts/SimpleStorage.sol

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {

  uint data;

  function updateData(uint _data) external {
    data = _data;
  }

  function readData() external view returns(uint) {
    return data;
  }
}
```

This contract is very simple, it has 2 functions:

- The `updateData` function to store an integer in the blockchain
- The `readData` to retrieve this data from the blockchain

Now that we have our contract created, lets compile it.

## Compiling with truffle

Actually, compiling Solidity contracts is very easy, just issue `npx truffle compile`, but there is a caveat. By default Truffle will compile your contracts with version of your compiler `0.5.0`. So if you want to use newer features of solidity, you can change this version by editing the `truffle-config.js` file, and on the section `compilers` uncomment and change the version to something more current like `0.8.10`

```javascript {7}
modules.exports = {
  // ...

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
  // ...
}
```

Now we can do the compiling with:

```bash
npx truffle compile
```

And it will return something like:

```bash
Compiling your contracts...
___________________________
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /Users/mario/Projects/truffle-test-project/build/contracts
> Compiled successfully using:
   - solc: 0.8.10+commit.fc410830.Emscripten.clang
```

As you can see, Truffle stores the compile contracts in the `build/contracts/` folder as `.jsonc` files. And if you open them you can find the encoded bytecode that will get deployed in the blockchain.

> Note 1: _Jsonc_ files support comments

> Note 2: If you have incompatibility of Solidity versions between contracts the compiler will fail

## Testing your contract

This part is not absolutely required, but will help us understand how to interact with the contract when is already deployed.

Some things to consider about testing Solidity Smart Contracts in Truffle:

- The test are stored in the `test/` folder
- They are written in JavaScript
- They use [Mocha](https://mochajs.org) as the testing library
- Truffle provides an `artifacts.require()` function that you can use in your JavaScript testing file to import your Solidity contract as a JavaScript Object

The test we're going to create for our contract is very simple. We're going to store a number in the contract, and then we're going to retrieve it:

```javascript
// test/SimpleStorage.js

const SimpleStorage = artifacts.require("SimpleStorage.sol")

contract("SimpleStorage", function () {
  it("should return the stored data", async function () {
    const expected = 10
    const storage = await SimpleStorage.new()
    await storage.updateData(expected)
    const actual = await storage.readData()
    assert(actual.toString() === expected.toString())
  })
})
```

> Note 3: Numbers on JavaScript are floats, and they are much smaller than regular numbers on Smart Contracts. That's why on your tests the results of contracts are returned as [_BigNum_](https://github.com/indutny/bn.js/) or `bn.js` objects. So, on your tests, you have to use the `.toString()` function, and make comparisons against strings for your asserts to work.

> Note 4: Mocha recommends you use `function() {}` instead of `()=> {}` in the tests since in some _asserts_ use the `this` object, and assume it to point to the current function.

To run the test you need to execute `npx truffle test`.

And you get something like:

```bash
$ npx truffle test
Using network 'test'.


Compiling your contracts...
___________________________
> Everything is up to date, there is nothing to compile.

  Contract: SimpleStorage
    ‚úì should return the stored data (109ms)

  1 passing (125ms)
```

Now that we have our test, we can deploy our contract to a block chain. But in order to do that, we need to start up our own blockchain with Ganache.
A

## Creating contract migrations

So you can think on the blockchain as a database (this is not 100% accurate, but it helps on the learning process) where you have to migrate your contracts much like you migrate tables when you are developing in a Web framework like Laravel or Django. This means that you have to create scripts that instruct the blockchain how to deploy your newly created contracts.

With Truffle, you create your migrations the `migrations/` folder and you create them as JavaScript scripts with the convention of create them as numbered files so you migrate them in the right order.

By default Truffle gives you the `1_initial_migration.js` file, which you shouldn't delete, as a managing script for future migrations. To create the migration of our contract we would need to create the `migrations/2_simple_storage_migration.js` file and place the following code:

```javascript
// migrations/2_simple_storage.js

const SimpleStorage = artifacts.require("SimpleStorage.sol")

module.exports = (deployer) => {
  deployer.deploy(SimpleStorage)
}
```

As a side note, if the `SimpleStorage` object required arguments on the constructor, you could have added it in the _deployer_ line like:

```javascript
deployer.deploy(SimpleStorage, "fist arg", "second arg")
```

By default, migration scripts are pretty simple. That's because we're creating just one contract that does not depend on other contracts or libraries. If where where to create complex constructors for our contracts we would need to use promises and async/await to execute them.

Now lets get deploy that contract on a local blockchain, but for that lest first creates a local blockchain.

## Creating a local development blockchain with Ganache

When you install _Truffle_ you get a built in version of _Ganache_, which is a local blockchain, that is managed by Truffle. This means that in order to start it up you actually use the `truffle` command.

> Note 5: You can install Ganache by itself in case you want to use the same blockchain for multiple projects

```bash
npx truffle develop
```

This will output something like (notice the change of prompt change at the end):

```bash {32}
Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0x882cfda71609db31b3a017de9d45998f4a6c0eb1
(1) 0x27e61daa454e619330bca0b3644baaba0341746d
(2) 0x4e9867504cc391dbd8f8f65b09feddbe7badb665
(3) 0x0f0599efbdc19aa04c4cfd072e9faef4d3946ed7
(4) 0x67eae8abd1eb0a16f0c2f04f404db7704985b61d
(5) 0xa79d3ec588959781fa272cfdbbf3093371b00ce6
(6) 0x0719f251960775fcd01232426d37a203a6c10af1
(7) 0x65f1f031a79ac6620e1f638d7a89328ae164d5ee
(8) 0x98bdc323eeb8ad9d3619fe1ad69fb3fb1f07b9d2
(9) 0x6205dff8519baabcef1b7dda09d9548db0813586

Private Keys:
(0) 85a29a3cd8e26d66fb71f42255f00d30c099945eeb9f25aa34fb231d91dda358
(1) 5b180395d6cbb8cd798873efc5e10f8b1d94d8ff4e574cad4b9a45b3a4956508
(2) 3328fcf001472901ed7c7cd466774bd865635a64f6465fa9b2799864817cc849
(3) 1e8a0b686291503c90587bef9115866ec362b18b1ff27ea3b3c562fdf102e7bf
(4) 3275940f19298b9cf0181b8eb4cd78ba416ad3108b56e270076ec8e0368c9d5c
(5) 1697c05e7e17d994cceb51409d8263a96aec5679c818ff36418222a68ddd9e28
(6) cfc0fac718890928c1a5275d42072411ffde26427ca33ffc3cb0e8a3652900f6
(7) 7ad066a4c570e10625d5055dfac22c0a83d607d7f2b1e0c750b5f9ac14573e84
(8) 07f112a10055f7cad8a687c0f6ff918de2034a58461d3eb9a44b2059ae323e53
(9) ad5711bd1903266865ba4e743390465a083d53b1f5a8bb9f4ed356987bcc819d

Mnemonic: check guess glad cruise project oven digital couple truck frost estate chuckle

⚠️  Important ⚠️ : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)>
```

This means that you just started the blockchain and that is waiting for you to type _blockchain specific commands_.

There are a few things to notice when you start a Ganache blockchain:

- You get one **fake wallet** with 10 accounts
- Each **Account**, is preloaded with **100 fake** ETH.
- You also get the **Private Keys** for each of the accounts.
- You get the **Mnemonic** to recuperate your wallet, and you should **never** used it to recover a wallet for instance in Metamask or Thrust Wallet.

## Deploy the contract in the development blockchain

While **still in ganache** execute the `migrate` command:

> You can use `migrate --reset` to remove any migration you already have an start from scatch

```bash
truffle(develop)> migrate
```

And this will return the information of the deployment of both the `Migration.sol` contract as the `SimpleStorage.sol` contract.

```markdown
1_initial_migration.js

...

2_simple_storage_migration.js

---

Deploying 'SimpleStorage'

---

> transaction hash: 0xf21ffbca00dafaa46a3e2b39f7aa4e6e533676e2a38c8cc2f180216c5ec24fa4
> Blocks: 0 Seconds: 0
> contract address: 0x9f41eb766f8cDFB7c93107f0061565e838621F11
> block number: 3
> block timestamp: 1641440134
> account: 0x882cfDa71609db31B3A017DE9D45998F4A6c0eb1
> balance: 99.99916596
> gas used: 125653 (0x1ead5)
> gas price: 2 gwei
> value sent: 0 ETH
> total cost: 0.000251306 ETH

> Saving migration to chain.
> Saving artifacts

---

> Total cost: 0.000251306 ETH
```

Things to notice:

- The contracts address is `0x9f41eb766f8cDFB7c93107f0061565e838621F11`. If we had a block explorer like Ethereum and BSC has, we could review it
- The block number in which the `SimpleStorage` contract got deployed is the `3`
- Ganache selected the first account (`0x882cfDa71609db31B3A017DE9D45998F4A6c0eb1`) make the deployment
- The deployment used `125653` Gwei leaving the account with `99.99916596` ETH.

## Interacting with the contract

Unfortunately, interacting with the contract like [Remix](https://remix.ethereum.org) allows you to is not possible. You have to use commands **while still in the Ganashe console**.

The cool thing is that you can use JavaScript to do it. So creating variables with `let` or `const` is possible.

```bash
truffle(develop)> let myContract;
undefined
truffle(develop)> myContract = await SimpleStorage.deployed();
undefined
truffle(develop)> myContract.updateData(123);
{
  tx: '0xa63e9cbf3e8a23daf43043c7e3ff609a3f0210be67d387150edf9e77b3ea473c',
  receipt: {
    transactionHash: '0xa63e9cbf3e8a23daf43043c7e3ff609a3f0210be67d387150edf9e77b3ea473c',
    transactionIndex: 0,
    blockHash: '0x24468cf6edebf238c25a3c1f3d44bc41a80f914be02e96e1f298a35ffc92a10f',
    blockNumber: 5,
    from: '0x882cfda71609db31b3a017de9d45998f4a6c0eb1',
    to: '0x9f41eb766f8cdfb7c93107f0061565e838621f11',
    gasUsed: 41602,
    cumulativeGasUsed: 41602,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}
truffle(develop)>
```

And to read the newly assigned value:

```bash
truffle(develop)> myContract.readData();
BN {
  negative: 0,
  words: [ 123, <1 empty item> ],
  length: 1,
  red: null
}
```

```bash
truffle(develop)> const contractValue = await myContract.readData();
undefined
truffle(develop)> contractValue.toString();
'123'
truffle(develop)>
```

Remember, you are doing this in a local blockchain and not on an real one. That's why the commands take so little to execute and it's so "cheap" to make a transaction.

Doing this on a real blockchain can cost you a lot of money.

## Extras

There a couple of YouTube videos that show you this process:

- Truffle tutorial for beginers https://www.youtube.com/watch?v=62f757RVEvU

- An excellent playlist which is more `npm` friendly: https://www.youtube.com/playlist?list=PLw-9a9yL-pt0tD7ZBci5ybHy-T2XuHBtV
