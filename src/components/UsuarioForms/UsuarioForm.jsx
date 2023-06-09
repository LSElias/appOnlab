import React, {useState} from "react";
import Container from '@mui/material/Container'
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Button, FormControl, FormHelperText, FormLabel, Grid, Input, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller, useFieldArray} from 'react-hook-form'
import { useCallApi } from '../../hooks/useCallApi'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Header } from "../Header";


export function UsuarioForm () {
    const navigate = useNavigate()
    const routeParams = useParams()
    
    const id = routeParams.id
    const esCrear = !id
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
      })
  
      const {control, handleSubmit, setValue, formState:{errors}}=
      useForm({
        defaultValues:{
          id:`/${id}`,
          nombre:'',
          apellido1:'',
          apellido2:'',
          email:'',
          contrasena:'12345678',
          tipousuario:'',
          estado:'1'
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
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'usuario/', action, formData, start })
    // Accion submit
    const onSubmit = (DataForm) => {
        try {
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
        return navigate('/usuario')
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
        <Grid container spacing={1}>
          <Grid item xs={4} sm={2}>
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
          <Grid item xs={4} sm={5}>
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
          <Grid item xs={4} sm={5}>
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
            <Grid paddingTop={1}>
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
            </Grid>
            <Grid item xs={4} sm={4} paddingTop={1}>
                <FormControl variant='standard'  sx={{ mb: 1, width:'10em' }}>
                <InputLabel id='tipousuario'> Tipo de Usuario </InputLabel>
                    <Controller
                        name='tipousuario'
                        control={control}
                        defaultValue = ''
                        render={({ field })=>(

                        <Select
                            {...field}
                            labelId='tipousuario'
                            label='Tipo de Usuario'
                        >
                            <MenuItem key={0} value={'1'}> Administrador </MenuItem>
                            <MenuItem key={1} value={'2'}> Médico </MenuItem>
                            <MenuItem key={2} value={'3'}> Cliente </MenuItem>

                        </Select>
                        )}
                    />  
                </FormControl>
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
