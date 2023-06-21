const { ethers, upgrades, artifacts } = require('hardhat')
const { saveContractInfo } = require('../util/saveContractInfo.js')
const { contractAddress } = require('../contractAddress.json')

async function upgrade() {
  const [deployer] = await ethers.getSigners()
  console.log('Upgrading SustainabilityProject with account:', deployer.address)

  const SustainabilityProject = await ethers.getContractFactory(
    'SustainabilityProject',
  )
  const sustainabilityProject = await upgrades.upgradeProxy(
    contractAddress,
    SustainabilityProject,
  )
  console.log(
    'SustainabilityProject upgraded at:',
    sustainabilityProject.address,
  )

  const ContractArtifact = await artifacts.readArtifact('SustainabilityProject')
  saveContractInfo(sustainabilityProject.address, ContractArtifact.abi)
}

upgrade()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
