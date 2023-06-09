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
import AddIcon from '@mui/icons-material/Add'
import { AlergiasExp } from './AlergiasExp'
import { EnfermedadExp } from './EnfermedadExp'
import { MedicamentoExp } from './MedicamentosExp'
import { CirugiaExp } from './CirugiasExp'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export function ExpedienteForm () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const id = routeParams.id
  const esCrear = !id
  const [values, setValues] = useState(null)
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  
  const today = new Date();
  today.setHours(0, 0, 0, 0)


  const ExpedienteSchema=yup.object({
    nacimiento: yup.date().typeError('Debe de ingresar una fecha.').required('Ingrese la fecha de nacimiento').max(today, 'La fecha no puede estar en el futuro'),
    genero: yup.string().required('Seleccione su género'),
    sangre: yup.string().required('Seleccione su tipo de sangre'),
    residencia: yup.string().required('Debe introducir su lugar de residencia').min(10,'Debe al menos tener 10 cáracteres'),
    telefono: yup.number()
    .typeError('Solo acepta números')
    .required('Su número de telefono de preferencia es requerido')
    .positive('Solo acepta números positivos').min(8,'El numero debe de tener 8 dígitos mínimo'),
    emergencia: yup.number()
    .typeError('Solo acepta números')
    .required('Su número de emergencia es requerido')
    .positive('Solo acepta números positivos'),
    alergias: yup.array().typeError('Seleccione una alergia'),
    medicamentos: yup.array().typeError('Seleccione un medicamento'),
    enfermedades: yup.array().typeError('Seleccione una enfermedad'),
    cirugias: yup.array().typeError('Digite los datos de sus cirugías'),
  })
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        idusuario: userData.id,
        nacimiento:'',
        genero:'',
        sangre:'',
        residencia:'',
        telefono: '',
        emergencia: '',
        permiso: [[1]],
        alergias:[{
          idalergia: '',
          reaccion:'',
          observaciones: ''
        }],
        medicamentos: [{
          idmedicamento: '',
          dosis: ''
        }],
        enfermedades:[{
          idenfermedad: '',
          observaciones: ''
        }],
        cirugias:[{
          nombre: '',
          descripcion: '',
          lugar:''
        }
        ]
      },
      values,
      resolver: yupResolver(ExpedienteSchema)
    })  
    


    // Alergias
    const { fields: aFields, append: aAppend,remove: aRemove  } =  useFieldArray({control, name:'alergias'})
      const removeAlergia = (index) => {
        if (aFields.length === 1) {
          return
        }
        aRemove(index)
      }
      const addNewAlergia = () => {
        aAppend({
          idalergia: '',
          reaccion: '',
          observaciones: '',
        })
      }

    const { fields: eFields, append: eAppend,remove: eRemove  } =  useFieldArray({control, name:'enfermedades'})
    const removeEnfermedad = (index) => {
      if (eFields.length === 1) {
        return
      }
      eRemove(index)
    }
    const addNewEnfermedad = () => {
      eAppend({
        id_enfermedad: '',
        observaciones: '',
      })
    }

    const { fields: mFields, append: mAppend,remove: mRemove  } =  useFieldArray({control, name:'medicamentos'})
    const removeM = (index) => {
      if (mFields.length === 1) {
        return
      }
      mRemove(index)
    }
    const addNewM = () => {
      mAppend({
        id_medicamento: '',
        dosis: '',
      })
    }

    const { fields: cFields, append: cAppend,remove: cRemove  } =  useFieldArray({control, name:'cirugias'})
    const removeC = (index) => {
      if (cFields.length === 1) {
        return
      }
      cRemove(index)
    }
    const addNewC = () => {
      cAppend({
        nombre: '',
        descripción: '',
        lugar: '',
      })
    }   


  
  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la pelicula a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `Expediente/getFull/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'Expediente/', action, formData, start })
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
    if(!esCrear && data!=null && data!="No hay registros" && data?.usuario.id != userData.id){
      return navigate('/unauthorized/')
    }
    if(responseData!= null){
      return navigate('/Expedientes/')
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography component='h1' variant='h5' gutterBottom>
              {esCrear ? 'Crear' : 'Modificar'} Expediente
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' sx={{ marginY: 1 }}>
              <Controller
                name='nacimiento'
                control={control}
                render={({ field })=>(
                <TextField
                 { ... field}
                id="nacimiento"
                label="Fecha de Nacimiento"
                type="date"
                error={Boolean(errors.nacimiento)}
                helperText={errors.nacimiento ? errors.nacimiento.message : ''}
                InputLabelProps={{
                shrink: true,
                }}/>
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl variant='standard' fullWidth  sx={{ mY: 1, }}>
            <InputLabel id='genero'>Género </InputLabel>            
            <Controller
                name='genero'
                control={control}
                render={({ field })=>(
                  
                    <Select
                    {...field}
                    labelId='genero'
                    label='Genero'
                  >
                      <MenuItem key={0} value={'M'}> Hombre </MenuItem>
                      <MenuItem key={1} value={'F'}> Mujer </MenuItem>
                      <MenuItem key={2} value={'N'}> Otro </MenuItem>               
                  </Select>
                )}                
               />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.genero ? errors.genero.message : ''}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl variant='standard' fullWidth  sx={{ mY: 1, }}>
            <InputLabel  id='sangre'>Sangre </InputLabel>            
            <Controller
                name='sangre'
                control={control}
                render={({ field })=>(
                  
                    <Select
                    {...field}
                    labelId='sangre'
                    label='Sangre'
                  >
                      <MenuItem key={0} value={'A+'}> Sangre A+ </MenuItem>
                      <MenuItem key={1} value={'A-'}> Sangre A- </MenuItem>
                      <MenuItem key={3} value={'B+'}> Sangre B+ </MenuItem>
                      <MenuItem key={4} value={'B-'}> Sangre B- </MenuItem>               
                      <MenuItem key={5} value={'AB+'}> Sangre AB+ </MenuItem>               
                      <MenuItem key={6} value={'AB-'}> Sangre AB- </MenuItem>               
                      <MenuItem key={7} value={'O+'}> Sangre O+ </MenuItem>               
                      <MenuItem key={8} value={'O-'}> Sangre O- </MenuItem>               
                  </Select>
                )}                
               />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.sangre ? errors.sangre.message : ''}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth >
              <Controller
                name='residencia'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='residencia'
                    label='Lugar de residencia'
                    error={Boolean(errors.residencia)}
                    helperText={errors.residencia ? errors.residencia.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth >
              <Controller
                name='telefono'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='telefono'
                    label='Teléfono de preferencia'
                    error={Boolean(errors.telefono)}
                    helperText={errors.telefono ? errors.telefono.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth >
              <Controller
                name='emergencia'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='emergencia'
                    label='Teléfono de emergencia'
                    error={Boolean(errors.emergencia)}
                    helperText={errors.emergencia ? errors.emergencia.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h6' gutterBottom>
                Alergías
                <Tooltip title='Agregar Alergia'>
                    <IconButton
                      color='secondary'
                      onClick={addNewAlergia}
                    >
                      <AddIcon />
                    </IconButton>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              {aFields.map((field, index) => (
                <AlergiasExp
                  key={index}
                  index={index}
                  onRemove={removeAlergia}
                  field={field}
                  control={control}
                  onChange={(e) => setValue('alergias', e.target.value, { shouldValidate: true })}
                  disableRemoveButton={aFields.length === 1}
                />
              ))}
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.alergias ? errors.alergias.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h6' gutterBottom>
                Enfermedades
                <Tooltip title='Agregar Enfermedad'>
                    <IconButton
                      color='secondary'
                      onClick={addNewEnfermedad}
                    >
                      <AddIcon />
                    </IconButton>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              {eFields.map((field, index) => (
                <EnfermedadExp
                  key={index}
                  index={index}
                  onRemove={removeEnfermedad}
                  field={field}
                  control={control}
                  onChange={(e) => setValue('enfermedades', e.target.value, { shouldValidate: true })}
                  disableRemoveButton={eFields.length === 1}
                />
              ))}
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.enfermedades ? errors.enfermedades.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h6' gutterBottom>
                Medicamentos
                <Tooltip title='Agregar Medicamento'>
                    <IconButton
                      color='secondary'
                      onClick={addNewM}
                    >
                      <AddIcon />
                    </IconButton>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              {mFields.map((field, index) => (
                <MedicamentoExp
                  key={index}
                  index={index}
                  onRemove={removeM}
                  field={field}
                  control={control}
                  onChange={(e) => setValue('medicamentos', e.target.value, { shouldValidate: true })}
                  disableRemoveButton={mFields.length === 1}
                />
              ))}
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.medicamentos ? errors.medicamentos.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h6' gutterBottom>
                Cirugías
                <Tooltip title='Agregar Cirugia'>
                    <IconButton
                      color='secondary'
                      onClick={addNewC}
                    >
                      <AddIcon />
                    </IconButton>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor */}
              {cFields.map((field, index) => (
                <CirugiaExp
                  key={index}
                  index={index}
                  onRemove={removeC}
                  field={field}
                  control={control}
                  onChange={(e) => setValue('cirugias', e.target.value, { shouldValidate: true })}
                  disableRemoveButton={cFields.length === 1}
                />
              ))}
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.cirugias ? errors.cirugias.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
           
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
