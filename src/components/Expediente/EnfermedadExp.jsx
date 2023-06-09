import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import { Controller } from 'react-hook-form'
import { SelectEnfermedad } from './SelectEnfermedades'

export function EnfermedadExp ({ control, index, onRemove, disableRemoveButton, field }) {
  return (
    <section>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
         <Grid item xs={12} md={3.5}>
                <ListItemText>
                <Controller 
                    key={index}
                    name={`enfermedades[${index}].idenfermedad`}
                    control={control}
                    render={({ field }) => (
                    <SelectEnfermedad
                        field={field}
                    />
                    )}
                />
                </ListItemText>
            </Grid>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`enfermedades[${index}].observaciones`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Observaciones'
                  />
                )}
              />
            </ListItemText>
            <ListItemIcon>
              <Tooltip title={`Eliminar Enfermedad ${index + 1}`}>
                <span>
                  <IconButton
                    key={index}
                    edge='end' disabled={disableRemoveButton}
                    onClick={() => onRemove(index)} aria-label='Eliminar'
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </section>
  )
}
