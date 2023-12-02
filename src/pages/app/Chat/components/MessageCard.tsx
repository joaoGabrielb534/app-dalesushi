import { styled } from 'nativewind'
import { Image, Text, View } from 'react-native'
import { Message } from '../../../../dtos/MessageDto'
import { useAuth } from '../../../../hooks/useAuth'
import { UserCircle } from 'phosphor-react-native'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledUserCircle = styled(UserCircle)

type Props = {
  item: Message
}

export function MessageCard({ item }: Props) {
  const { user } = useAuth()

  const date = new Date(item.createdAt)

  const myMessageContainer = 'flex-row-reverse justify-start mb-2 mr-20'
  const myMessageText = 'bg-green-500 p-2 rounded-lg'

  const clientMessageContainer = 'flex-row mb-2 mr-28'
  const clientMessageText = 'bg-gray-400 p-2 rounded-lg'
  return (
    <StyledView
      className={`${
        user.id !== item.client.id ? clientMessageContainer : myMessageContainer
      }`}
    >
      {user.id !== item.client.id && (
        <>
          {!item.client.avatar ? (
            <StyledUserCircle className="mr-1.5" size={48} weight="light" />
          ) : (
            <StyledImage
              source={{ uri: item.client.avatar }}
              alt="avatar"
              className="h-12 w-12 rounded-full mr-1.5"
            />
          )}
        </>
      )}

      <StyledView
        className={`${
          user.id === item.client.id ? myMessageText : clientMessageText
        }`}
      >
        {user.id === item.client.id ? (
          <>
            <StyledText className="text-base">{item.content}</StyledText>
            <StyledText className="text-[10px] text-right">
              {date.getHours().toLocaleString('pt-BR') +
                ':' +
                date.getMinutes()}
            </StyledText>
          </>
        ) : (
          <>
            <StyledText className="text-base font-medium">
              {item.client.name}
            </StyledText>
            <StyledText className="text-base">{item.content}</StyledText>
            <StyledText className="text-[10px] text-right">
              {date.getHours().toLocaleString('pt-BR') +
                ':' +
                date.getMinutes()}
            </StyledText>
          </>
        )}
      </StyledView>
    </StyledView>
  )
}
