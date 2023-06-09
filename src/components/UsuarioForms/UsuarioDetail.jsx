import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import '../css/Detail.css'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useCallApi, useCallApiT } from '../../hooks/useCallApi'
import { Loader } from '../Loader'
import { Header } from '../Header'
import { Button, Grid } from '@mui/material'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

function getTipo(tipo){
    switch(tipo){
        case "1": 
        return 'Administrador';
            break;
        case "2":
            return "Médico";
            break;
        case "3":
            return "Paciente";
            break;
    }
}

export function UsuarioDetail () {
  const routeParams = useParams()
  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint:`Usuario/${routeParams.id}` })
  

  return (   
    <>
     {!loaded && 
    
     <Loader/>}
     {data && data!=null &&
        <>
        <Header/>
        <Grid container 
                sx={{border: 1,
                my:5,
                mx: 'auto',
                paddingY:0}}
                maxWidth='md'>
            <Grid container  sx={{
                borderBottom:1, 
                p:1,
                background: "#000",}} >
                <Grid item xs={10} sm={12}>
                    <Typography align='center' color='white' sx={{
                    textShadow:'black 0px 2px, black 2px 0px, black 0px -2px, black -2px 0px',
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    fontWeight:700}} >
                    Detalle de Usuario
                    </Typography>  
                </Grid>
            </Grid>
            <Grid container>
            <Grid item xs={12} sm={12} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Nombre:</Box> {data.nombre} {data.apellido1} {data.apellido2}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Correo:</Box> {data.email}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Tipo de Usuario:</Box> {getTipo(data.tipousuario)}
            </Typography>
            </Grid>
            </Grid>
            </Grid>
        </>
        }
    </>
  )
}
