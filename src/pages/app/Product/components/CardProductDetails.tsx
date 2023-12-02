import { View, Image, Text, TouchableOpacity } from 'react-native'

import { styled } from 'nativewind'
import { ButtonUI } from '../../../../components/ui/ButtonUI'
import { api } from '../../../../services/api'
import { ProductDetailsDto } from '../../../../dtos/ProductDetails'
import { useAuth } from '../../../../hooks/useAuth'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { AppError } from '../../../../utils/AppError'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)

type Props = {
  data: ProductDetailsDto
}

export function CardProductDetails({ data }: Props) {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingFavorite, setLoadingAFavorite] = useState<boolean>(false)

  async function handleAddFavorite() {
    try {
      setLoadingAFavorite(true)
      await api.post('/favorite/register', {
        productId: data.id,
        clientId: user.id,
      })
      setLoadingAFavorite(false)
    } catch (error) {
      setLoadingAFavorite(false)
      const isAppError = error instanceof AppError

      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        type: 'error',
        text1: message,
        topOffset: 60,
        position: 'top',
      })
    }
  }
  async function handleAddCart() {
    try {
      setLoading(true)
      await api.post('/ordersProducts/register', {
        productId: data.id,
        orderId: user.orderId,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const isAppError = error instanceof AppError

      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        type: 'error',
        text1: message,
        topOffset: 60,
        position: 'top',
      })
    }
  }

  return (
    <StyledView className="px-4 py-4">
      <StyledView className="items-center">
        <StyledImage
          source={{
            uri: `https://teste-132.s3.amazonaws.com/${data.imageUrl}`,
          }}
          className="h-64 w-64"
          resizeMode="center"
        />
      </StyledView>

      <StyledView className="mt-3">
        <StyledText className="text-xl font-bold">{data?.name}</StyledText>

        <StyledView className="mt-3">
          <StyledText className="text-lg font-bold line-through text-gray-800/50">
            R$ {(data.price + 50).toFixed(2)}
          </StyledText>

          <StyledView className="flex-row justify-between items-end">
            <StyledText className="text-2xl font-bold text-gray-800">
              R$ {data.price && data.price.toFixed(2)}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledView className="w-full my-3">
        <ButtonUI
          title="Add cart"
          loading={loading}
          disabled={loading}
          onPress={handleAddCart}
        />
        <StyledView className="mt-2">
          <ButtonUI
            title="Add favorite"
            loading={loadingFavorite}
            disabled={loadingFavorite}
            onPress={handleAddFavorite}
          />
        </StyledView>
      </StyledView>

      <StyledView>
        <StyledText className="text-lg font-semibold text-gray-800 mb-1">
          Description:
        </StyledText>

        <StyledText className="text-base text-gray-600 text-justify">
          {data.description}
        </StyledText>
      </StyledView>
    </StyledView>
  )
}
