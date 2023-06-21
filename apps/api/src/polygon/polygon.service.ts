import { Injectable } from '@nestjs/common'
import Web3 from 'web3'
import * as dotenv from 'dotenv'
import { AbiItem } from 'web3-utils'

import { PrismaService } from 'src/common/prisma/prisma.service'

import { abi, contractAddress } from '../utils/contractInfo.json'
import { Status } from '@prisma/client'
dotenv.config()

@Injectable()
export class PolygonService {
  private readonly web3: Web3
  private readonly contract: any

  constructor(private readonly prisma: PrismaService) {
    this.web3 = new Web3(process.env.WSS_URL)

    this.contract = new this.web3.eth.Contract(
      abi as AbiItem[],
      contractAddress,
    )

    this.testConnection()
    this.initializeListeners()
  }

  async isOwner(address: string): Promise<boolean> {
    const contractOwner = await this.contract?.methods.owner().call()
    return address === contractOwner
  }

  private async testConnection() {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber()
      console.log('blockNumber ', blockNumber)
      console.log('Connected to blockchain, latest block number:', blockNumber)
    } catch (err) {
      console.log('failed?')
      console.error('Failed to connect to blockchain:', err)
    }
  }

  private initializeListeners() {
    /*
     * Event: ProductCreated
     */
    this.contract.events
      .ProductCreated(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          console.log('ProductCreated ', event.returnValues)
          const { productId, name, plasticWeight, manufacturer } =
            event.returnValues

          await this.prisma.product.create({
            data: {
              id: productId,
              plasticWeight: +plasticWeight,
              quantity: 0,
              name,
              manufacturer: {
                connectOrCreate: {
                  create: { id: manufacturer },
                  where: { id: manufacturer },
                },
              },
            },
          })
        },
      )
      .on('connected', (str) =>
        console.log('📒 Event:ProductCreated listening...', str),
      )
      .on('error', console.error)

    /*
     * Event: ProductItemAdded
     */
    this.contract.events
      .ProductItemAdded(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { itemId, productId } = event.returnValues
          console.log('ProductItemAdded ', event.returnValues)

          await this.prisma.productItem.create({
            data: { id: itemId, status: Status.MANUFACTURED, productId },
          })
        },
      )
      .on('connected', (str) =>
        console.log('💁‍♂️ Event:ProductItemAdded listening...', str),
      )
      .on('error', console.error)

    /*
     * Event: ProductItemSold
     */
    this.contract.events
      .ProductItemSold(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { itemId } = event.returnValues

          await this.prisma.productItem.update({
            data: { status: Status.SOLD },
            where: { id: itemId },
          })

          console.log('ProductItemSold ', event.returnValues)
        },
      )
      .on('connected', (str) =>
        console.log('💁‍♂️ Event:ProductItemSold listening...', str),
      )
      .on('error', console.error)

    /*
     * Event: ProductItemReturned
     */
    this.contract.events
      .ProductItemReturned(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          const { itemId } = event.returnValues

          await this.prisma.productItem.update({
            data: { status: Status.RETURNED },
            where: { id: itemId },
          })
          console.log('ProductItemReturned ', event.returnValues)
        },
      )
      .on('connected', (str) =>
        console.log('💁‍♂️ Event:ProductItemReturned listening...', str),
      )
      .on('error', console.error)

    /*
     * Event: ProductQuantityUpdated
     */
    this.contract.events
      .ProductQuantityUpdated(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          console.log('ProductQuantityUpdated ', event.returnValues)
          const { productId, quantity } = event.returnValues

          await this.prisma.product.update({
            data: { quantity: +quantity },
            where: { id: productId },
          })
        },
      )
      .on('connected', (str) =>
        console.log('💁‍♂️ Event:ProductQuantityUpdated listening...', str),
      )
      .on('error', console.error)
  }
}
