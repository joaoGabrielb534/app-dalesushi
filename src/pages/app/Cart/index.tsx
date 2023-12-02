import { FlatList, FlatListProps, Text, View } from 'react-native'

import { styled } from 'nativewind'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import { useAuth } from '../../../hooks/useAuth'
import { ProductsCartDto } from '../../../dtos/ProductsCartDto'
import { CardProductCart } from './components/CardProductCart'
import { Basket, ShoppingCart } from 'phosphor-react-native'
import { ButtonUI } from '../../../components/ui/ButtonUI'
import { AppError } from '../../../utils/AppError'
import Toast from 'react-native-toast-message'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledBasket = styled(Basket)
const StyledFlatList = styled(FlatList<ProductsCartDto>)

export function Cart() {
  const { user, updateUserStorage } = useAuth()
  const [products, setProducts] = useState<ProductsCartDto[]>([])
  const [total, setTotal] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchProducts()
    handleTotal()
  }, [products])

  function handleTotal() {
    const totalPrice = products.reduce((value, order) => {
      const valueTotal = order.product.price * order.amount
      value += valueTotal
      return value
    }, 0)

    setTotal(totalPrice.toFixed(2))
  }

  async function fetchProducts() {
    try {
      const response = await api.get(`/orders/${user.orderId}/details`)

      setProducts(response.data.products)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        text1: message,
        type: 'error',
        position: 'top',
        topOffset: 60,
      })
    }
  }

  async function handleDeleteItem(id: string) {
    try {
      await api.delete(`/ordersProducts/${id}`)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        text1: message,
        type: 'error',
        position: 'top',
        topOffset: 60,
      })
    }
  }

  async function handleAddAmount(id: string) {
    try {
      await api.put(`/ordersProducts/${id}/add`)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        text1: message,
        type: 'error',
        position: 'top',
        topOffset: 60,
      })
    }
  }

  async function handleRemoveAmount(id: string) {
    try {
      await api.put(`/ordersProducts/${id}/remove`)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        text1: message,
        type: 'error',
        position: 'top',
        topOffset: 60,
      })
    }
  }

  async function handleFinishOrder() {
    try {
      setLoading(true)
      const response = await api.put(`/orders/${user.orderId}/finish`, {
        valueTotal: total,
      })

      const updatedUser = user

      updatedUser.orderId = response.data

      await updateUserStorage(updatedUser)
      setLoading(false)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        text1: message,
        type: 'error',
        position: 'top',
        topOffset: 60,
      })
    }
  }

  return (
    <StyledView className="flex-1 bg-gray-100">
      <StyledView className="pt-14 pb-4 bg-red-600">
        <StyledText className="uppercase font-bold text-xl text-center text-gray-900">
          My Cart
        </StyledText>
      </StyledView>

      <StyledView className="flex-1 px-4 my-5">
        {products.length === 0 ? (
          <StyledView className="items-center justify-center flex-1">
            <StyledView className="items-center">
              <StyledBasket size={100} weight="fill" color="gray" />
              <StyledText className="text-lg text-gray-400">
                Yous shopping cart is empty
              </StyledText>
            </StyledView>
          </StyledView>
        ) : (
          <>
            <StyledFlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardProductCart
                  handleDeleteItem={handleDeleteItem}
                  handleAddAmount={handleAddAmount}
                  handleRemoveAmount={handleRemoveAmount}
                  data={item}
                />
              )}
              showsHorizontalScrollIndicator={false}
              className="my-5"
            />
            <ButtonUI
              loading={loading}
              title={`Finish (R$ ${total})`}
              onPress={handleFinishOrder}
            />
          </>
        )}
      </StyledView>
    </StyledView>
  )
}
