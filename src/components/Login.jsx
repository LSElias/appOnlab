import React, {useState} from "react";
import './css/Login.css'
import Container from '@mui/material/Container'
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Button, FormControl, FormHelperText, FormLabel, Input, InputLabel, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form'
import { useCallApi } from '../hooks/useCallApi'
import { useSubmitForm } from '../hooks/useSubmitForm'
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";



export function Login(){
    const navigate = useNavigate();
    const {saveUser} =useContext(UserContext)
    
    const loginSchema= yup.object({
        email: yup.string()
          .required('Es requerido que ingrese su correo.')
          .min(10, 'El correo debe tener un mínimo de 10 carácteres' )
          .email('Debe ser en formato de correo.'),
          contrasena: yup.string()
          .required('Es requerido que ingrese su la contraseña.')
          .min(8,'La contraseña debe de tener 8 dígitos'),
      })

      const {control, handleSubmit, setValue, formState:{errors}}=
      useForm({
        defaultValues:{
          email: (localStorage.getItem('correo') ? localStorage.getItem('correo') : '' ),
          contrasena:''
        },
        resolver: yupResolver(loginSchema)
      })

    //Valores Formularios
    const [formData, setData] = useState(null)
    //Saber si se envia info
    const [start, setStart] = useState(false)
      
    //Enviar los valores al API
    const { responseData, errorData, loadedData } =  useSubmitForm({ endpoint: 'Usuario/login/', action: 'POST', formData, start })
    //Submit del formulario
    const onSubmit =  (formData) => {
        localStorage.setItem('correo', formData.email)
        try {
       // console.log(formData)
        setData(formData)
        setStart(true)
        
        } catch (e) {
          console.log(e)
        }
    }
    const onError = (errors, e) => console.log(errors, e)
    
    useEffect(() => {
      if (responseData != null && responseData !="Usuario no valido") {
        saveUser(responseData)
        toast.success('Inicio de sesión correcto', {
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
        return navigate('/')
      }else{
          setStart(false);
          if(responseData!=null && responseData == "Usuario no valido"){
            toast.error('Se ha ingresado un dato erroneo. La página se refrescará para que pueda volver a intentar.', {
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
            setTimeout(() => {
              document.location.reload();
            }, 1800);
          }
      }
    }, [responseData, errorData, loadedData])


    return (
        
        <>
        <div className="bg">
        <div className="logTainer logOpcty">
        <Container maxWidth='xl' style={{ display: 'block', marginLeft: 'auto', marginright: 'auto', width: '50%'}}>
        <img style={{maxWidth: '100%',minWidth:'100%' , height: 'inherit', }} src={'../src/img/logo-no-background.png'}  alt="Logo" />
        </Container>
        <Container maxWidth='xl' style={{  }}>
        <form  onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl variant='standard' fullWidth sx={{ mb: 2 }}>
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
        <FormControl variant='standard' fullWidth sx={{ mb: 2 }}>
            
        <Controller 
                name='contrasena'
                control={control}
                render={({field})=>(
                  <TextField
                    {... field}                    
                    id='contrasena'
                    label='Contraseña'
                    type="password"
                    error={Boolean(errors.contrasena)}
                    helperText={errors.contrasena ? errors.contrasena.message : ''}            
                  />                  
                )}
              />  
        </FormControl>
        
        <FormControl style={{margin:'5px', display:'flex'}}>
        
        <ButtonUnstyled className="pure-material-button-outlined"  type='submit' >  Entrar </ButtonUnstyled>
      
        </FormControl>
        </form>
        <FormHelperText >¿No tienes una cuenta aún? <a href="/registro/" >Registrate!</a></FormHelperText>
        </Container>
        </div>
        </div>
        </>
    )    
}