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
        <div className='flex gap-4 order-4 col-start-3 col-end-4 w-max row-start-1 row-end-2 justify-self-end'>
          <Delete deleteComment={deleteComment} commentId={comment.id} />
          <Edit changeMode={changeMode} />
        </div>
      )
    } else if (mode === Mode.edit) {
      return (
        <button
          onClick={() => {
            setMode(Mode.default)
          }}
          className='bg-ModerateBlue px-8 py-3 rounded-lg text-white font-medium row-start-3 row-end-4 col-start-3 col-end-4 order-4 max-w-fit justify-self-end hover:opacity-50'
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
    <>
      <div
        className={`flex flex-wrap gap-4 bg-white rounded-lg p-4 h-fit justify-between lg:grid lg:grid-cols-[fit-content(100px)_1fr_1fr] ${
          replyingTo ? 'w-[90%] ml-auto' : 'w-full'
        }`}
      >
        <div className='flex items-center gap-4 w-max order-2 col-start-2 col-end-3'>
          <img
            src={comment.user.image.webp}
            alt='Profile Icon'
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
            className='p-4 border-[1px] border-LightGrayishBlue rounded-lg text-DarkBlue outline-none order-3 col-span-2 grow w-full'
          />
        ) : (
          <p className='text-GrayishBlue order-3 col-start-2 col-end-4 col-span-2 break-words w-full'>
            {renderReplyingTo()}
            {value}
          </p>
        )}
        <Score score={comment.score} />
        {renderGhostButtons(comment.user.username, data.currentUser.username)}
      </div>
      {mode === Mode.reply && (
        <ReplyBox
          replyingTo={replyingTo}
          username={comment.user.username}
          commentId={comment.id}
          addReply={addReply}
          setMode={setMode}
        />
      )}
    </>
  )
}
