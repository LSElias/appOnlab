import * as React from 'react'
import './css/principal.css'
import { Header } from './Header'
import Agenda from './Agenda'
import { useContext } from 'react'
import { AgendaContext } from '../context/agendaContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { UserContext } from '../context/UserContext'
import { useCallApi } from '../hooks/useCallApi'
import { Loader } from './Loader'
import { Link } from 'react-router-dom'
import { MiExpediente } from './Expediente/MiExpediente'



export function Preferencias () {
    const {user, decodeToken, autorize } =useContext(UserContext)
    const [userData, setUserData]=useState(decodeToken())
  const { data, error, loaded } = useCallApi({ endpoint: `usuario/${userData.id}` })
 // console.log(userData);

  return (
    <>
    <Header/>
    {!loaded && (<Loader/>)}
    
    {data && data!=null && data.id==userData.id &&
    <Grid item xs={11}  sx={{margin:3, border:1, padding:4, borderRadius:1, }}>
        <Grid>
        <Typography variant='h5' component='h1' gutterBottom  sx={
            {
              fontWeight: 700 ,
              fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
              letterSpacing: 2,
              wordSpacing: 1,
            }            
            }> 
            Perfil
            </Typography>
        </Grid>
        <hr/>
        <Grid container  margin={3}>
        <Grid item xs={12} sm={12} sx={{}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Nombre:</Box> {data.nombre} {data.apellido1} {data.apellido2}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} sx={{}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Email:</Box> {data.email}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} sx={{}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Contraseña:</Box> ●●●●●●●●●●●●●
            </Typography>
        </Grid>
        <Grid item  xs={11} sm={11} sx={{my:2}} >
        <hr/>
        </Grid>
        <Grid item xs={8} sm={8} sx={{}}>
        <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'> Expediente:</Box> 
            </Typography>
<           MiExpediente/>
        </Grid>
        <Grid container spacing={2} paddingTop={4}>
        <Grid item sx={{}}>
            <Button type='button' component={Link} to={'/preferencias/perfil'} sx={{color:'#3D3B8C',fontWeight: 'bold', letterSpacing:'0.0em',textDecoration:0,fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,                 ":hover":{
                    color:'#2493ff'}}} >
                Cambiar Información de Perfil
            </Button>
        </Grid>
        <Grid item sx={{}}>
            <Button type='button' component={Link} to={'/preferencias/cambio-contrasena'} sx={{color:'#3D3B8C',fontWeight: 'bold', letterSpacing:'0.0em',textDecoration:0,fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,                 ":hover":{
                    color:'#2493ff'}}}>
                Cambiar Contraseña
            </Button>
            </Grid>
        </Grid>
        </Grid>
    </Grid>
    }
    </>
  )
}
