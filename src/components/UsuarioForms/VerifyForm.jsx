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


export function VerifyForm () {
    
    const navigate = useNavigate()
    const routeParams = useParams()
    
    const id = routeParams.id
    const [values, setValues] = useState(null)
    const loginSchema=yup.object({
      })

    function getTipoUsuario(tipo){
        switch(tipo){
          case "1":
            return 'Administrador';
            break;
          case "2":
            return 'Médico';
            break;
          case "3":
            return 'Cliente';
            break;
        }
      }
    
    
      const {control, handleSubmit, setValue, formState:{errors}}=
      useForm({
        defaultValues:{
          id:`/${id}`,
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
    const [action, setAction] = useState('PUT')
    // Booleano para establecer si se envia la informacion al API
    const [start, setStart] = useState(false)
    // Obtener la informacion de la pelicula a actualizar
    const { data, error, loaded } = useCallApi({ endpoint: `usuario/${id}` })
    // Obtener la respuesta de la solicitud de crear o actualizar en el API
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: `usuario/estado/${id}`, action, formData, start })
    // Accion submit
    const onSubmit = (DataForm) => {
        try {
            DataForm = {
                id: `${id}`,
                estado: '1'
            }
          console.log(DataForm)
          setData(DataForm);
          setStart(true);
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
        toast.success('Actualización realizada correctamente.', {
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
    },[responseData,data])


  return (
    <>
    <Header/>
    <Container sx={{ mt: 5, mb: 1, mx:2 }}>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid >
          <Grid item xs={8} sm={8}>
            <Typography component='h1' variant='h5' gutterBottom>
              ¿Está seguro que desea verificar este usuario?
            </Typography>
          </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
          <Typography>
              <Typography fontWeight={700}>
              Nombre: 
              </Typography>{data?.nombre} {data?.apellido1} {data?.apellido2}
            </Typography>
          </Grid>
            </Grid>
            <Grid paddingTop={1}>
            <Typography>
              <Typography fontWeight={700}>
              Correo: 
              </Typography>{data?.email}
            </Typography>
            </Grid>
            <Grid item xs={4} sm={4} paddingTop={1}>
            <Typography>
              <Typography fontWeight={700}>
              Tipo de usuario: 
              </Typography>{getTipoUsuario(data?.tipousuario)}
            </Typography>
            </Grid>
          <Grid item xs={6} sm={6}>
            <Button type='submit' variant='contained' color='secondary' sx={{ mt: 2, mr: 4 }}>Verificar</Button>
            <Button component={Link} to={'/usuario/'} variant='contained' color='secondary' sx={{ mt: 2 }}>Volver</Button>
        
          </Grid>
          <Grid item xs={6} sm={6}>
          </Grid>
        </Grid>
      </form>
      </Container>
    </>
  )
}
