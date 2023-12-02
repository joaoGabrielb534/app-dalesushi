import { Text, TouchableOpacity, View } from 'react-native'

import { styled } from 'nativewind'
import { ArrowLeft, SignOut } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../../routes/app-routes'
import { useAuth } from '../../../../hooks/useAuth'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledArrowLeft = styled(ArrowLeft)
const StyledSignOut = styled(SignOut)

export function HeaderProfile() {
  const router = useNavigation<AppNavigatorRoutesProp>()

  const { signOut } = useAuth()

  function handleGoBack() {
    return router.navigate('home')
  }

  return (
    <StyledView className="flex-row justify-between pt-14 pb-4 px-4 bg-red-600">
      <TouchableOpacity onPress={handleGoBack}>
        <StyledArrowLeft size={25} weight="bold" className="text-gray-900" />
      </TouchableOpacity>
      <StyledText className="text-center font-bold text-xl uppercase text-gray-900">
        Profile
      </StyledText>
      <TouchableOpacity onPress={signOut}>
        <StyledSignOut size={25} weight="bold" className="text-gray-900" />
      </TouchableOpacity>
    </StyledView>
  )
}
