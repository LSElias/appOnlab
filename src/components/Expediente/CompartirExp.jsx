import * as React from 'react'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import { useCallApi } from '../../hooks/useCallApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Container } from '@mui/system'
import { FormHelperText, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import SearchIcon from "@mui/icons-material/Search";
import { SearchUsuario } from '../SelectUsuario'

export function CompartirForm () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const [values, setValues] = useState(null)
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  
  const today = new Date();
  today.setHours(0, 0, 0, 0)


  const ExpedienteSchema=yup.object({
    usuario: yup.string().required('Debe de seleccionar un usuario')
  })
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
  useForm({
    // Valores iniciales
    defaultValues:{
        usuario:''
    },
    values,
    resolver: yupResolver(ExpedienteSchema)
  })  
    
  
  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la pelicula a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `Expediente/getbyid/${userData.id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'Expediente/createPermisos/', action, formData, start })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
        DataForm.idexpediente = data[0].idexpediente
        DataForm.permiso = 1;
      //console.log(DataForm)
      setData(DataForm);
      setStart(true);
    } catch (e) {
      setStart(false);
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
      return navigate('/Expedientes/')
    }
  },[responseData,data])

  

  return (
    <>
    <Header/>
    <Container sx={{ mt: 5, mb: 1, marginRight: '5vh', marginLeft:0,  }}>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography component='h1' variant='h5' gutterBottom>
              Compartir Expediente
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' sx={{ marginY: 1 }}>
              <Controller
                    name='usuario'
                    control={control}
                    render={({ field }) => (
                    <SearchUsuario
                    field={field}
                    iduser={userData.id}
                    idexp={data?.idexpediente}
                    filtro={'All'}
                    error={Boolean(errors.categoria)}
                    onChange={(e)=>setValue('usuario',e.target.value ,{shouldValidate:true})}
                  />
                )}
               />
            <FormHelperText sx={{ color: '#d32f2f' }}>{errors.usuario ? errors.usuario.message : ''}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1, mb: 5 }}>Guardar</Button>
          </Grid>
        </Grid>
      </form>
      </Container>
    <Footer/>
    </>
  )
}
