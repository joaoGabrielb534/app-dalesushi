export type Message = {
  id: string
  content: string
  createdAt: string
  client: {
    id: string
    name: string
    avatar: string
  }
}
