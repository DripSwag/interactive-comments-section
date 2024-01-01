import { useState } from 'react'
import { CurrentUser } from '../interfaces/CurrentUser.interface'

interface Params {
  data: CurrentUser
  addComment: Function
}

export default function AddComment({ data, addComment }: Params) {
  const [value, setValue] = useState('')

  function handleClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addComment(value)
  }

  return (
    <form
      className='h-[40%] bg-white flex gap-4 p-4 max-h-48 flex-wrap items-center rounded-lg lg:items-start lg:p-8 lg:h-[20%]'
      onSubmit={e => {
        handleClick(e)
      }}
    >
      <textarea
        className='border-2 border-LightGray rounded-md p-2 w-full order-1 resize-none lg:order-2 lg:grow lg:w-auto lg:h-full'
        placeholder='Add a comment...'
        onChange={event => {
          setValue(event.currentTarget.value)
        }}
      />
      <div className='aspect-square h-8 order-2 lg:order-1'>
        <img src={data.image.webp} />
      </div>
      <button
        className='bg-ModerateBlue text-white px-8 py-3 rounded-lg h-min order-3 ml-auto font-medium lg:ml-0 hover:opacity-50'
        type='submit'
      >
        SEND
      </button>
    </form>
  )
}
