import { useCallback, useState } from 'react'
import Delete from './Delete'
import Edit from './Edit'
import Reply from './ReplyButton.tsx'
import Score from './Score'
import Mode from '../enums/Mode.enum.ts'
import data from '../data.json'
import ReplyBox from './ReplyBox.tsx'
import { Comment } from '../interfaces/Comment.interface.ts'

interface Params {
  comment: Comment
  addReply: Function
  deleteComment: Function
  replyingTo?: string
}

export default function CommentComponent({
  deleteComment,
  comment,
  replyingTo,
  addReply,
}: Params) {
  const [mode, setMode] = useState(Mode.default)
  const [value, setValue] = useState(comment.content)

  const changeMode = useCallback(
    (newMode: Mode) => {
      if (newMode === mode) {
        setMode(Mode.default)
      } else {
        setMode(newMode)
      }
    },
    [mode],
  )

  function renderGhostButtons(commentUser: string, currentUser: string) {
    if (commentUser === currentUser && mode === Mode.default) {
      return (
        <>
          <Delete deleteComment={deleteComment} commentId={comment.id} />
          <Edit changeMode={changeMode} />
        </>
      )
    } else if (mode === Mode.edit) {
      return (
        <button
          onClick={() => {
            setMode(Mode.default)
          }}
          className='bg-ModerateBlue px-4 py-2 rounded-lg text-white font-medium'
        >
          UPDATE
        </button>
      )
    } else {
      return (
        <>
          <Reply changeMode={changeMode} />
        </>
      )
    }
  }

  function renderReplyingTo() {
    if (replyingTo) {
      return (
        <span className='text-ModerateBlue font-medium'>@{replyingTo} </span>
      )
    } else {
      return <></>
    }
  }

  return (
    <div className='w-full'>
      <div
        className={`flex flex-col gap-4 bg-white rounded-lg p-4 h-fit ${
          replyingTo ? 'w-[90%] ml-auto' : ''
        }`}
      >
        <div className='flex items-center gap-4'>
          <img
            src={comment.user.image.webp}
            className='aspect-square max-h-8'
          />
          <h2 className='font-medium text-DarkBlue'>{comment.user.username}</h2>
          <p className='text-GrayishBlue'>{comment.createdAt}</p>
        </div>
        {mode === Mode.edit ? (
          <textarea
            value={value}
            onChange={event => {
              setValue(event.currentTarget.value)
            }}
            className='p-4 border-[1px] border-LightGrayishBlue rounded-lg text-GrayishBlue outline-none'
          />
        ) : (
          <p className='text-GrayishBlue'>
            {renderReplyingTo()}
            {value}
          </p>
        )}
        <div className='flex justify-between items-center max-h-6 mt-2'>
          <Score score={comment.score} />
          <div className='flex gap-4'>
            {renderGhostButtons(
              comment.user.username,
              data.currentUser.username,
            )}
          </div>
        </div>
      </div>
      {mode === Mode.reply && (
        <ReplyBox
          replyingTo={comment.replyingTo}
          username={comment.user.username}
          commentId={comment.id}
          addReply={addReply}
          setMode={setMode}
        />
      )}
    </div>
  )
}
