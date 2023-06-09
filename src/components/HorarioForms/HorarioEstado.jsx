import * as React from 'react'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm' 
import { useCallApi, useCallApiT } from '../../hooks/useCallApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../Header'
import { Container } from '@mui/system'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'

export function HorarioEstado () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const id = routeParams.id
  const { data, error, loaded } = useCallApi({ endpoint: `Horario/getFull/${id}` })


  //---------------------------------
  const esCrear = !id
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
    })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('PUT')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: `cita/updateState/${id}`, action, formData, start })
  // Accion submit

    const volverAgenda = () =>{
      return navigate('/agendar/')
    }
  
  const onSubmit = (DataForm) => {
    try {
        DataForm.estadoHorario = (data.estado ? '0':'1')
        DataForm.mensaje= { }
      setData(DataForm);
      setStart(true);
    } catch (e) {
    //  console.log(e)
    }
  }
  const onError = (errors, e) => console.log(errors, e)

  //useEffect responseData, data, esCrear, action
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(()=>{ 


    if(responseData!= null){
      return navigate('/ver/citas')
    }    
  },[responseData,data,esCrear])




  return (
    <>
    <Header/>
    <Container sx={{ mt: 3, mb: 1, marginRight: '5vh', marginLeft:0,  }}>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid container >
          <Grid item xs={8} sm={8}>
            <Typography component='h1' variant='h5' gutterBottom>
                Confirmación Cambio de Estado
            </Typography>
          </Grid>
          {data && data!=null && (
          <Grid item xs={12} sm={12} justifyContent={'space-evenly'}>
            <Typography  variant='body1' >
                Al darle click a confirmar usted esta aceptando cambiar el estado en el que se encuentra este horario. Si este Horario 
                está en uso, se actualizará el estado de la cita en la que se encuentre ocupado y sé le informará al paciente que ha sido 
                cancelada. 
                <br/>
            </Typography>
          </Grid>
          )}
          <Grid item xs={5} sm={12}>
          <FormControl variant='standard' sx={{ m: 1, width:'9em' }}>
            
          <FormHelperText sx={{ color: '#d32f2f' }}>{errors.hora ? errors.hora.message : ''}</FormHelperText>
            </FormControl>
          </Grid>
        <Grid container >
          </Grid>
          <Grid item xs={6} sm={5}>
            <Button type='submit' variant='contained' color='primary' sx={{ m: 1 }}>Confirmar Cita</Button>
          </Grid>
          <Grid item xs={6} sm={5}>
            <Button type='button' variant='contained' color='secondary' onClick={volverAgenda} sx={{ m: 1 }}>Regresar a Agenda</Button>
         </Grid>
        </Grid>
      </form>
      </Container>
    </>
  )
}
