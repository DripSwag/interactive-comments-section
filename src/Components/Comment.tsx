import { Comment } from '../interfaces/Comment.types'
import Score from './Score'

interface Params {
  data: Comment
}

export default function CommentComponent({ data }: Params) {
  return (
    <div className='flex flex-col gap-4 bg-white rounded-lg p-4 h-fit'>
      <div className='flex items-center gap-4'>
        <img src={data.user.image.webp} className='aspect-square max-h-8' />
        <h2 className='font-medium text-DarkBlue'>{data.user.username}</h2>
        <p className='text-GrayishBlue'>{data.createdAt}</p>
      </div>
      <p className='text-GrayishBlue'>{data.content}</p>
      <div className='flex justify-between'>
        <Score score={data.score} />
      </div>
    </div>
  )
}
