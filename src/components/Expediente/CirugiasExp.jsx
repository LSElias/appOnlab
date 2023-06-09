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

export function CirugiaExp ({ control, index, onRemove, disableRemoveButton, field }) {
  return (
    <section>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`cirugias[${index}].nombre`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Nombre de la Cirugía'
                  />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`cirugias[${index}].descripcion`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Descripción'
                  />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`cirugias[${index}].lugar`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Lugar'
                  />
                )}
              />
            </ListItemText>
            <ListItemIcon>
              <Tooltip title={`Eliminar Cirugia ${index + 1}`}>
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
