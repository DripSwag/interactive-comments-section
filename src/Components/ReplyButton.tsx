import Mode from '../enums/Mode.enum'
import ReplyIcon from '../images/icon-reply.svg'

interface Params {
  changeMode: Function
}

export default function Reply({ changeMode }: Params) {
  return (
    <button
      className='flex items-center gap-2'
      onClick={() => {
        changeMode(Mode.reply)
      }}
    >
      <img src={ReplyIcon} className='h-full aspect-square max-h-3' />
      <p className='BlueGhostButton'>Reply</p>
    </button>
  )
}
