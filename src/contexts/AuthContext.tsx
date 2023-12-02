import { ReactNode, createContext, useEffect, useState } from 'react'

import {
  getTokenInStorage,
  removeTokenInStorage,
  saveTokenInStorage,
} from '../storage/storageAuthToken'

import { api } from '../services/api'

import { UserDto } from '../dtos/UserDto'
import { UserSignUpDto } from '../dtos/UserSignUpDto'

import { AppError } from '../utils/AppError'

import Toast from 'react-native-toast-message'
import { UserSignInDto } from '../dtos/UserSignInDto'

import {
  getUserInStorage,
  removeUserInStorage,
  saveUserInStorage,
} from '../storage/storageAuthUser'

export type AuthContextDataProps = {
  user: UserDto
  updateUserStorage: (userData: UserDto) => Promise<void>
  signIn: (data: UserSignInDto) => Promise<void>
  signUp: (data: UserSignUpDto) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto)

  async function loadUserData() {
    const userLogged = await getUserInStorage()
    const storageToken = await getTokenInStorage()

    if (storageToken && userLogged) {
      userAndTokenUpdate(userLogged, storageToken)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [user.avatar])

  function userAndTokenUpdate(userData: UserDto, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function userAndTokenStorageSave(data: UserDto, token: string) {
    await saveUserInStorage(data)
    await saveTokenInStorage(token)
  }

  async function updateUserStorage(userData: UserDto) {
    setUser(userData)
    await saveUserInStorage(userData)
  }

  const signIn = async (userData: UserSignInDto) => {
    try {
      const { data } = await api.post('/auth/clients', userData)

      if (data && data.token) {
        const schemaUser = {
          id: data.id,
          name: data.name,
          email: data.email,
          orderId: data.orderId,
          cartId: data.cartId,
          avatar: data.avatar,
        }

        await userAndTokenStorageSave(schemaUser, data.token)
        userAndTokenUpdate(schemaUser, data.token)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        type: 'error',
        text1: message,
        position: 'top',
        topOffset: 60,
      })
    }
  }

  const signUp = async (data: UserSignUpDto) => {
    try {
      await api.post('/clients/register', {
        name: data.name,
        birthday: data.birthday,
        cpf: data.cpf,
        email: data.email,
        password: data.password,
      })

      await signIn({ email: data.email, password: data.password })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        type: 'error',
        position: 'top',
        text1: message,
        topOffset: 60,
      })
    }
  }

  const signOut = async () => {
    try {
      setUser({} as UserDto)
      await removeUserInStorage()
      await removeTokenInStorage()
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'

      Toast.show({
        type: 'error',
        position: 'top',
        text1: message,
        topOffset: 60,
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUserStorage,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
