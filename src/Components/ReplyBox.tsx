import { useState } from 'react'
import data from '../data.json'
import Mode from '../enums/Mode.enum'

interface Params {
  username: string
  addReply: Function
  commentId: number
  setMode: Function
}

export default function ReplyBox({
  username,
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
      className={`flex p-2 flex-wrap justify-between gap-2 bg-white rounded-lg my-2 ${
        username ? 'w-[90%] ml-auto' : ''
      }`}
    >
      <img
        src={data.currentUser.image.webp}
        className='aspect-square h-8 order-2'
      />
      <textarea
        value={value}
        onChange={event => {
          setValue(event.currentTarget.value)
        }}
        className='p-4 border-[1px] border-LightGrayishBlue rounded-lg text-GrayishBlue outline-none order-1 w-full'
      />
      <button
        className='bg-ModerateBlue text-white px-8 py-3 rounded-lg h-min order-3'
        onClick={handleClick}
      >
        REPLY
      </button>
    </div>
  )
}
