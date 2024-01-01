import { TopComment } from '../interfaces/TopComment.interface'
import CommentComponent from './Comment'

interface Params {
  value: TopComment
  deleteComment: Function
  addReply: Function
}

export default function CommentReplyContainer({
  value,
  deleteComment,
  addReply,
}: Params) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <CommentComponent
        key={value.id}
        comment={value}
        addReply={addReply}
        deleteComment={deleteComment}
      />
      {value.replies &&
        value.replies.map(reply => {
          return (
            <CommentComponent
              comment={reply}
              deleteComment={deleteComment}
              key={reply.id}
              replyingTo={reply.replyingTo}
              addReply={addReply}
            />
          )
        })}
    </div>
  )
}
