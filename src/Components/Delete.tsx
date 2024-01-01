import { useState } from 'react'

interface Params {
  commentId: number
  deleteComment: Function
}

interface ModalParams {
  closeModal: Function
  deleteComment: Function
}

function Modal({ closeModal, deleteComment }: ModalParams) {
  return (
    <section className='w-full h-full absolute bg-[#303030A0] z-50 top-0 left-0 p-4'>
      <div className='bg-white rounded-lg w-full max-w-sm p-8 relative left-1/2 flex flex-col gap-4 -translate-x-1/2 top-1/2 -translate-y-1/2'>
        <h1 className='font-medium text-DarkBlue text-xl'>Delete Comment</h1>
        <p className='text-GrayishBlue'>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className='flex gap-4'>
          <button
            onClick={() => {
              closeModal()
            }}
            className='whitespace-nowrap w-full p-4 bg-GrayishBlue rounded-lg text-white font-medium'
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => {
              deleteComment()
              closeModal()
            }}
            className='whitespace-nowrap w-full p-4 bg-SoftRed rounded-lg text-white font-medium'
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Delete({ commentId, deleteComment }: Params) {
  const [showModal, setShowModal] = useState(false)

  function handleClick() {
    setShowModal(true)
  }

  return (
    <>
      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false)
          }}
          deleteComment={() => {
            deleteComment(commentId)
          }}
        />
      )}
      <button
        className='flex items-center gap-2 RedGhostButton'
        onClick={handleClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={12}
          height={14}
          className='fill-SoftRed'
        >
          <path d='M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667z' />
        </svg>
        Delete
      </button>
    </>
  )
}
