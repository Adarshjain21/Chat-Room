import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-black text-red-500 rounded-full m-5'>Hyyy, How are you?</h1>
    </>
  )
}

export default App
