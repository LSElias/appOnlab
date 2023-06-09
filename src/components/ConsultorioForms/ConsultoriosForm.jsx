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
import { FormHelperText } from '@mui/material'
import { SelectEspecialidad } from '../SelectEspecialidad'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export function ConsultorioForm () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  
  const id = routeParams.id
  const esCrear = !id
  const [values, setValues] = useState(null)
  const consultorioSchema=yup.object({
    consultorio: yup.string().required('Ingrese el nombre del consultorio')
    .min(5, 'El nombre debe tener 5 o más caracteres'),
    especialidad: yup.string().required('Seleccione cual será su especialidad en el consultorio.'),
    direccion: yup.string().required('Ingrese la dirección del consultorio')
    .min(10, 'Debe tener 10 o más caracteres'),
    valor: yup.number().required('Ingrese el valor de la consulta.')
    .min(3, 'Debe tener 3 o más caracteres'),
  })
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        idusuario: userData.id,
        consultorio:'',
        especialidad:'',
        direccion:'',
        valor:'',
      },
      values,
      resolver: yupResolver(consultorioSchema)
    })
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
    //multiple useFieldArray
    const { fields, append, prepend, remove, swap, insert } =  useFieldArray({
      control, //control props proviene de useForm
    })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la pelicula a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `consultorio/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'consultorio/', action, formData, start })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      //console.log(DataForm)
      setData(DataForm);
      setStart(true);
      if(esCrear){
        setAction('POST')
      }else{
        setAction('PUT')
      }
    } catch (e) {
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
    if(!esCrear && data!=null && data!="No hay registros" && data.idUsuario != userData.id){
      return navigate('/unauthorized/')
    }
    if(responseData!= null){
      return navigate('/consultorios')
    }    
    if(!esCrear && data){
      setValues(data)
    }
  },[responseData,data,esCrear])

  return (
    <>
    <Header/>
    <Container sx={{ mt: 5, mb: 1, marginRight: '5vh', marginLeft:0,  }}>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid >
          <Grid item xs={8} sm={8}>
            <Typography component='h1' variant='h5' gutterBottom>
              {esCrear ? 'Crear' : 'Modificar'} Usuario
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='consultorio'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='consultorio'
                    label='Consultorio'
                    error={Boolean(errors.consultorio)}
                    helperText={errors.consultorio ? errors.consultorio.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
              name='especialidad'
              control={control}
              defaultValue = ''
              render={({ field })=>(
                <SelectEspecialidad 
                  field={field}
                  error={Boolean(errors.especialidad)}
                  onChange={(e)=>setValue('especialidad',e.target.value ,{shouldValidate:true})}
                />
               )}
            />  
          <FormHelperText sx={{ color: '#d32f2f' }}>{errors.categoria ? errors.categoria.message : ''}</FormHelperText>
          </FormControl>
          </Grid>
          <Grid item xs={4} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='direccion'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='direccion'
                    label='Dirección'
                    error={Boolean(errors.direccion)}
                    helperText={errors.direccion ? errors.direccion.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='valor'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='valor'
                    label='Costo'
                    error={Boolean(errors.consultorio)}
                    helperText={errors.consultorio ? errors.consultorio.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
          </Grid>
          <Grid item xs={10} sm={10}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Guardar</Button>
          </Grid>
        </Grid>
      </form>
      </Container>
    <Footer/>
    </>
  )
}
