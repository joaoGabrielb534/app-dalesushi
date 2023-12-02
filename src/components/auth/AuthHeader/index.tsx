import { Text, View } from 'react-native'

import Animated, { Easing, FadeInUp } from 'react-native-reanimated'

import { BowlFood, Package } from 'phosphor-react-native'

import { styled } from 'nativewind'

const StyledBowlFood = styled(BowlFood)
const StyledView = styled(View)
const StyledText = styled(Text)

const StyledAnimatedView = styled(Animated.View)

export function AuthHeader() {
  return (
    <StyledAnimatedView
      className="items-center mt-2"
      entering={FadeInUp.duration(1000).easing(Easing.ease)}
    >
      <StyledBowlFood className="text-gray-950" size={90} />
      <StyledView className="flex-row gap-x-1">
        <StyledText className="text-5xl text-gray-950 font-bold">
          Dale
        </StyledText>
        <StyledText className="text-5xl text-red-600 font-bold">
          Sushi
        </StyledText>
      </StyledView>
    </StyledAnimatedView>
  )
}
