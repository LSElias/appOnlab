import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../Header'
import '../css/principal.css'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useCallApi } from '../../hooks/useCallApi'
import { UserContext } from '../../context/UserContext'
import { Loader } from '../Loader'
import { Container, Grid, Typography } from '@mui/material'
 


export function OtrosExpediente () {
    const {user, decodeToken, autorize } =useContext(UserContext)
    const [userData, setUserData]=useState(decodeToken())
    const routeParams = useParams()
    const navigate = useNavigate();
    const { data, error, loaded } = useCallApi({ endpoint: `Expediente/getbyperms/${userData.id}` })
    const [receivedData, setData ]=useState(null);
  var count=0;
  useEffect(()=>{
    setData(data);
}, [data,error,loaded])
  

  // eslint-disable-next-line no-unused-vars
  return (
    <> 
    {!loaded && (<>
    </>) }
    {data && data!=null && data.map((row) =>
    {if(row.usuario != userData.id){
      count++;
      return (
        <Container key={row.idexpediente} className='fade-in-expediente' sx={{marginY: 1, padding: 2, border: 1, borderColor: 'gray', borderRadius:'0.5em'}}> 
        <Typography variant='h6' color='#2d2c68' sx={{paddingY:1, fontWeight: 'bold', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
              Expediente de {row.Nombre}
          </Typography>
          <hr/>
          <Grid container justifyContent="flex-end" sx={{marginY:1.7}}>
          <Typography align="right" variant='a' color='#3D3B8C' component={Link} to={`/expediente/${row.idexpediente}`} sx={{
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
          </Container>
      )
    }})}
    {data && count==0 && (
          <Container className='fade-in-expedienteN' sx={{marginY: 1, padding: 2, border: 1, borderColor: 'gray', borderRadius:'0.5em'}}> 
          <Typography variant='h6' color='#2d2c68' sx={{paddingY:1, fontWeight: 'bold', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                Nadie te ha compartido su expediente aún
            </Typography>
            </Container>

    )}
    
    </>
  )
}