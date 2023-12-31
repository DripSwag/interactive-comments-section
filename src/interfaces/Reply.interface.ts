import { Comment } from './Comment.interface'

export interface Reply extends Comment {
  replyingTo: string
}
