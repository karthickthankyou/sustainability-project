const { ethers, upgrades, artifacts } = require('hardhat')
const { saveContractInfo } = require('../util/saveContractInfo.js')

const deploy = async () => {
  const SustainabilityProject = await ethers.getContractFactory(
    'SustainabilityProject',
  )
  console.log('Deploying SustainabilityProject...')
  const sustainabilityProject = await upgrades.deployProxy(
    SustainabilityProject,
    [],
  )
  console.log(
    'SustainabilityProject deployed to:',
    sustainabilityProject.address,
  )

  const ContractArtifact = await artifacts.readArtifact('SustainabilityProject')

  saveContractInfo(sustainabilityProject.address, ContractArtifact.abi)
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
