import data from './data.json'
import { TopComment } from './interfaces/TopComment.interface'
import { useCallback, useState } from 'react'
import AddComment from './Components/AddComment'
import CommentReplyContainer from './Components/CommentReplyContainer'
import { Reply } from './interfaces/Reply.interface'

function App() {
  const [comments, setComments] = useState<Array<TopComment>>(data.comments)

  const addComment = useCallback(
    (comment: string) => {
      let temp = comments.splice(0)
      const newComment: TopComment = {
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
      //NOTE: Loops through each comment and checks if the comment is the comment to be deleted, else it will check if the replies has the comment to delete
      //temp variable is a deep copy of the comments array
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
          let temp = comments.splice(0)
          temp.splice(i, 1)
          setComments(temp)
        } else if (
          comments[i].replies.findIndex(reply => {
            return reply.id === id
          }) !== -1
        ) {
          let temp = comments.splice(0)
          temp[i].replies.splice(
            temp[i].replies.findIndex(reply => {
              return reply.id === id
            }),
            1,
          )
          setComments(temp)
        }
      }
    },
    [comments],
  )

  const addReply = useCallback(
    (id: number, body: string, replyingTo: string) => {
      for (let i = 0; i < comments.length; i++) {
        let topComment = comments[i]
        const reply: Reply = {
          id: Date.now(),
          content: body,
          createdAt: 'Now',
          score: 0,
          replyingTo: replyingTo,
          user: {
            image: {
              png: data.currentUser.image.png,
              webp: data.currentUser.image.webp,
            },
            username: data.currentUser.username,
          },
        }
        if (topComment.id === id) {
          let tempComments = comments.splice(0)
          tempComments[i].replies = [...tempComments[i].replies, reply]
          setComments(tempComments)
        } else {
          let foundReply = topComment.replies.findIndex(value => {
            return value.id === id
          })
          if (foundReply !== -1) {
            let tempComments = comments.splice(0)
            tempComments[i].replies = [...tempComments[i].replies, reply]
            setComments(tempComments)
          }
        }
      }
    },
    [comments],
  )

  return (
    <main className='font-body bg-VeryLightGray h-screen w-screen flex justify-center'>
      <div className='p-4 flex flex-col gap-4 h-screen max-w-screen-lg w-full'>
        <div className='overflow-y-scroll flex-col flex gap-4 flex-initial grow'>
          {comments &&
            comments.map(value => {
              return (
                <CommentReplyContainer
                  value={value}
                  deleteComment={deleteComment}
                  key={value.id}
                  addReply={addReply}
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
