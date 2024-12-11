import { useState } from 'react'
import './App.css'
import GridList from './components/Grid/Grid'
import { useEffect } from 'react'
import { BaseUrl } from './constrant'
import Back from './components/Back/back'
import { Grid } from 'antd'
import ListList from './components/List/List'

function App() {

  const [data, setData] = useState(null)
  const [backPath, setBackPath] = useState(["/"])
  const [path, setPath] = useState("/")

  const [isMobile, setIsMobile] = useState(false)

  const pushBackPath = (path) => {
    setBackPath((prevStack) => [...prevStack, path])
  }

  const popBackPath = () => {
    setBackPath((prevStack) => prevStack.slice(0, -1))
  }


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize); 

    return () => {
        window.removeEventListener("resize", handleResize); 
    };
  }, [])

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
      <div style={{ fontSize: '20px'}}>{path}</div>

      {
        isMobile ? 
        <ListList listdata={data} onUpdate={updatePath} /> :
        <GridList listdata={data} onUpdate={updatePath} />
      }

    </>
  )
}

export default App
