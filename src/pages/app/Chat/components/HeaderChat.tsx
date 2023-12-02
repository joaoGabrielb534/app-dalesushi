import { Text, TouchableOpacity, View } from 'react-native'

import { styled } from 'nativewind'
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../../routes/app-routes'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledArrowLeft = styled(ArrowLeft)

export function HeaderChat() {
  const router = useNavigation<AppNavigatorRoutesProp>()

  function handleGoBack() {
    return router.navigate('home')
  }

  return (
    <StyledView className="flex-row pt-14 pb-4 px-4 bg-red-600 justify-between">
      <TouchableOpacity onPress={handleGoBack}>
        <StyledArrowLeft size={25} weight="bold" className="text-white" />
      </TouchableOpacity>
      <StyledText className="text-center font-bold text-xl uppercase text-white">
        Chat
      </StyledText>
      <TouchableOpacity disabled>
        <StyledArrowLeft size={25} weight="bold" className="text-red-600" />
      </TouchableOpacity>
    </StyledView>
  )
}
