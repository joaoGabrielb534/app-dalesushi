export type ProductsCartDto = {
  id: string
  amount: number
  product: {
    name: string
    imageUrl: string
    price: number
  }
}
