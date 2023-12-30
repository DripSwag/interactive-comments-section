import data from './data.json'
import CommentComponent from './Components/Comment'
import { Comment } from './interfaces/Comment.types'
import { useCallback, useState } from 'react'
import AddComment from './Components/AddComment'

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

  const deleteComment = useCallback(
    (id: number) => {
      const index = comments.findIndex(value => {
        return value.id === id
      })
      let temp = comments.slice(0)
      temp.splice(index, 1)
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
              return (
                <CommentComponent
                  comment={value}
                  currentUser={data.currentUser.username}
                  deleteComment={deleteComment}
                  key={value.id}
                />
              )
            })}
        </div>
        <AddComment data={data.currentUser} addComment={addComment} />
      </div>
    </main>
  )
}

export default App
