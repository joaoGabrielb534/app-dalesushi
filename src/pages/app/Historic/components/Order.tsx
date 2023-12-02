import { Pressable, PressableProps, Text, View } from 'react-native'
import moment from 'moment'
import { styled } from 'nativewind'
import { OrderDto } from '../../../../dtos/OrderDto'

const StyledView = styled(View)
const StyledPressable = styled(Pressable)
const StyledText = styled(Text)

type Props = PressableProps & {
  index: number
  item: OrderDto
}

export function Order({ index, item, ...props }: Props) {
  return (
    <StyledPressable
      {...props}
      className="border border-gray-500 rounded-md p-3 mb-2"
    >
      <StyledView className="flex-row justify-between">
        <StyledText className="font-semibold text-xl text-gray-900">
          Order {index + 1}
        </StyledText>

        <StyledText className="font-bold text-lg">
          R$ {item.valueTotal.toFixed(2)}
        </StyledText>
      </StyledView>

      <StyledView className="flex-row justify-between mt-1">
        <StyledView className="flex-row">
          <StyledText className="font-semibold text-base text-gray-900 mr-1">
            Finished in:
          </StyledText>
          <StyledText className="font-semibold text-base text-gray-600">
            {moment(item.updatedAt).format('DD/MM/YYYY')}
          </StyledText>
        </StyledView>

        <StyledText className="text-green-500 text-base font-semibold">
          {item.finalized && 'Finished'}
        </StyledText>
      </StyledView>
    </StyledPressable>
  )
}
