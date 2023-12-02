import { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { api } from '../../../services/api'

import Toast from 'react-native-toast-message'

import { AppError } from '../../../utils/AppError'

import { HeaderHome } from './components/HeaderHome'
import { CardProduct } from './components/CardProduct'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../routes/app-routes'
import { ProductDto } from '../../../dtos/ProductDto'

import { styled } from 'nativewind'
import { ChatCircleText, ChatsCircle } from 'phosphor-react-native'

const StyledView = styled(View)
const StyledPressable = styled(Pressable)
const StyledChatCircleText = styled(ChatCircleText)
const StyledFlatList = styled(FlatList<ProductDto>)

export function Home() {
  const [products, setProducts] = useState<ProductDto[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProp>()

  async function fetchProducts() {
    try {
      const response = await api.get<ProductDto[]>('/products')
      setProducts(response.data)
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

  useEffect(() => {
    fetchProducts()
  }, [products])

  function handleOpenProduct(productId: string) {
    navigation.navigate('product', {
      productId,
    })
  }

  return (
    <StyledView className="flex-1 bg-gray-100">
      <HeaderHome />

      <StyledFlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <CardProduct data={item} handleDetailsPage={handleOpenProduct} />
          )
        }}
        className="my-2 mx-2"
        showsVerticalScrollIndicator={false}
      />

      <StyledPressable
        onPress={() => {
          navigation.navigate('chat')
        }}
        className="absolute bottom-0 right-0 mb-2 mr-2 bg-red-600 p-4 rounded-full"
      >
        <StyledChatCircleText size={30} />
      </StyledPressable>
    </StyledView>
  )
}
