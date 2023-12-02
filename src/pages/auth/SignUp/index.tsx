import { View } from 'react-native'

import { FormSignUp } from './components/FormSignUp'
import { AuthHeader } from '../../../components/auth/AuthHeader'
import { AuthHandlePage } from '../../../components/auth/AuthHandlePage'

import { styled } from 'nativewind'

const StyledView = styled(View)

export function SignUp() {
  return (
    <StyledView className="py-12 flex-1 justify-between bg-gray-100">
      <StyledView className="flex-1 justify-between">
        <AuthHeader />

        <FormSignUp />

        <AuthHandlePage
          page={'signIn'}
          titleButton="Already have an account? Access"
        />
      </StyledView>
    </StyledView>
  )
}
