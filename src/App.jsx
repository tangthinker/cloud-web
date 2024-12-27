import { useState } from 'react'
import './App.css'
import GridList from './components/Grid/Grid'
import { useEffect } from 'react'
import { BaseUrl } from './constrant'
import Back from './components/Back/back'
import { Grid } from 'antd'
import ListList from './components/List/List'
import Upload from './components/Upload/upload'
import { invoke } from "@tauri-apps/api/core";


async function testUrl(url) {
  try {
    const response = await invoke("test_url", {url : url})
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
    return false
  }
}


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

  useEffect(() => {
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
      <Upload path={path} onSuccess={fetchData} url={BaseUrl + "/api/v1/storage/upload"} />

      {
        isMobile ? 
        <ListList listdata={data} onUpdate={updatePath} /> :
        <GridList listdata={data} onUpdate={updatePath} />
      }

    </>
  )
}

export default App
