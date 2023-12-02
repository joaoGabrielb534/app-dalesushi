import AsyncStorage from '@react-native-async-storage/async-storage'
import { SECRET_TOKEN_JWT } from './storageConfig'

export async function saveTokenInStorage(token: string) {
  await AsyncStorage.setItem(SECRET_TOKEN_JWT, token)
}

export async function getTokenInStorage() {
  return await AsyncStorage.getItem(SECRET_TOKEN_JWT)
}

export async function removeTokenInStorage() {
  await AsyncStorage.removeItem(SECRET_TOKEN_JWT)
}
