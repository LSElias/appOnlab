import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../../hooks/useCallApi'
import { FormControl } from '@mui/material'

export function SelectEnfermedad ({field}) {
  const { data, error, loaded } = useCallApi({ endpoint: `enfermedad` })
  return (
    <>
      {loaded && (
        <>
        <FormControl variant='standard' fullWidth sx={{ }}>
          <InputLabel id='idenfermedad'>Enfermedades</InputLabel>
          <Select
            {...field}
            labelId='idenfermedad'
            label='idenfermedad'
            defaultValue = ''
          >
            {data.map((enfermedad) => (
              <MenuItem key={enfermedad.id} value={enfermedad.id}>
                {enfermedad.nombre}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </>
      )}
    </>
  )
}
