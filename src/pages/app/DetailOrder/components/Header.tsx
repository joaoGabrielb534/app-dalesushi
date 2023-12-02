import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../../routes/app-routes'
import { ArrowLeft } from 'phosphor-react-native'
import { styled } from 'nativewind'
import { Text, View, TouchableOpacity } from 'react-native'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledArrowLeft = styled(ArrowLeft)

type Props = {
  index: number
}

export function Header({ index }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProp>()

  function handleGoBack() {
    navigation.navigate('historic')
  }

  return (
    <StyledView className="flex-row items-center justify-between pt-14 pb-4 px-4 bg-red-600">
      <TouchableOpacity onPress={handleGoBack}>
        <StyledArrowLeft className="text-white" size={25} weight="bold" />
      </TouchableOpacity>

      <StyledText className="text-center font-bold text-xl uppercase text-white">
        Order {index + 1}
      </StyledText>

      <StyledView className="h-6 w-6" />
    </StyledView>
  )
}
