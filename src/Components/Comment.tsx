import { useCallback, useState } from 'react'
import { Comment } from '../interfaces/Comment.types'
import Delete from './Delete'
import Edit from './Edit'
import Reply from './Reply'
import Score from './Score'
import Mode from '../enums/Mode.enum.ts'

interface Params {
  comment: Comment
  currentUser: string
  deleteComment: Function
}

export default function CommentComponent({
  comment,
  currentUser,
  deleteComment,
}: Params) {
  const [mode, setMode] = useState(Mode.default)
  const [value, setValue] = useState(comment.content)

  const changeMode = useCallback(
    (newMode: Mode) => {
      setMode(newMode)
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
          <Reply />
        </>
      )
    }
  }

  return (
    <div className='flex flex-col gap-4 bg-white rounded-lg p-4 h-fit'>
      <div className='flex items-center gap-4'>
        <img src={comment.user.image.webp} className='aspect-square max-h-8' />
        <h2 className='font-medium text-DarkBlue'>{comment.user.username}</h2>
        <p className='text-GrayishBlue'>{comment.createdAt}</p>
      </div>
      {mode === Mode.edit ? (
        <input
          type='text'
          value={value}
          onChange={event => {
            setValue(event.currentTarget.value)
          }}
          className='p-4 border-[1px] border-LightGrayishBlue rounded-lg text-GrayishBlue outline-none'
        />
      ) : (
        <p className='text-GrayishBlue'>{value}</p>
      )}
      <div className='flex justify-between items-center max-h-6 mt-2'>
        <Score score={comment.score} />
        <div className='flex gap-4'>
          {renderGhostButtons(comment.user.username, currentUser)}
        </div>
      </div>
    </div>
  )
}
