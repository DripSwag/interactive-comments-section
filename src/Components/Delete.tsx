import TrashIcon from '../images/icon-delete.svg'

interface Params {
  commentId: number
  deleteComment: Function
}

export default function Delete({ commentId, deleteComment }: Params) {
  function handleClick() {
    deleteComment(commentId)
  }

  return (
    <button className='flex items-center gap-2' onClick={handleClick}>
      <img src={TrashIcon} className='aspect-square h-full max-h-3' />
      <p className='RedGhostButton'>Delete</p>
    </button>
  )
}
