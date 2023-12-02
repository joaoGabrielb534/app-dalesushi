import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { SignIn } from '../pages/auth/SignIn'
import { SignUp } from '../pages/auth/SignUp'

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRouter() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
