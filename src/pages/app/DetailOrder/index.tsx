import { useRoute } from '@react-navigation/native'
import { styled } from 'nativewind'
import { CircleNotch } from 'phosphor-react-native'
import { View, FlatList } from 'react-native'
import { api } from '../../../services/api'
import { useEffect, useState } from 'react'
import { ProductsCartDto } from '../../../dtos/ProductsCartDto'
import { ProductCard } from './components/ProductCard'
import { Header } from './components/Header'

type RouterParams = {
  orderId: string
  index: number
}

const StyledView = styled(View)
const StyledFlatList = styled(FlatList<ProductsCartDto>)

export function DetailsOrder() {
  const router = useRoute()

  const [order, setOrder] = useState<ProductsCartDto[]>([])
  const [newOrderId, setNewOrderId] = useState<string>('')

  const { orderId, index } = router.params as RouterParams

  async function handleFetchData() {
    const response = await api.get(`/orders/${orderId}/details`)
    setNewOrderId(response.data.orderId)
    setOrder(response.data.products)
  }

  useEffect(() => {
    handleFetchData()
  }, [orderId])

  if (newOrderId !== orderId) {
    return (
      <StyledView className="flex-1">
        <Header index={index} />

        <StyledView className="items-center justify-center flex-1">
          <StyledView>
            <CircleNotch />
          </StyledView>
        </StyledView>
      </StyledView>
    )
  }

  return (
    <StyledView>
      <Header index={index} />

      <StyledFlatList
        data={order}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        className="px-4 my-2"
        showsVerticalScrollIndicator={false}
      />
    </StyledView>
  )
}
