import a from './data.json'
import CommentComponent from './Components/Comment'
import { Comment } from './interfaces/Comment.types'
import { useState } from 'react'

// NOTE: When setting new data for a map function, create a temp array using .slice()
// Using slice deep copies not shallow copies

function App() {
  const [data, setData] = useState<Array<Comment>>(a.comments)

  return (
    <main className='font-body bg-VeryLightGray min-h-screen'>
      <div className='p-4 flex flex-col gap-4'>
        {data &&
          data.map(value => {
            return <CommentComponent data={value} key={value.id} />
          })}
      </div>
    </main>
  )
}

export default App
