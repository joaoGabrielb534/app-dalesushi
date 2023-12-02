import { useState } from 'react'
import { useAuth } from '../../../../../hooks/useAuth'

import { Text, View } from 'react-native'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Animated, { Easing, FadeInLeft } from 'react-native-reanimated'

import { InputUI } from '../../../../../components/ui/InputUI'
import { ButtonUI } from '../../../../../components/ui/ButtonUI'

import * as yup from 'yup'

import { styled } from 'nativewind'

const StyledView = styled(View)
const StyledText = styled(Text)

const StyledAnimatedView = styled(Animated.View)

interface FormDataProps {
  email: string
  password: string
}

const schemaSignIn = yup.object({
  email: yup
    .string()
    .email('Must be email valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must have at least 8 characters')
    .required('Password is required'),
})

export function FormSignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schemaSignIn),
  })

  const { signIn } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)

  async function handleSignIn(data: FormDataProps) {
    setLoading(true)
    await signIn(data)
    setLoading(false)
  }

  return (
    <StyledAnimatedView
      className="items-center"
      entering={FadeInLeft.duration(1000).easing(Easing.linear)}
    >
      <StyledView className="w-[90%] gap-y-4">
        <StyledView style={{ gap: 8 }}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputUI
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(masked) => {
                    onChange(masked)
                  }}
                  placeholder="Email"
                  keyboardType="email-address"
                  messageError={errors.email?.message}
                />
              )
            }}
          />

          <Controller
            name="password"
            rules={{
              required: 'Password is required',
            }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputUI
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                  placeholder="Password"
                  secureTextEntry
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                  messageError={errors.password?.message}
                />
              )
            }}
          />
        </StyledView>

        <ButtonUI
          title="Sign in"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit(handleSignIn)}
        />
      </StyledView>
    </StyledAnimatedView>
  )
}
