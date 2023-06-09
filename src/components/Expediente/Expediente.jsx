import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../Header'
import '../css/principal.css'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useCallApi } from '../../hooks/useCallApi'
import { UserContext } from '../../context/UserContext'
import { Loader } from '../Loader'
import { Container, Grid, Typography } from '@mui/material'
import { MiExpediente } from './MiExpediente'
import { OtrosExpediente } from './OtrosExpendiente'
 


export function Expediente () {
    const {user, decodeToken, autorize } =useContext(UserContext)
    const [userData, setUserData]=useState(decodeToken())
    const routeParams = useParams()
    const navigate = useNavigate();
  

  // eslint-disable-next-line no-unused-vars
  return (
      <>
        <Header />
      <Container maxWidth={'lg'} sx={{pt:4}}>
      <Container maxWidth={'lg'} sx={{}}> 
      <Typography variant='h5' color='#2d2c68' sx={{ fontWeight: 'bold', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>   
        Expedientes
        </Typography>
        </Container>
        <MiExpediente/>
    <hr/>
    <Container key={'1'} maxWidth={'lg'} sx={{}}> 
    <Typography variant='h5' marginTop={1} color='#2d2c68' sx={{ fontWeight: 'bold', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>   
    Expedientes Compartidos
      </Typography>
      </Container>
      <OtrosExpediente/>
    <Grid>
    </Grid>
        </Container>
      </>    
  )
}

/**

**/