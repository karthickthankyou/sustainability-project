import { Contract } from 'web3-eth-contract'

export type ActionType<T = string> = {
  contract: Contract
  account: string
  payload: T
}

export async function createProduct({
  contract,
  account,
  payload: { name, plasticWeight },
}: ActionType<{
  name: string
  plasticWeight: number
}>): Promise<boolean> {
  try {
    const result = await contract.methods
      .addProduct(name, plasticWeight)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createProductItems({
  contract,
  account,
  payload: { productId, quantity },
}: ActionType<{
  productId: string
  quantity: number
}>): Promise<boolean> {
  try {
    const result = await contract.methods
      .addProductItems(productId, quantity)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function sellProductItem({
  contract,
  account,
  payload: { productItemId },
}: ActionType<{
  productItemId: string
}>): Promise<boolean> {
  try {
    const result = await contract.methods
      .sellProductItem(productItemId)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function returnProductItem({
  contract,
  account,
  payload: { productItemId },
}: ActionType<{
  productItemId: string
}>): Promise<boolean> {
  try {
    const result = await contract.methods
      .returnProductItem(productItemId)
      .send({ from: account })
    if (result.status) {
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}
