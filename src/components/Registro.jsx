import React, {useState} from "react";
import Container from '@mui/material/Container'
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Button, FormControl, FormHelperText, FormLabel, Grid, Input, InputLabel, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form'
import { useCallApi } from '../hooks/useCallApi'
import { useSubmitForm } from '../hooks/useSubmitForm'
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


export function Registro () {
  const [email, setEmail] = useState('LOGIN');
  const [pass, setPass] = useState('LOGIN');
  const navigate = useNavigate();
  const routeParams = useParams()
const [values, setValues] = useState(null)
  


  const loginSchema=yup.object({
    nombre: yup.string()
      .required('Es requerido que ingrese su nombre')
      .min(2,'Es requerido que al menos tenga 2 carácteres.'),
      apellido1: yup.string()
      .required('Es requerido que ingrese su primer apellido')
      .min(2,'Es requerido que al menos tenga 2 carácteres.'),
      apellido2: yup.string()
      .required('Es requerido que ingrese su segundo apellido')
      .min(2,'Es requerido que al menos tenga 2 carácteres.'),
      email: yup.string()
        .required('Es requerido que ingrese su correo.')
        .min(10, 'El correo debe tener un mínimo de 10 carácteres' )
        .email('Debe ser en formato de correo.'),
      contrasena: yup.string()
        .required('Es requerido que ingrese su contraseña.')
        .min(8,'La contraseña debe de tener 8 dígitos')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"La contraseña debe contener 8 carácteres, una o más mayúscula, una o más minúsculas, un número y un carácter especial")
      ,
      passwordConfirmation: yup.string()
      .required('Es requerido que re-ingrese su contraseña.')
      .oneOf([yup.ref('contrasena'), null], 'Contraseña debe coincidir')
    })

    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      defaultValues:{
        nombre:'',
        apellido1:'',
        apellido2:'',
        email:'',
        tipousuario:'3',
        contrasena:'',
        passwordConfirmation:'',
        estado:'0'
      },
      resolver: yupResolver(loginSchema)
    })

  const [formData, setData] = useState(null)
  //Accion POST o PUT
  const [action, setAction] = useState('POST')
  //Boolean indica el submit
  const [start, setStart] = useState(false)
    
  //Enviar los valores al API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'Usuario', action, formData, start })
  //Submit del formulario
  const onSubmit = (formData) => {
      
      try {
       // console.log(formData)
        setData(formData)
        setStart(true)
        
        } catch (e) {
          console.log(e)
          setStart(false);

      }
  }

  useEffect(() => {
    if (responseData != null && responseData !="Usuario no valido" && responseData!="Ya existe una cuenta con este correo.") {
      toast.success('Registro correcto', {
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
      return navigate('/login')
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
          return navigate('/login')

        }
      }
    }
  }, [responseData])


  return (
    <>
      <div className="bg">
        <div className="logReg">
          <h1> Formulario de Registro </h1> 
            <Container maxWidth='xl' style={{  }}>
            <form  onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={1}>
               <Grid item xs={4} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ mb: 1 }}>
              <Controller 
                  name='nombre'
                  control={control}
                  render={({field})=>(
                    <TextField
                    {... field}                                        
                      id='nombre'
                      label='Nombre'
                      error={Boolean(errors.nombre)}
                      helperText={errors.nombre ? errors.nombre.message : ''}            

                    />                  
                  )}
                />  
            </FormControl> 
              </Grid>
              <Grid item xs={4} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ mb: 1 }}>
              <Controller 
                  name='apellido1'
                  control={control}
                  render={({field})=>(
                    <TextField
                    {... field}                                        
                      id='apellido1'
                      label='Primer Apellido'
                      error={Boolean(errors.apellido1)}
                      helperText={errors.apellido1 ? errors.apellido1.message : ''}            

                    />                  
                  )}
                />  
            </FormControl> 
              </Grid>
              <Grid item xs={4} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ mb: 1 }}>
              <Controller 
                  name='apellido2'
                  control={control}
                  render={({field})=>(
                    <TextField
                    {... field}                                        
                      id='apellido2'
                      label='Segundo Apellido'
                      error={Boolean(errors.apellido2)}
                      helperText={errors.apellido2 ? errors.apellido2.message : ''}            

                    />                  
                  )}
                />  
            </FormControl> 
              </Grid>
            </Grid>
            <FormControl variant='standard' fullWidth sx={{ mb: 1 }}>
            <Controller 
                    name='email'
                    control={control}
                    render={({field})=>(
                      <TextField
                        {... field}                    
                        id='email'
                        label='Email'
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : ''}            
                      />                  
                    )}
                  />  
            
            </FormControl>
            <FormControl variant='standard' fullWidth sx={{ mb: 1 }}>
                
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
            
            <FormControl sx={{bottom:-40 , display:"flex"}}>
            
            <ButtonUnstyled className="pure-material-button-outlined"  type='submit' >  Registrar cuenta </ButtonUnstyled>
            <FormHelperText  >¿Ya tienes una cuenta? <a href="/" > Inicia sesión!</a></FormHelperText>
            </FormControl>
            </form>
            </Container>
        </div>
      </div>
    </>
  )
}
