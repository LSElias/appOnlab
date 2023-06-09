import * as React from 'react'
import { useCallApi } from '../../hooks/useCallApi'
import { useNavigate, useParams, Link } from 'react-router-dom'
import '../css/principal.css'
import { Loader } from '../Loader'
import { Header } from '../Header'
import { Footer } from '../Footer'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Agenda from '../Agenda'
import { AgendaContext } from '../../context/agendaContext'
import { useContext } from 'react'
import { useEffect } from 'react'



export function Horario () {

  return (
    <>
    <Header/>
     <Agenda
          props={
            {
               tipo: "HorariosMedicos",
               especialidad: ''
            }
          }         
     />
    </>
  )
}
