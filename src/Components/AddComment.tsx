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
      className='h-[40%] bg-white flex flex-col gap-4 p-4 max-h-48'
      onSubmit={e => {
        handleClick(e)
      }}
    >
      <input
        className='border-2 border-LightGray rounded-md grow p-2'
        placeholder='Add a comment...'
        type='text'
        onChange={event => {
          setValue(event.currentTarget.value)
        }}
      />
      <div className='flex justify-between items-center h-min'>
        <img src={data.image.webp} className='aspect-square h-8' />
        <button
          className='bg-ModerateBlue text-white px-8 py-3 rounded-lg h-min'
          type='submit'
        >
          SEND
        </button>
      </div>
    </form>
  )
}
