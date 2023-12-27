export interface Reply {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replyingTo: string,
  user: {
    image: {
      png: string,
      webp: string,
    },
    username: string,
  }
}
