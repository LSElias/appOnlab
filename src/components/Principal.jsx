import React, { useContext, useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Button, Card, CardActions, CardContent, CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material'
import { appTheme } from '../themes/theme'
import Container from '@mui/material/Container'
import './css/principal.css'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useCallApi } from '../hooks/useCallApi'
import { Loader } from './Loader'
import { UserContext } from '../context/UserContext'
import { BorderAllOutlined } from '@mui/icons-material'
 

export function Principal () {
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const routeParams = useParams()
  const navigate = useNavigate();



  useEffect(()=>{
    setUserData(decodeToken())
  },[user])



  function daytime(){
    let hora = new Date();
    if(hora.getHours() > 5  && hora.getHours() <= 12){
      return "Buenos días";
    }else{
      if(hora.getHours() > 12 && hora.getHours() <= 18){
        return "Buenas tardes"
      }else{
        return " Buenas noches"
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  return (
      <>
      <Header />
          {!userData && 
          <>
         <Container component='main' sx={{ mt: '2em', mb: 1, marginRight: 'auto', marginLeft: 'auto' }}  maxWidth='lg'>
          
          <Typography variant='h5' component='h1' gutterBottom  sx={
            {
              fontWeight: "bold" ,
              fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
              letterSpacing: 2,
              wordSpacing: 1,
            }
              
            }>
              {daytime()}. ¿Qué desea hacer?
            </Typography>
            <Grid container rowSpacing={12} sx={{ py: '2em' }} >
              <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/login'}
              sx={{ 
                height: '13em',
                width:'12em',              
                color:'white',
                transition:'1s',
                backgroundImage: "linear-gradient(180deg, #ee9439, #ffcb6a)",
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                px:'1em',
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #de5c1b, #e8a854)",
                cursor:'pointer'
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>

                  Inicie 
                  Sesión
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5.4} md={2.3} >
              <Button component={Link} to={'/registro'}
              sx={{ 
                height: '13em',
                width:'12em',            
                color:'white',
                backgroundImage: "linear-gradient(180deg, #349a3b, #bcff62)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                px:'1em',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #18772e, #9ef059)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>

                  Regís 
                  Trate
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/ver/alergias'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a9489, #4deccd)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #0b777d, #44dad3)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>

                  Aler
                  Gias
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'ver/enfermedades'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',         
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a1494, #4d88ec)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #12045e, #386cd1)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>

                  Enfer
                  medad
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'ver/medicamentos'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',         
                color:'white',
                backgroundImage: "linear-gradient(180deg, #300579, #765bff)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #2b0357, #6d38d6)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    Medi
                    cación
                  </Typography>
                </Button>
            </Grid>
          </Grid>
          </Container>
          </>
          }
         <Container component='main' sx={{ mt: 5, mb: 1, marginRight: 'auto', marginLeft: 'auto' }} maxWidth='lg'>
          {userData && 
            
            <Typography variant='h4' component='h1' gutterBottom  sx={
            {
              fontWeight: "bold" ,
              fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
              letterSpacing: 0,
              wordSpacing: 3,
              fontSize: '1.6em',
              lineHeight: '1.8em' 
            }
              
            }>
            
            {daytime()}, {userData.nombre}. ¿Qué desea hacer hoy?
            </Typography>
            }
            { userData && userData.tipousuario==3 && (
             <Grid container spacing={12} sx={{ py: '2em' }} >
              <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/Expedientes'}
              sx={{ 
                height: '13em',
                width:'12em',              
                color:'white',
                transition:'1s',
                backgroundImage: "linear-gradient(180deg, #ee9439, #ffcb6a)",
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                px:'1em',
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #de5c1b, #e8a854)",
                cursor:'pointer'
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>

                    EXPE
                    DIEN
                    TES
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/Agendar'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a9489, #4deccd)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #0b777d, #44dad3)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                  AGEN
                  DAR
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/ver/citas'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',         
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a1494, #4d88ec)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #12045e, #386cd1)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    VER
                    CITAS
                  </Typography>
                </Button>
            </Grid>
          </Grid>
            
          )} 
            { userData && userData.tipousuario==2 && (
             <Grid container spacing={12} sx={{ py: '2em' }} >
              <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/Expedientes'}
              sx={{ 
                height: '13em',
                width:'12em',              
                color:'white',
                transition:'1s',
                backgroundImage: "linear-gradient(180deg, #ee9439, #ffcb6a)",
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                px:'1em',
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #de5c1b, #e8a854)",
                cursor:'pointer'
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>

                    EXPE
                    DIEN
                    TES
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5.4} md={2.3} >
              <Button component={Link} to={'/consultorios'}
              sx={{ 
                height: '13em',
                width:'12em',            
                color:'white',
                backgroundImage: "linear-gradient(180deg, #349a3b, #bcff62)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                px:'1em',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #18772e, #9ef059)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    CON
                    SULTO
                    RIOS
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/Horario'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a9489, #4deccd)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #0b777d, #44dad3)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                  HORA
                  RIOS
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={5} md={2.3} >
              <Button component={Link} to={'/Citas'}
              sx={{ 
                height: '13em',
                width:'12em',      
                px:'1em',         
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a1494, #4d88ec)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #12045e, #386cd1)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    VER
                    CITAS
                  </Typography>
                </Button>
            </Grid>
          </Grid>
            
          )} 
          { userData && userData.tipousuario==1 && (
             <>
             <Grid container textAlign={'center'} spacing={12} sx={{ py: '2em' }} >
              <Grid item xs={12} md={6} >
              <Button component={Link} to={'/usuario/create'}
              sx={{ 
                height: '13em',
                width:'25em',              
                color:'white',
                transition:'1s',
                backgroundImage: "linear-gradient(180deg, #ee9439, #ffcb6a)",
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                px:'1em',
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #de5c1b, #e8a854)",
                cursor:'pointer'
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    registro <br/>
                    Usuarios
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={12} md={6} >
              <Button component={Link} to={'/alergias'}
              sx={{ 
                height: '13em',
                width:'25em',            
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a9489, #4deccd)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                px:'1em',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #0b777d, #44dad3)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    Mantenimiento <br/>
                    Alergias
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={12} md={6} >
              <Button component={Link} to={'/enfermedades'}
              sx={{ 
                height: '13em',
                width:'25em',            
                color:'white',
                backgroundImage: "linear-gradient(180deg, #0a1494, #4d88ec)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                px:'1em',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #12045e, #386cd1)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    Mantenimiento <br/>
                    Enfermedades
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={12} md={6} >
              <Button component={Link} to={'/medicamentos'}
              sx={{ 
                height: '13em',
                width:'25em',            
                color:'white',
                backgroundImage: "linear-gradient(180deg, #300579, #765bff)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                px:'1em',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #2b0357, #6d38d6)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    Mantenimiento <br/>
                    Medicamentos
                  </Typography>
                </Button>
            </Grid>
            <Grid item xs={12} md={6} >
              <Button component={Link} to={'/usuario'}
              sx={{ 
                height: '13em',
                width:'25em',            
                color:'white',
                backgroundImage: "linear-gradient(180deg, #9a1650, #e63cb1)",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                transition:'1s',
                px:'1em',
                boxShadow: '#4b5a8b 0px 5px 15px ', 
                "&:hover": {
                backgroundImage: "linear-gradient(180deg, #9a163c, #d6278f)",
                cursor:'pointer',
                }}}>
                <Typography
                  sx={{
                    fontWeight:900,
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontSize: '2em',
                    letterSpacing: 4,
                    textShadow: 'black 0px 0px 1px', 
                    
                  }}>
                    Mantenimiento <br/>
                    Usuarios
                  </Typography>
                </Button>
            </Grid>
          </Grid>
          </>
          )} 
          </Container>
      </>    
  )
}
