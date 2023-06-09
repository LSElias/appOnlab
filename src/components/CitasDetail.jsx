import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import './css/Detail.css'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallApi, useCallApiT } from '../hooks/useCallApi'
import { Loader } from './Loader'
import { Header } from './Header'
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'

function Ocupado(ocupado, data){
    if(ocupado==1){
        return(
        <Typography sx={{pt:1}}>
            Este horario esta ocupado por el cliente: {data.cita.nombre}
        </Typography>
        );
    }else{
        return(
        <Typography sx={{pt:1}} >
        Este horario no esta ocupado
        </Typography>
        );
    }
}

function fechaFormateada(fecha){
    const date = new Date(fecha);
    date.setDate(date.getDate() + 1)
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    return formattedDate;
  }
  

export function CitasDetail () {
  const navigate = useNavigate()
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const routeParams = useParams()
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint:`Citas/getFull/${routeParams.id}` })

  useEffect(() => {
    if(data!=null && data!="No hay registros" && data.idpaciente != userData.id){
      return navigate('/unauthorized/')
    }
  }, [data])
  

  return (   
    <>
     {!loaded && 
     
     <>
     <Loader/></>}
     {data && 
        <>
        <Header/>
            <Grid container 
                sx={{border: 1,
                my:5,
                mx: 'auto',
                paddingY:0}}
                maxWidth='md'>
            <Grid container  sx={{
                top:-5,
                borderBottom:1, 
                p:1,
                background: "#000",}} >
                <Grid item xs={10} sm={4}>
                    <Typography align='center' color='white' sx={{
                    textShadow:'black 0px 2px, black 2px 0px, black 0px -2px, black -2px 0px',
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    fontWeight:700}} >
                    Reporte cita #{data.id}
                    </Typography>  
                </Grid>
                <Grid item justify={'end'} sm={7} xs={1}>
                </Grid>
                <Grid item  justify={'end'} xs={1}>
                    <img height='45vh' src='/src/img/logo-favicon.png'></img>
                </Grid>
            </Grid>
            <Grid container>
            <Grid item xs={12} sm={6} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Consultorio:</Box> {data.horario.Consultorio}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Especialidad:</Box> {data.horario.Especialidad}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Estado:</Box> {data.estado}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Fecha:</Box> {fechaFormateada(data.dia)}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Paciente:</Box> {data.paciente.nombre} {data.paciente.apellido1}  {data.paciente.apellido2}  
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Funcionario:</Box> {data.horario.nombre} {data.horario.apellido1}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{p:1, border:1}}>
            <Typography gutterBottom>
            <Box fontWeight='bold' display='inline'>Costo:</Box> ₡{data.horario.precio} 
            </Typography>
            </Grid>
            </Grid>
          </Grid>
        </>
        }
    </>
  )
}
