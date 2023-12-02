import { styled } from 'nativewind'
import { FlatList, Text, View } from 'react-native'
import { HeaderFavorite } from './compenents/HeaderFavorite'
import { AppError } from '../../../utils/AppError'
import { api } from '../../../services/api'
import Toast from 'react-native-toast-message'
import { useEffect, useState } from 'react'
import { Heart } from 'phosphor-react-native'
import { CardFavorite } from './compenents/CardFavorite'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../routes/app-routes'

type Favorite = {
  id: string
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
  }
}

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledHeart = styled(Heart)
const StyledFlatList = styled(FlatList<Favorite>)

export function Favorite() {
  const [favorites, setFavorites] = useState<Favorite[]>([] as Favorite[])

  const navigation = useNavigation<AppNavigatorRoutesProp>()

  useEffect(() => {
    handleGetData()
  }, [favorites])

  async function handleGetData() {
    const response = await api.get('/favorites')
    setFavorites(response.data)
  }

  async function handleRemoveFavorite(id: string) {
    try {
      await api.delete(`/favorite/${id}`)
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

  function handleOpenProduct(productId: string) {
    navigation.navigate('product', {
      productId,
    })
  }

  return (
    <StyledView className="flex-1 bg-gray-100">
      <HeaderFavorite />

      <StyledView className="px-2 py-2 flex-1">
        {favorites.length === 0 ? (
          <StyledView className="items-center justify-center flex-1">
            <StyledView className="items-center">
              <Heart size={100} weight="fill" color="gray" />
              <StyledText className="text-lg text-gray-500">
                Yous favorites is empty
              </StyledText>
            </StyledView>
          </StyledView>
        ) : (
          <StyledView>
            <StyledFlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardFavorite
                  data={item}
                  handleRemoveFavorite={handleRemoveFavorite}
                  handleDetailsPage={handleOpenProduct}
                />
              )}
              showsHorizontalScrollIndicator={false}
              className="mb-24"
            />
          </StyledView>
        )}
      </StyledView>
    </StyledView>
  )
}
