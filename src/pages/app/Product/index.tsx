import { useEffect, useState } from 'react'

import { useRoute } from '@react-navigation/native'

import { ScrollView, View } from 'react-native'

import { api } from '../../../services/api'

import { HeaderProduct } from './components/HeaderProduct'
import { CardProductDetails } from './components/CardProductDetails'
import { ProductDetailsDto } from '../../../dtos/ProductDetails'
import { CircleNotch } from 'phosphor-react-native'

import { styled } from 'nativewind'

const StyledView = styled(View)

type RouterParams = {
  productId: string
}

export function Product() {
  const [product, setProduct] = useState<ProductDetailsDto>(
    {} as ProductDetailsDto,
  )

  const router = useRoute()

  const { productId } = router.params as RouterParams

  async function fetchProductDetails() {
    const response = await api.get(`/products/${productId}`)

    setProduct(response.data)
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  if (product.id !== productId) {
    return (
      <StyledView className="flex-1">
        <HeaderProduct />

        <StyledView className="items-center justify-center flex-1">
          <StyledView>
            <CircleNotch />
          </StyledView>
        </StyledView>
      </StyledView>
    )
  }

  return (
    <StyledView className="flex-1">
      <HeaderProduct />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CardProductDetails data={product} />
      </ScrollView>
    </StyledView>
  )
}
