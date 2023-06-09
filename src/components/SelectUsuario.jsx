
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi, useCallApiT } from '../hooks/useCallApi'
import { Autocomplete, IconButton, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';




  export function SearchUsuario (field) {
    const { data, error, loaded } = useCallApi({ endpoint: 'Usuario' })

    return (
      <>
      {loaded && (
        <>
          <InputLabel id='usuario'>Usuario</InputLabel>
          <Select
            {...field}
            sx={{minWidth:'200px',
                width:'100%'}}
            labelId='usuario'
            label='usuario'
            defaultValue = ''
            value={field.field.value}
          >
            {field.filtro=='All' && data.map((usuario) => {
             if(usuario.id != field.iduser){
            return(
            <MenuItem key={usuario.id} value={usuario.id}>
               {usuario.nombre} {usuario.apellido1} {usuario.apellido2} - {usuario.email}
              </MenuItem>
              )
            }
            })}
            {field.filtro=='Medico' && data.map((usuario) => {
             if(usuario.tipousuario == 2){
            return(
            <MenuItem key={usuario.id} value={usuario.id}>
                Dr. {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
              </MenuItem>
              )
            }
            })}
          </Select>
        </>
      )}
      </>
    )
  }
  