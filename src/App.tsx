import data from './data.json'
import CommentComponent from './Components/Comment'
import { Comment } from './interfaces/Comment.types'
import { useCallback, useState } from 'react'
import AddComment from './Components/AddComment'

// NOTE: When setting new data for a map function, create a temp array using .slice()
// Using slice deep copies not shallow copies

function App() {
  const [comments, setComments] = useState<Array<Comment>>(data.comments)

  const addComment = useCallback(
    (comment: string) => {
      let temp = comments.splice(0)
      const newComment: Comment = {
        id: Date.now(),
        content: comment,
        createdAt: 'Now',
        score: 0,
        user: {
          image: {
            png: data.currentUser.image.png,
            webp: data.currentUser.image.webp,
          },
          username: data.currentUser.username,
        },
        replies: [],
      }
      temp.push(newComment)
      setComments(temp)
    },
    [comments],
  )

  return (
    <main className='font-body bg-VeryLightGray h-screen'>
      <div className='p-4 flex flex-col gap-4 h-screen'>
        <div className='overflow-y-scroll flex-col flex gap-4 flex-initial grow'>
          {comments &&
            comments.map(value => {
              return <CommentComponent data={value} key={value.id} />
            })}
        </div>
        <AddComment data={data.currentUser} addComment={addComment} />
      </div>
    </main>
  )
}

export default App
