import { useEffect, useState } from "react"
const BASE_URL=import.meta.env.VITE_BASE_URL

export  function useCallApi({ endpoint }){
    const [data, setData]=useState(null)
    const [error, setError]=useState('')
    const [loaded, setLoaded]=useState(false)
    useEffect(()=>{
      fetch(`${BASE_URL}${endpoint}`)
      .then(res=>res.json())
      .then(response=>{
       // console.log(response)
        setData(response.results)
        setError(response.error)
        setLoaded(true)
      })  
    },[endpoint])
    return { data, error, loaded }
}

export function useCallApiT({ endpoint }){
  const [tdata, setData]=useState(null)
  const [terror, setError]=useState('')
  const [tloaded, setLoaded]=useState(false)
  useEffect(()=>{
    fetch(`${BASE_URL}${endpoint}`)
    .then(res=>res.json())
    .then(response=>{
      //console.log(response)
      setData(response.results)
      setError(response.error)
      setLoaded(true)
    })  
  },[endpoint])
  return { tdata, terror, tloaded }
}