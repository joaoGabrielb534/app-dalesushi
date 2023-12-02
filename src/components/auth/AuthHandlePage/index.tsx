import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import Animated, { Easing, FadeInDown } from 'react-native-reanimated'

import { ButtonUI } from '../../ui/ButtonUI'
import { AuthNavigatorRoutesProps } from '../../../routes/auth-routes'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledAnimatedView = styled(Animated.View)

interface Props {
  page: 'signIn' | 'signUp'
  titleButton: string
}

export function AuthHandlePage({ page, titleButton }: Props) {
  const router = useNavigation<AuthNavigatorRoutesProps>()

  const handlePage = () => {
    router.replace(page)
  }

  return (
    <StyledAnimatedView
      className="items-center"
      entering={FadeInDown.duration(1000).easing(Easing.ease)}
    >
      <StyledTouchableOpacity onPress={handlePage} className="w-[90%]">
        <StyledText className="text-center text-base">{titleButton}</StyledText>
      </StyledTouchableOpacity>
    </StyledAnimatedView>
  )
}
