const { ethers } = require("hardhat");
const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Fundraiser", function () {
  async function deployFundraiser() {
    let fundraiser;
    const name = "Beneficiary Name";
    const url = "beneficiaryname.org";
    const description = "Beneficiary description";
    const [owner, beneficiary] = await ethers.getSigners();
    const FundraiserContract = await ethers.getContractFactory("Fundraiser");

    fundraiser = await FundraiserContract.deploy(
      name,
      url,
      description,
      beneficiary,
      owner
    );

    return { fundraiser, name, url, description, owner, beneficiary };
  }

  describe("initialization", async function () {
    it("gets the beneficiary name", async function () {
      const { fundraiser, name } = await loadFixture(deployFundraiser);
      const actual = await fundraiser.name();
      expect(await actual).to.equal(name, "names should match");
    });

    it("gets the beneficiary url", async () => {
      const { fundraiser, url } = await loadFixture(deployFundraiser);
      const actual = await fundraiser.url();
      expect(await actual).to.equal(url, "url should match");
    });

    it("gets the beneficiary description", async () => {
      const { fundraiser, description } = await loadFixture(deployFundraiser);
      const actual = await fundraiser.description();
      expect(await actual).to.equal(description, "description should match");
    });

    it("gets the beneficiary", async () => {
      const { fundraiser, beneficiary } = await loadFixture(deployFundraiser);
      const actual = await fundraiser.beneficiary();
      expect(await actual).to.equal(
        beneficiary,
        "beneficiary addresses should match"
      );
    });

    it("gets the owner", async () => {
      const { fundraiser, owner } = await loadFixture(deployFundraiser);
      const actual = await fundraiser.owner();
      expect(await actual).to.equal(owner, "bios shoud match");
    });
  });
});
