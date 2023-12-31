import { useCallback, useState } from 'react'
import Delete from './Delete'
import Edit from './Edit'
import Reply from './ReplyButton.tsx'
import Score from './Score'
import Mode from '../enums/Mode.enum.ts'
import data from '../data.json'
import ReplyBox from './ReplyBox.tsx'

interface Params {
  deleteComment: Function
  profileImg: string
  replyingTo?: string
  username: string
  score: number
  content: string
  id: number
  createdAt: string
  addReply: Function
}

export default function CommentComponent({
  deleteComment,
  profileImg,
  replyingTo,
  username,
  score,
  content,
  id,
  createdAt,
  addReply,
}: Params) {
  const [mode, setMode] = useState(Mode.default)
  const [value, setValue] = useState(content)

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
          <Delete deleteComment={deleteComment} commentId={id} />
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
          <img src={profileImg} className='aspect-square max-h-8' />
          <h2 className='font-medium text-DarkBlue'>{username}</h2>
          <p className='text-GrayishBlue'>{createdAt}</p>
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
          <Score score={score} />
          <div className='flex gap-4'>
            {renderGhostButtons(username, data.currentUser.username)}
          </div>
        </div>
      </div>
      {mode === Mode.reply && (
        <ReplyBox
          username={username}
          commentId={id}
          addReply={addReply}
          setMode={setMode}
        />
      )}
    </div>
  )
}
