import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styled } from 'nativewind'
import { useAuth } from '../../../../hooks/useAuth'
import { api } from '../../../../services/api'
import { saveUserInStorage } from '../../../../storage/storageAuthUser'
import { Dispatch, SetStateAction } from 'react'
import { PencilSimple, Upload } from 'phosphor-react-native'

const StyledImage = styled(Image)
const StyledText = styled(Text)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

type Props = {
  setLoadingPage: Dispatch<SetStateAction<boolean>>
}

export function ProfileImage({ setLoadingPage }: Props) {
  const { user } = useAuth()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setLoadingPage(true)
      const photo = await FileSystem.getInfoAsync(result.assets[0].uri)
      if (photo.exists) {
        const fileExtension = result.assets[0].uri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photo.uri,
          type: `${result.assets[0].type}/${fileExtension}`,
        } as any

        const data = new FormData()

        data.append('avatar', photoFile)

        const response = await api.patch('/clients/avatar', data)

        const newDataUser = user
        newDataUser.avatar = response.data
        saveUserInStorage(newDataUser)
        setLoadingPage(false)
      }
      setLoadingPage(false)
    }
  }

  return (
    <StyledView className="mb-5 justify-center items-center">
      <StyledImage
        source={{
          uri: user.avatar,
        }}
        alt="avatar"
        className="rounded-full w-36 h-36 bg-gray-400/60"
      />
      <StyledTouchableOpacity onPress={pickImage} className="mt-2">
        <StyledText className="text-base font-semibold">
          Change photo
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}
