import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImgM from './components/imgm/ImgM'
import File from './components/File/File'
import Dir from './components/Dir/Dir'
import List from './components/List/List'
import { useEffect } from 'react'

function App() {

  const [data, setData] = useState(null)

    useEffect(() => {
      async function fetchData() {
        const response = await fetch("http://127.0.0.1:9999/api/v1/storage/ls", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "path": "/"
          })
        })

        const data = await response.json()

        setData(data.data)
      
      }

      fetchData()
    },[])

  return (
    <>
      <h1>Hello world!</h1>
      <List listdata={data}/>
    </>
  )
}

export default App
