import { Comment } from './Comment.interface'
import { Reply } from './Reply.interface'

export interface TopComment extends Comment {
  replies: Array<Reply>
}
