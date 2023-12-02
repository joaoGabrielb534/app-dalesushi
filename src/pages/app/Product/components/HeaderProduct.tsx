import { Pressable, PressableProps } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'

import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'

const StyledPressable = styled(Pressable)
const StyledArrowArcLeft = styled(ArrowLeft)

type Props = PressableProps

export function HeaderProduct({ ...props }: Props) {
  const navigation = useNavigation()

  function handleGoBackHome() {
    navigation.goBack()
  }
  return (
    <StyledPressable
      onPress={handleGoBackHome}
      {...props}
      className="bg-red-600 pt-12 pb-4 px-4"
    >
      <StyledArrowArcLeft size={25} weight="bold" />
    </StyledPressable>
  )
}
