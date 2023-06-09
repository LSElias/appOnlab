import { useState } from 'react'
import { AgendaContext } from '../context/agendaContext'

export default function AgendaProvider (props) {
    const [AgendaC, setAgenda] = useState(
      JSON.parse(localStorage.getItem('Agenda')) || null
    )
  
    const saveAgenda = (AgendaC) => {
      setAgenda(AgendaC)
      localStorage.setItem('Agenda', JSON.stringify(AgendaC))
    }
    
    const getAgenda = () =>{
       return localStorage.getItem('Agenda')
    }

    const clearAgenda = () => {
      setAgenda(null)
      localStorage.removeItem('Agenda')
    }

    return (
      <AgendaContext.Provider value={{ AgendaC, saveAgenda, getAgenda, clearAgenda }}>
        {props.children}
      </AgendaContext.Provider>
    )
  }
  