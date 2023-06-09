import * as React from 'react'
import './css/principal.css'
import { Header } from './Header'
import Agenda from './Agenda'
import { useContext } from 'react'
import { AgendaContext } from '../context/agendaContext'
import { useState } from 'react'
import { useEffect } from 'react'



export function Cita () {
  return (
    <>
    <Header/>
     <Agenda     
     props={
      {
         tipo: "Registrados",
         especialidad: ''
      }
    }    
      />
    </>
  )
}
