This smart contract is a voting system, where users can create new votes, cast votes for a given option, close a vote, and retrieve the information for a vote.

The smart contract has a struct called "Vote" that stores the information for each vote, including the question, options, closed status, and number of votes for each option. This information is stored in a mapping called "votes", which uses the vote id as the key.


<br> The smart contract has several functions to manage the voting process:

*createVote allows users to create a new vote by providing a question and options. The new vote's information is stored in the "votes" mapping, and a "VoteCreated" event is emitted with the vote id.

*castVote allows users to cast a vote for a given option. Before casting the vote, the smart contract checks if the vote is closed and if the option being voted for exists. If these conditions are met, the number of votes for the selected option is incremented, and a "VoteCast" event is emitted with the vote id and the option.

*closeVote allows users to close a vote. Before closing the vote, the smart contract checks if the vote is already closed. If not, the closed status of the vote is set to true, and a "VoteClosed" event is emitted with the vote id.

*getVote allows users to retrieve the information for a vote, including the question, options, and closed status. The information is returned as function outputs.


The smart contract has three events to provide transparency and allow for external systems to react to changes in the voting system:

"VoteCreated" is emitted when a new vote is created.

"VoteCast" is emitted when a vote is cast.

"VoteClosed" is emitted when a vote is closed.

<br>
Also I make a script to test this smart contract. The script uses Chai, Hardhat, and Node.js assert library to test different functions of the contract. The contract is tested using Mocha framework and its different test cases are grouped under different describe blocks. The contract is deployed before each test case and an instance is stored in the variable "votingSystem".

The test cases include:

"createVote" which tests the ability of the contract to create a new vote with a question and options.
"castVote" which tests the ability of the contract to cast a vote for a selected option and also throws an error when trying to cast a vote on a closed vote.
"closeVote" which tests the ability of the contract to close a vote and also throws an error when trying to close a vote that is already closed.
"getVote" which tests the ability of the contract to retrieve the information for a vote.
All test cases use the Chai expect library to assert that the expected values match the actual values returned from the contract.
