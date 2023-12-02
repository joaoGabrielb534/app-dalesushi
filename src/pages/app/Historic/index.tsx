import { styled } from 'nativewind'
import { FlatList, Text, View } from 'react-native'
import { Header } from './components/Header'
import { api } from '../../../services/api'
import { useAuth } from '../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { OrderDto } from '../../../dtos/OrderDto'
import { Order } from './components/Order'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../routes/app-routes'
import { ClockCounterClockwise } from 'phosphor-react-native'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledFlatList = styled(FlatList<OrderDto>)
const StyledClockCounterClockwise = styled(ClockCounterClockwise)

export function Historic() {
  const { user } = useAuth()

  const [orders, setOrders] = useState<OrderDto[]>([])

  const router = useNavigation<AppNavigatorRoutesProp>()

  async function fetchData() {
    const response = await api.get(`/orders/${user.cartId}`)
    setOrders(response.data)
  }

  function handleGoDetailsOrder(orderId: string, index: number) {
    return router.navigate('detailOrder', { orderId, index })
  }

  useEffect(() => {
    fetchData()
  }, [orders])

  return (
    <StyledView className="flex-1">
      <Header />

      {orders.length === 0 ? (
        <StyledView className="items-center justify-center flex-1">
          <StyledView className="items-center">
            <StyledClockCounterClockwise size={50} className="text-gray-500" />
            <StyledText className="text-lg text-gray-500">
              Yous shopping cart is empty
            </StyledText>
          </StyledView>
        </StyledView>
      ) : (
        <StyledFlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Order
              onPress={() => handleGoDetailsOrder(item.id, index)}
              index={index}
              item={item}
            />
          )}
          className="px-4 my-2"
        />
      )}
    </StyledView>
  )
}
