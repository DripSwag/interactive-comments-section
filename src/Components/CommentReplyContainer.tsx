import { Comment } from '../interfaces/Comment.types'
import CommentComponent from './Comment'

interface Params {
  value: Comment
  deleteComment: Function
  addReply: Function
}

export default function CommentReplyContainer({
  value,
  deleteComment,
  addReply,
}: Params) {
  return (
    <div className='flex flex-col gap-4'>
      <CommentComponent
        deleteComment={deleteComment}
        profileImg={value.user.image.webp}
        username={value.user.username}
        score={value.score}
        content={value.content}
        createdAt={value.createdAt}
        id={value.id}
        key={value.id}
        addReply={addReply}
      />
      {value.replies &&
        value.replies.map(reply => {
          return (
            <CommentComponent
              deleteComment={deleteComment}
              profileImg={reply.user.image.webp}
              username={reply.user.username}
              score={reply.score}
              content={reply.content}
              createdAt={reply.createdAt}
              id={reply.id}
              key={reply.id}
              replyingTo={reply.replyingTo}
              addReply={addReply}
            />
          )
        })}
    </div>
  )
}
