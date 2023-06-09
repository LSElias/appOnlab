import * as React from 'react'
import './css/principal.css'
import { Header } from './Header'
import Agenda from './Agenda'
import { useContext } from 'react'
import { AgendaContext } from '../context/agendaContext'
import { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Box, Button, Container, FormControl, FormHelperText, Grid, Tab, Tabs, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SearchUsuario } from './SelectUsuario'
import SearchIcon from '@mui/icons-material/Search';
import { SelectEspecialidad } from './SelectEspecialidad'

export function CitaCliente () {
    
     const [callAgenda, setCall] = useState('')
     var esp = ''; 


    // Control de Botones de Filtro
    const [values, setValues] = useState(null)

    const agendarSchema=yup.object({
        especialidad: yup.string().required('Debe de seleccionar un usuario')
      })
      //Establecer formulario
      //valores defecto, valores de carga y validación
      const {control, handleSubmit, setValue, formState:{errors}}=
      useForm({
        // Valores iniciales
        defaultValues:{
            especialidad:''
        },
        values,
        resolver: yupResolver(agendarSchema)
      })  
        
      const onchangeEspecialidad = (e) =>{
        setValue('especialidad',e.target.value ,{shouldValidate:true})
        setCall(e.target.value)
      }

      useEffect(() => {
        esp = callAgenda
      }, [callAgenda])
      

  return (
    <>
    <Header/>
    <Container  sx={{m:2, pb:2}}>
    <Typography component='h1' variant='h5'>
        Buscar por Especialidad
    </Typography>
    <Grid container>
    <Grid item xs={10} sm={10} sx={{ py:2 }}>
          <FormControl variant='standard' fullWidth sx={{ py: 0}}>
            <Controller
              name='especialidad'
              control={control}
              defaultValue = ''
              render={({ field })=>(
                <SelectEspecialidad 
                  field={field}
                  error={Boolean(errors.especialidad)}
                  onChange={(e)=>onchangeEspecialidad(e)}
                />
               )}
            />  
          <FormHelperText sx={{ color: '#d32f2f' }}>{errors.categoria ? errors.categoria.message : ''}</FormHelperText>
          </FormControl>
          </Grid>
    </Grid>
    </Container>
    <hr style={{ 
              height: "1px",
        backgroundColor: "lightgray",
        border: "none"
    }}/>
    {callAgenda != null && callAgenda !='' && (
     <Agenda props={
     {
        tipo: "Cliente",
        especialidad: callAgenda
     }
    }
            />
     )}
    </>
  )
}
