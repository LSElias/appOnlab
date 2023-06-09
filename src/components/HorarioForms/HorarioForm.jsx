import * as React from 'react'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm' 
import { useCallApi, useCallApiT } from '../../hooks/useCallApi'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectCategoria } from './../SelectCategoria'
import { Header } from './../Header'
import { Container } from '@mui/system'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs'
import { SelectConsultorio } from './SelectConsultorio'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'


export function HorarioForm () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const { tdata, terror, tloaded } = useCallApiT({ endpoint: `Horario/getMedico/${userData.id}` })


  //---------------------------------
  const id = routeParams.id
  const esCrear = !id
  const [values, setValues] = useState(null)
  const HorarioSchema=yup.object({
    dia: yup.string().required('Debe seleccionar un día'),
    hora: yup.string().required('Debe seleccionar una hora'),
    idconsultorio: yup.string().required('Debe seleccionar un consultorio'),
  })
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        hora: '',
        idconsultorio:'',
        dia:'',
        idmedico: userData.id,
        ocupado:'0'
      },
      values,
      resolver: yupResolver(HorarioSchema)
    })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la pelicula a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `Horario/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'horario/', action, formData, start })
  // Accion submit



  const onSubmit = (DataForm) => {
    try {
      var fail = false;
      if(tdata !=null && tdata !="No hay registros"){
      tdata.forEach(element => {
        if(DataForm.dia==element.dia){
          if(DataForm.hora==element.hora){
            fail=true;
          }   
        }})
      }
      if(fail==true){
        toast.error('La hora que escogio ya fue registrada en un horario diferente. Por favor, seleccione otra hora', {
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
        return;
      }

    //  console.log(DataForm)
      setData(DataForm);
      setStart(true);
      if(esCrear){
       setAction('POST')
      }else{
       setAction('PUT')
      }

    } catch (e) {
      console.log(e)
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
   if(!esCrear && data!=null && data!="No hay registros" && data.idmedico != userData.id){
      return navigate('/unauthorized/')
    }

    if(responseData!= null){
      return navigate('/horario')
    }    
    if(!esCrear && data){
      setValues(data)
    }
  },[responseData,data,esCrear])


  return (
    <>
    <Header/>
    <Container sx={{ mt: 3, mb: 1, marginRight: '5vh', marginLeft:0,  }}>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid >
          <Grid item xs={8} sm={8}>
            <Typography component='h1' variant='h5' gutterBottom>
              {esCrear ? 'Crear' : 'Modificar'} Horario
            </Typography>
          </Grid>
          <Grid item xs={5} sm={12}>
          <FormControl variant='standard' sx={{ m: 1, width:'9em' }}>
            <InputLabel id='dia'> Día </InputLabel>
            <Controller
                name='dia'
                control={control}
                defaultValue = ''
                render={({ field })=>(

                  <Select
                    {...field}
                    labelId='dia'
                    label='Día'
                  >
                      <MenuItem key={0} value={'Lunes'}> Lunes </MenuItem>
                      <MenuItem key={1} value={'Martes'}> Martes </MenuItem>
                      <MenuItem key={2} value={'Miercoles'}> Miércoles </MenuItem>
                      <MenuItem key={3} value={'Jueves'}> Jueves </MenuItem>
                      <MenuItem key={4} value={'Viernes'}> Viernes </MenuItem>
                      <MenuItem key={5} value={'Sabado'}> Sabado </MenuItem>
                  </Select>
                )}
               />  
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.dia ? errors.dia.message : ''}</FormHelperText>
              </FormControl>
            <FormControl variant='standard' sx={{ m: 1, width:'9.8em' }}>
            <InputLabel id='dia'> Hora </InputLabel>
            <Controller
                name='hora'
                control={control}
                defaultValue = ''
                render={({ field })=>(
                  <Select
                    {...field}
                    labelId='hora'
                    label='Hora'
                    sx={{ paddingLeft:1}}
                  >
                      <MenuItem key={0} value={'09:00:00'}> 09:00 </MenuItem>
                      <MenuItem key={1} value={'09:30:00'}> 09:30 </MenuItem>
                      <MenuItem key={2} value={'10:00:00'}> 10:00 </MenuItem>
                      <MenuItem key={3} value={'10:30:00'}> 10:30 </MenuItem>
                      <MenuItem key={4} value={'11:00:00'}> 11:00 </MenuItem>
                      <MenuItem key={5} value={'11:30:00'}> 11:30 </MenuItem>
                      <MenuItem key={6} value={'12:00:00'}> 12:00 </MenuItem>
                      <MenuItem key={7} value={'12:30:00'}> 12:30 </MenuItem>
                      <MenuItem key={8} value={'13:00:00'}> 13:00 </MenuItem>
                      <MenuItem key={9} value={'13:30:00'}> 13:30 </MenuItem>
                      <MenuItem key={10} value={'14:00:00'}> 14:00 </MenuItem>
                      <MenuItem key={11} value={'14:30:00'}> 14:30 </MenuItem>
                      <MenuItem key={12} value={'15:00:00'}> 15:00 </MenuItem>
                      <MenuItem key={13} value={'15:30:00'}> 15:30 </MenuItem>
                      <MenuItem key={14} value={'16:00:00'}> 16:00 </MenuItem>
                      <MenuItem key={15} value={'16:30:00'}> 16:30 </MenuItem>
                      <MenuItem key={16} value={'17:00:00'}> 17:00 </MenuItem>
                      <MenuItem key={17} value={'17:30:00'}> 17:30 </MenuItem>
                      <MenuItem key={18} value={'18:00:00'}> 18:00 </MenuItem>
                      <MenuItem key={19} value={'18:30:00'}> 18:30 </MenuItem>
                      <MenuItem key={20} value={'19:00:00'}> 19:00 </MenuItem>
                      <MenuItem key={21} value={'19:30:00'}> 19:30 </MenuItem>
                  </Select>
                )}
               />  

              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.hora ? errors.hora.message : ''}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>
            <FormControl variant='standard' fullWidth sx={{ m: 1}}>
            <Controller
                name='idconsultorio'
                control={control}
                defaultValue = ''
                render={({ field } )=>(
                  <SelectConsultorio 
                     field={field}
                     id={userData.id}
                     error={Boolean(errors.idconsultorio)}
                     onChange={(e)=>setValue('idconsultorio',e.target.value ,{shouldValidate:true})}
                     />
                )}
               />  

              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.idconsultorio ? errors.idconsultorio.message : ''}</FormHelperText>
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
    </>
  )
}
