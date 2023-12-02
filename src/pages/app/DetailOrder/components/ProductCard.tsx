import { styled } from 'nativewind'
import { Image, Text, View } from 'react-native'
import { api } from '../../../../services/api'
import { ProductsCartDto } from '../../../../dtos/ProductsCartDto'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)

type Props = {
  data: ProductsCartDto
}

export function ProductCard({ data }: Props) {
  return (
    <StyledView
      key={data.id}
      className="flex-row py-3 px-3 border border-gray-500 rounded-md mb-2 items-center"
    >
      <StyledImage
        source={{
          uri: `https://teste-132.s3.amazonaws.com/${data.product.imageUrl}`,
        }}
        className="mr-4 h-14 w-14"
        resizeMode="center"
      />

      <StyledView className="flex-1">
        <StyledText
          className="font-bold text-xl text-gray-800"
          numberOfLines={1}
        >
          {data.product.name}
        </StyledText>

        <StyledView className="flex-row justify-between">
          <StyledText className="text-lg font-semibold text-gray-800">
            R$ {data.product.price.toFixed(2)}
          </StyledText>

          <StyledText className="text-base font-semibold text-gray-800">
            Amount: {data.amount}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}
