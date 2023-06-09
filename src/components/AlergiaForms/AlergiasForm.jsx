import * as React from 'react'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import { useCallApi } from '../../hooks/useCallApi'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectCategoria } from '../SelectCategoria'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Container } from '@mui/system'
import { toast } from 'react-hot-toast'

export function AlergiasForm () {
  const navigate = useNavigate()
  const routeParams = useParams()
  
  const id = routeParams.id
  const esCrear = !id
  const [values, setValues] = useState(null)
  const alergiaSchema=yup.object({
    nombre: yup.string().required('Ingrese el nombre de la alergia')
    .min(5, 'El nombre debe tener 5 caracteres'),
    descripcion: yup.string().required('Ingrese el nombre de la alergia')
    .min(10, 'El nombre debe tener 10 caracteres'),
    

  })
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        nombre:'',
        descripcion:'',
        categoria:''
      },
      values,
      resolver: yupResolver(alergiaSchema)
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
  const { data, error, loaded } = useCallApi({ endpoint: `alergia/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'alergia/', action, formData, start })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      if(!esCrear){
      DataForm.id = routeParams.id;
      }
      console.log(DataForm)
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
      if(responseData!= null && responseData !="No se realizo el registro") {
        toast.success(esCrear ? "Alergia creada correctamente" : 'Actualización realizada correctamente.', {
          style: {
            border: '1px solid #469DEC',
            padding: '16px',
            fontWeight: 700,
            color: '#000159',
            fontFamily: 'sans-serif',
          },
          iconTheme: {
            primary: '#1884E7',
            secondary: 'white',
          },
        });
        return navigate('/alergias')
      }else{      
        setStart(false);
        if(responseData == "Usuario no valido"){
          toast.error('Se ha ingresado un dato erroneo. Intente otra vez.', {
            style: {
              border: '1px solid #5A00FF',
              padding: '16px',
              fontWeight: 700,
              color: '#000159',
              fontFamily: 'sans-serif',
            },
            iconTheme: {
              primary: '#7B33FF',
              secondary: 'white',
            },
          });
        }
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
              {esCrear ? 'Crear' : 'Modificar'} Alergia
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='nombre'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='nombre'
                    label='Nombre'
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='descripcion'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='descripcion'
                    label='Descripción'
                    error={Boolean(errors.descripcion)}
                    helperText={errors.descripcion ? errors.descripcion.message : ''}
                  />
                )}
               />
                  
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>

            <Controller
                name='categoria'
                control={control}
                defaultValue = ''
                render={({ field })=>(
                  <SelectCategoria 
                     field={field}
                     error={Boolean(errors.categoria)}
                     onChange={(e)=>setValue('categoria',e.target.value ,{shouldValidate:true})}
                     />
                )}
               />  

              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.categoria ? errors.categoria.message : ''}</FormHelperText>
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
