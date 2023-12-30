import ReplyIcon from '../images/icon-reply.svg'

export default function Reply() {
  return (
    <button className='flex items-center gap-2'>
      <img src={ReplyIcon} className='h-full aspect-square max-h-3' />
      <p className='BlueGhostButton'>Reply</p>
    </button>
  )
}
