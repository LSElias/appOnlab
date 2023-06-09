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
import { useSubmitForm } from '../hooks/useSubmitForm' 
import { useCallApi, useCallApiT } from '../hooks/useCallApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from './Header'
import { Container } from '@mui/system'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'







export function CitaForm () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const id = routeParams.id
  const { data, error, loaded } = useCallApi({ endpoint: `Horario/getFull/${id}` })
  const [diaNumero, setDia] = useState('')
  var result = "";

  const getNextDay = (dia) => { 
    var diaHoy = new Date(Date.now());
    const diaNumeral = new Date(diaHoy.getTime());
    var numba = 0;
    switch(dia){
      case "Lunes":
        numba= 1;
        break;
      case "Martes":
        numba= 2;
        break;
      case "Miercoles":
        numba= 3;
        break;
      case "Jueves":
        numba= 4;
       break;
      case "Viernes":
        numba= 5;
        break;
      case "Sabado":
        numba= 6;
        break;
      }
     result = new Date(
      diaNumeral.setDate(diaNumeral.getDate() + ((7 - diaNumeral.getDay() + numba) % 7 || 7),
    ),
  );
  return result.toLocaleString('default', { day: '2-digit'}) + " de " + result.toLocaleString('defualt',{month: 'long'} );
  }

  const nextDayJson=(dia)=>{
    var diaHoy = new Date(Date.now());
    const diaNumeral = new Date(diaHoy.getTime());
    var numba = 0;
    switch(dia){
      case "Lunes":
        numba= 1;
        break;
      case "Martes":
        numba= 2;
        break;
      case "Miercoles":
        numba= 3;
        break;
      case "Jueves":
        numba= 4;
       break;
      case "Viernes":
        numba= 5;
        break;
      case "Sabado":
        numba= 6;
        break;
      }
     result = new Date(
      diaNumeral.setDate(diaNumeral.getDate() + ((7 - diaNumeral.getDay() + numba) % 7 || 7),
    ),
  );

  return result.toLocaleString('default', { year: 'numeric'}) + "/" + result.toLocaleString('defualt',{month: '2-digit'} ) + "/" + result.toLocaleString('defualt',{day: '2-digit'} )  ;
}
  

  


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
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'Citas', action, formData, start })
  // Accion submit

    const volverAgenda = () =>{
      return navigate('/agendar/')
    }
  
  const onSubmit = (DataForm) => {
    try {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear(); 

        DataForm.idpaciente = userData.id,
        DataForm.idHorario = id,
        DataForm.dia =  `${nextDayJson(data.dia)}`
        DataForm.estado =  "Agendado"
        DataForm.FechaRegistro =`${year}-${month}-${day}`
     //   console.log(DataForm)
      setData(DataForm);
       setStart(true);
    } catch (e) {
     // console.log(e)
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
                Confirmación de Cita
            </Typography>
          </Grid>
          {data && data!=null && (
          <Grid item xs={12} sm={12} justifyContent={'space-evenly'}>
            <Typography  variant='body1' >
                Al confirmar la cita, usted esta aceptando tener una sesión con el doctor {data.nombre} {data.apellido1} en el consultorio {data.Consultorio}, a la hora {data.hora} el siguiente {data.dia} {getNextDay(data.dia)} por un precio de {data.precio} colones.
                <br/>
                <br/>
                La cita será con la especialidad de {data.Especialidad} y tendrá resolución 30
                minutos después de haber empezado la sesión de acorde al horario.
                <br/>
                <br/>
                Si usted llegasé a ausentarse o a retrasarse, será marcado en el registro de la cita como forma de aseguración. También, si 
                el doctor lo viese necesario ante múltiple faltas de respeto y conducta, el funcionario puede terminar la cita preeliminar a la hora
                de finalización.
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
