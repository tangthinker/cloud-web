import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List/List'
import { useEffect } from 'react'
import { BaseUrl } from './constrant'
import Back from './components/Back/back'

function App() {

  const [data, setData] = useState(null)
  const [backPath, setBackPath] = useState(["/"])
  const [path, setPath] = useState("/")

  const pushBackPath = (path) => {
    setBackPath((prevStack) => [...prevStack, path])
  }

  const popBackPath = () => {
    setBackPath((prevStack) => prevStack.slice(0, -1))
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(BaseUrl + "/api/v1/storage/ls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "path": path
        })
      })

      const data = await response.json()

      setData(data.data)
    
    }

    fetchData()
  },[path])
  
  function updatePath(newPath) {
    if (newPath === "..") {
      popBackPath()
      setPath(backPath[backPath.length - 1])
      return
    }
    pushBackPath(path)
    setPath(newPath)
  }

  function back() {
    if (backPath.length === 1) {
      return
    }
    updatePath("..")
  }

  return (
    <>
      <Back OnClick={back} />
      <div style={{ fontSize: '35px'}}>{path}</div>
      <List listdata={data} onUpdate={updatePath} />
    </>
  )
}

export default App
