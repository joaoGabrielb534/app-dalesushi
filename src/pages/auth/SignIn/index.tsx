import { View } from 'react-native'

import { styled } from 'nativewind'

import { FormSignIn } from './components/FormSignIn'
import { AuthHeader } from '../../../components/auth/AuthHeader'
import { AuthHandlePage } from '../../../components/auth/AuthHandlePage'

const StyledView = styled(View)

export function SignIn() {
  return (
    <StyledView className="py-12 flex-1 justify-between bg-gray-100">
      <AuthHeader />

      <FormSignIn />

      <AuthHandlePage
        page="signUp"
        titleButton=" Don't have an account? Register"
      />
    </StyledView>
  )
}
