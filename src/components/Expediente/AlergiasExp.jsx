import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import Tooltip from '@mui/material/Tooltip'
import { Controller } from 'react-hook-form'
import { SelectAlergia } from './SelectAlergias'
import { Container } from '@mui/material'

export function AlergiasExp ({ control, index, onRemove, disableRemoveButton, field }) {
  return (
        <section>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
                <ListItemText sx={{marginRight: 2}}>     
                <Controller 
                    key={index}
                    name={`alergias[${index}].idalergia`}
                    control={control}
                    render={({ field }) => (
                    <SelectAlergia
                        field={field}
                    />
                    )}
                />
                </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`alergias[${index}].reaccion`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Reacción'
                  />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`alergias[${index}].observaciones`}
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
              <Tooltip title={`Eliminar Alergia ${index + 1}`}>
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
