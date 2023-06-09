import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../Header'
import '../css/principal.css'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useCallApi } from '../../hooks/useCallApi'
import { UserContext } from '../../context/UserContext'
import { Loader } from '../Loader'
import { Container, Grid, Typography } from '@mui/material'
 


export function MiExpediente () {
    const {user, decodeToken, autorize } =useContext(UserContext)
    const [userData, setUserData]=useState(decodeToken())
    const routeParams = useParams()
    const navigate = useNavigate();
    const { data, error, loaded } = useCallApi({ endpoint: `Expediente/getbyid/${userData.id}` })
    const [receivedData, setData ]=useState(null);

  useEffect(()=>{
    setData(data);
}, [data,error,loaded])
  

  // eslint-disable-next-line no-unused-vars
  return (
    <> 
    {!loaded && (<>
    </>) }
    {data && data!=null && (  
          <Container className='fade-in-expediente' sx={{marginY: 1, padding: 2, border: 1, borderColor: 'gray', borderRadius:'0.5em'}}> 
          <Typography variant='h6' color='#2d2c68' sx={{paddingY:1, fontWeight: 'bold', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                Mi expediente
            </Typography>
            <hr/>
            <Grid container spacing={2} justifyContent="flex-end" sx={{marginY:1.7}}>
                <Grid item>
            <Typography align="right" variant='a' color='#3D3B8C' component={Link} to={`/expediente/${data[0].idexpediente}`} sx={{
                marginX: 1, 
                fontWeight: 'bold', 
                letterSpacing:'0.0em',
                textDecoration:0,
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                ":hover":{
                    color:'#2a6cd5'
                }}}>
                Ver expediente
            </Typography>
            </Grid>
            <Grid item>
            <Typography align="right" variant='a' color='#3D3B8C' component={Link} to={`/expediente/update/${data[0].idexpediente}`} sx={{fontWeight: 'bold', letterSpacing:'0.0em',textDecoration:0,fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,                 ":hover":{
                    color:'#2493ff'
                }}}>
                Editar expediente
            </Typography>
            </Grid>
            <Grid item>
            <Typography align="right" variant='a' color='#3D3B8C' component={Link} to={`/expediente/compartir`} sx={{fontWeight: 'bold', letterSpacing:'0.0em',textDecoration:0,fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,                 ":hover":{
                    color:'#2493ff'
                }}}>
                Compartir expediente
            </Typography>
            </Grid>
            </Grid>
            </Container>
    )}
    {!data && data==null && (
          <Container className='fade-in-expedienteN' sx={{marginY: 1, padding: 2, border: 1, borderColor: 'gray', borderRadius:'0.5em'}}> 
          <Typography variant='h6' color='#2d2c68' sx={{paddingY:1, fontWeight: 'bold', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                Aún no tienes un expediente
            </Typography>
            <hr/>
            <Grid container justifyContent="flex-end" sx={{marginY:1.7}}>
            <Typography align="right" variant='a' color='#3D3B8C' component={Link} to={'/expediente/create'} sx={{
                marginX: 1, 
                fontWeight: 'bold', 
                letterSpacing:'0.0em',
                textDecoration:0,
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                ":hover":{
                    color:'#2a6cd5'
                }}}>
                Crear Expediente
            </Typography>
            </Grid>
            </Container>

    )}
    
    </>
  )
}