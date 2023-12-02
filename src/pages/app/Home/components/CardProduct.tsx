import { api } from '../../../../services/api'

import { View, Text, Pressable, Image, PressableProps } from 'react-native'
import { ProductDto } from '../../../../dtos/ProductDto'

import { styled } from 'nativewind'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledPressable = styled(Pressable)

type Props = PressableProps & {
  data: ProductDto
  handleDetailsPage: (productId: string) => void
}
export function CardProduct({ data, handleDetailsPage, ...props }: Props) {
  return (
    <StyledPressable
      onPress={() => handleDetailsPage(data.id)}
      key={data.id}
      {...props}
      className="flex-row py-3 px-3 border border-gray-500 rounded-md mb-2 items-center"
    >
      <StyledImage
        source={{
          uri: `https://teste-132.s3.amazonaws.com/${data.imageUrl}`,
        }}
        className="mr-4 h-20 w-20"
        resizeMode="center"
      />

      <StyledView className="flex-1 justify-between">
        <StyledText
          className="font-bold text-lg text-gray-800"
          numberOfLines={1}
        >
          {data.name}
        </StyledText>
        <StyledView>
          <StyledText className="text-base line-through text-gray-800/50">
            R$ {(data.price + 50).toFixed(2)}
          </StyledText>
          <StyledText className="text-2xl font-bold shadow text-gray-900">
            R$ {data.price.toFixed(2)}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledPressable>
  )
}
