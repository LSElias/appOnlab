import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi'

export function SelectEspecialidad (field) {
  const { data, error, loaded } = useCallApi({ endpoint: 'especialidad' })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='especialidad'>Especialidad</InputLabel>
          <Select
            {...field}
            labelId='especialidad'
            label='especialidad'
            defaultValue = ''
            value={field.field.value}
          >
            {data.map((especialidad) => (
              <MenuItem key={especialidad.id} value={especialidad.id}>
                {especialidad.nombre}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )
}
