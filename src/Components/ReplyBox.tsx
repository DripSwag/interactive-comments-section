import { useState } from 'react'
import data from '../data.json'
import Mode from '../enums/Mode.enum'

interface Params {
  username: string
  addReply: Function
  commentId: number
  setMode: Function
  replyingTo?: string
}

export default function ReplyBox({
  username,
  replyingTo,
  addReply,
  commentId,
  setMode,
}: Params) {
  const [value, setValue] = useState('')

  function handleClick() {
    addReply(commentId, value, username)
    setMode(Mode.default)
  }

  return (
    <div
      className={`flex p-4 flex-wrap justify-between gap-4 bg-white rounded-lg my-2 lg:justify-normal  ${
        replyingTo ? 'w-[90%] ml-auto' : ''
      }`}
    >
      <img
        src={data.currentUser.image.webp}
        className='aspect-square h-8 order-2 lg:order-1'
      />
      <textarea
        value={value}
        onChange={event => {
          setValue(event.currentTarget.value)
        }}
        className='p-4 border-[1px] border-LightGrayishBlue rounded-lg text-DarkBlue outline-none order-1 w-full lg:w-auto grow lg:order-2'
      />
      <button
        className='bg-ModerateBlue text-white px-8 py-3 rounded-lg h-min order-3 font-medium hover:opacity-50'
        onClick={handleClick}
      >
        REPLY
      </button>
    </div>
  )
}
