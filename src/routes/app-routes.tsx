import { Platform } from 'react-native'

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import {
  ClockCounterClockwise,
  Heart,
  House,
  ShoppingCart,
  UserCircle,
} from 'phosphor-react-native'

import { Home } from '../pages/app/Home'
import { Cart } from '../pages/app/Cart'
import { Profile } from '../pages/app/Profile'
import { Product } from '../pages/app/Product'
import { Historic } from '../pages/app/Historic'
import { DetailsOrder } from '../pages/app/DetailOrder'
import { Favorite } from '../pages/app/Favorite'
import { Chat } from '../pages/app/Chat'

type AppRoutes = {
  home: undefined
  cart: undefined
  profile: undefined
  favorites: undefined
  historic: undefined
  chat: undefined
  detailOrder: { orderId: string; index: number }
  product: { productId: string }
}

export type AppNavigatorRoutesProp = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRouter() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'rgb(229 231 235)',
        tabBarStyle: {
          backgroundColor: 'rgb(220 38 38 )',
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: 30,
          paddingTop: 30,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <House color={color} weight="fill" size={30} />
          },
        }}
      />
      <Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => {
            return <ShoppingCart color={color} weight="fill" size={30} />
          },
        }}
      />
      <Screen
        name="favorites"
        component={Favorite}
        options={{
          tabBarIcon: ({ color }) => {
            return <Heart color={color} weight="fill" size={30} />
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="product"
        component={Product}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="historic"
        component={Historic}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <ClockCounterClockwise color={color} size={30} weight="fill" />
            )
          },
        }}
      />
      <Screen
        name="detailOrder"
        component={DetailsOrder}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="chat"
        component={Chat}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Navigator>
  )
}
