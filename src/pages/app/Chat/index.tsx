import { styled } from 'nativewind'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { HeaderChat } from './components/HeaderChat'
import { SendHorizonal } from 'lucide-react-native'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { api } from '../../../services/api'
import { Message } from '../../../dtos/MessageDto'
import { MessageCard } from './components/MessageCard'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
const StyledPressable = styled(Pressable)

const StyledFlatList = styled(FlatList<Message>)

const socket = io('ws://192.168.0.121:3333')
export function Chat() {
  const { user } = useAuth()

  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([] as Message[])

  useEffect(() => {
    handleGetMessage()
  }, [messages])

  async function handleGetMessage() {
    const response = await api.get('/messages')
    setMessages(response.data)
  }

  function handleNewMessage() {
    if (message.trim().length) {
      socket.emit('send_message', { content: message, userId: user.id })
      setMessage('')
    }
  }

  return (
    <StyledView className="flex-1">
      <HeaderChat />

      <StyledView className="flex-1 px-2 py-2">
        {messages.length ? (
          <StyledFlatList
            showsVerticalScrollIndicator={false}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageCard item={item} />}
            className="mb-16"
          />
        ) : (
          <StyledView className="flex-1 justify-center items-center">
            <StyledText className="text-lg text-gray-700">
              Let's interact! 😝
            </StyledText>
          </StyledView>
        )}
      </StyledView>

      <StyledView className="flex-row absolute bottom-2 w-full px-2">
        <StyledTextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem..."
          className="px-3 py-2 bg-gray-300 flex-1 rounded-2xl"
        />
        <StyledPressable
          onPress={handleNewMessage}
          className="ml-1 p-2 bg-red-600 rounded-full items-center justify-center"
        >
          <SendHorizonal size={35} color="black" />
        </StyledPressable>
      </StyledView>
    </StyledView>
  )
}
