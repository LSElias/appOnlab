import React, {useState} from "react";
import Container from '@mui/material/Container'
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Button, FormControl, FormHelperText, FormLabel, Grid, Input, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller, useFieldArray} from 'react-hook-form'
import { useCallApi } from '../hooks/useCallApi'
import { useSubmitForm } from '../hooks/useSubmitForm'
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Header } from "./Header";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export function PreferenciasContrasena () {
    const navigate = useNavigate()
    const routeParams = useParams()
    const {user, decodeToken, autorize } =useContext(UserContext)
    const [userData, setUserData]=useState(decodeToken())

    const id = userData.id
    const esCrear = !id
    const [values, setValues] = useState(null)
    const loginSchema=yup.object({
        contrasena: yup.string()
        .required('Es requerido que ingrese su contraseña.')
        .min(8,'La contraseña debe de tener 8 dígitos')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"La contraseña debe contener 8 carácteres, una o más mayúscula, una o más minúsculas, un número y un carácter especial")
        ,
        passwordConfirmation: yup.string()
        .required('Es requerido que re-ingrese su contraseña.')
        .oneOf([yup.ref('contrasena'), null], 'Contraseña debe coincidir'),
      })
  
      const {control, handleSubmit, setValue, formState:{errors}}=
      useForm({
        defaultValues:{
          id:`/${id}`,
          nombre:'',
          apellido1:'',
          apellido2:'',
          email:'',
          contrasena:'',
          passwordConfirmation: '',
          tipousuario: '',
          estado: ''
        },
        values,
        resolver: yupResolver(loginSchema)
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
    const { data, error, loaded } = useCallApi({ endpoint: `usuario/${id}` })
    // Obtener la respuesta de la solicitud de crear o actualizar en el API
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: `usuario/cambiarContrasena/${id}`, action, formData, start })
    // Accion submit
    const onSubmit = (DataForm) => {
        try {
        //  console.log(DataForm)
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
      if(responseData!= null && responseData !="Usuario no valido" && responseData!="Ya existe una cuenta con este correo.") {
        toast.success(esCrear ? "Registro realizado correcto" : 'Actualización realizada correctamente.', {
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
        return navigate('/preferencias')
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
          }else{
            if(responseData == "Ya existe una cuenta con este correo."){
              toast.error('Este correo ya tiene una cuenta asignada. Por favor inicie sesión.', {
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
        <Grid container spacing={2} sx={{m:1}}>
            <Grid item xs={8}>
            <FormControl variant='standard' fullWidth sx={{ mb: 0 }}>
            <Controller 
                    name='contrasena'
                    control={control}
                    render={({field})=>(
                      <TextField
                        {... field}                    
                        id='contrasena'
                        label='Contraseña'
                        type='password'
                        error={Boolean(errors.contrasena)}
                        helperText={errors.contrasena ? errors.contrasena.message : ''}            
                      />                  
                    )}
                  />  
            </FormControl>
            </Grid>
            <Grid item xs={8}>
            <FormControl variant='standard' fullWidth sx={{ mb: 0 }}>
                <Controller 
                        name='passwordConfirmation'
                        control={control}
                        render={({field})=>(
                          <TextField
                            {... field}                    
                            id='passwordConfirmation'
                            label='Confirmar contraseña'
                            type='password'
                            error={Boolean(errors.passwordConfirmation)}
                            helperText={errors.passwordConfirmation ? errors.passwordConfirmation.message : ''}            
                          />                  
                        )}
                      />  
                </FormControl>
            </Grid>
        </Grid> 
        <Grid item xs={10} sm={10} sx={{m:2}}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Guardar</Button>
        </Grid>
        </Grid>
      </form>
      </Container>
    </>
  )
}