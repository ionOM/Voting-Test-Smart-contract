const { expect } = require("chai");
const { ethers } = require("hardhat");
const assert = require("assert");

describe("VotingSystem", () => {
  let votingSystem;

  beforeEach(async () => {
    // Deploy an instance of the VotingSystem contract
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy();
  });

  describe("createVote", () => {
    it("creates a new vote", async () => {
      // Call the createVote function with a question and options
      await votingSystem.createVote("What is your favorite color?", [0, 1, 2]);
      // Get the number of votes that have been created
      let voteCounter = await votingSystem.voteCounter();
      // Assert that the voteCounter is equal to 1
      expect(voteCounter.toNumber()).to.equal(1);
    });
  });

  describe("castVote", () => {
    beforeEach(async () => {
      // Create a new vote to cast a vote on
      await votingSystem.createVote("What is your favorite color?", [0, 1, 2]);
    });

    it("casts a vote for an option", async () => {
      // Call the castVote function with the vote id and an option
      await votingSystem.castVote(0, 1);
      // Get the number of votes for the selected option
      let votes = (await votingSystem.votes(0))[1];
    });

    it("throws an error when trying to cast a vote on a closed vote", async () => {
      // Close the vote
      await votingSystem.closeVote(0);
      // Try to cast a vote
      await expect(votingSystem.castVote(0, 1)).to.be.revertedWith(
        "Vote is closed"
      );
    });
  });

  describe("closeVote", () => {
    beforeEach(async () => {
      // Create a new vote to close
      await votingSystem.createVote("What is your favorite color?", [0, 1, 2]);
    });

    it("closes a vote", async () => {
      // Call the closeVote function with the vote id
      await votingSystem.closeVote(0);
      // Get the closed status of the vote
      let vote = await votingSystem.votes(0);
      // Assert that the closed status of the vote is true
      expect(vote.closed).to.be.true;
    });

    it("throws an error when trying to close a vote that is already closed", async () => {
      // Close the vote
      await votingSystem.closeVote(0);
      // Try to close the vote again
      await expect(votingSystem.closeVote(0)).to.be.revertedWith(
        "Vote is already closed"
      );
    });
  });

  describe("getVote", () => {
    it("should retrieve the information for a vote", async () => {
      const question = "What is your favorite color?";
      const options = [0, 1, 2];

      // Create a new vote
      await votingSystem.createVote(question, options);

      // Retrieve the vote information
      const [retrievedQuestion, retrievedOptionsBNs, isClosed] =
        await votingSystem.getVote(0);
      const retrievedOptions = retrievedOptionsBNs.map((bn) => bn.toNumber());

      // Assert the expected results
      expect(retrievedQuestion).to.equal(question);
      expect(retrievedOptions).to.deep.equal(options);
      expect(isClosed).to.equal(false);
    });
  });
});
