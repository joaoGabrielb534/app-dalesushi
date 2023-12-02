import { useState } from 'react'
import { api } from '../../../services/api'
import { useAuth } from '../../../hooks/useAuth'

import { Controller, useForm } from 'react-hook-form'

import { ScrollView, View } from 'react-native'

import Toast from 'react-native-toast-message'

import { InputUI } from '../../../components/ui/InputUI'
import { ButtonUI } from '../../../components/ui/ButtonUI'
import { ProfileImage } from './components/ProfileImage'
import { HeaderProfile } from './components/HeaderProfile'
import { UserDto } from '../../../dtos/UserDto'
import { AppError } from '../../../utils/AppError'

import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProp } from '../../../routes/app-routes'
const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

type FormData = {
  name: string
  email: string
}

export function Profile() {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setLoadingPage] = useState<boolean>(false)

  const { user, updateUserStorage } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  return (
    <StyledView className="flex-1">
      <HeaderProfile />

      <StyledScrollView className="flex-1 mt-4 px-4">
        <StyledView className="flex-1 my-2 w-full">
          <ProfileImage setLoadingPage={setLoadingPage} />

          <StyledView style={{ gap: 8 }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onBlur, onChange, value } }) => {
                return (
                  <InputUI
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={false}
                    messageError={errors.name?.message}
                  />
                )
              }}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <InputUI
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    editable={false}
                    messageError={errors.email?.message}
                  />
                )
              }}
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledView>
  )
}
