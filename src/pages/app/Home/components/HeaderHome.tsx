import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'

import { styled } from 'nativewind'
import { UserCircle } from 'phosphor-react-native'
import { useAuth } from '../../../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../../routes/app-routes'

const StyledText = styled(Text)
const StyledView = styled(View)
const StyleImage = styled(Image)
const StyledTouchableOpacity = styled(TouchableOpacity)

export function HeaderHome() {
  const { user } = useAuth()
  const navigation = useNavigation<AppNavigatorRoutesProp>()
  return (
    <StyledView className="bg-red-600 pt-12 pb-4 px-4 flex-row items-center justify-between">
      <StyledView className="w-8 h-8" />
      <StyledText className="text-xl uppercase font-bold">HOME</StyledText>

      <Pressable onPress={() => navigation.navigate('profile')}>
        <StyleImage
          source={{ uri: user.avatar }}
          alt="user"
          className="w-8 h-8 bg-gray-500 rounded-full"
        />
      </Pressable>
    </StyledView>
  )
}
