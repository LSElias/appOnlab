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
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'



export function HorarioDetail () {
  const routeParams = useParams()
  const navigate = useNavigate()
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())

  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      estado:'',
      mensaje:'',
      idcita:'',
      idHorario:''
    })

  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint:`Citas/getFull/${routeParams.id}` })

  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: `citas/updateState/${routeParams.id}`, action, formData, start })
  // Accion submit
  
  const volver = () => {
    return navigate('/citas/')
  }

  const onSubmit = (DataForm) => {
    try {
        DataForm.ocupado = ('0')
        DataForm.mensaje= 'Cancelado';
        DataForm.id= routeParams.id;
        DataForm.idHorario = data.horario.idHorario;
      setAction('PUT')
     // console.log(DataForm)
      setData(DataForm);
      setStart(true);
    } catch (e) {
     // console.log(e)
    }
  }

  useEffect(()=>{ 
    if(data!=null && data!="No hay registros" && data.consultorio.idUsuario != userData.id){
      return navigate('/unauthorized/')
    }
    if(responseData!= null){
      return navigate('/citas/')
    }    
  },[responseData,data])

  const onError = (errors, e) => console.log(errors, e)


  return (   
    <>
     {!loaded && 
    
     <Loader/>}
     {data && data!=null &&
        <>
        <Header/>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate> 
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
                <Grid item  sm={7} xs={1}>
                </Grid>
                <Grid item  xs={1}>
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
            <Box fontWeight='bold' display='inline'>Fecha:</Box> {data.dia}
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
            <Grid container padding={2}>
              <Grid>
            <Button type='button' sx={{fontWeight:800}} onClick={volver} color='primary'>
                Volver a Horarios
              </Button>
              </Grid>
              <Grid>
              <Button type='submit' sx={{fontWeight:800}} color='error'>
                Cancelar cita
              </Button>
              </Grid>
            </Grid>
          </Grid>
          </form>
        </>
        }
    </>
  )
}
