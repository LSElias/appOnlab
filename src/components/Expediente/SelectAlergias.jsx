import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../../hooks/useCallApi'
import { FormControl } from '@mui/material'

export function SelectAlergia ({field}) {
  const { data, error, loaded } = useCallApi({ endpoint: `alergia` })
  return (
    <>
      {loaded && (
        <>
        <FormControl variant='standard' fullWidth sx={{ }}>
          <InputLabel id='idalergia'>Alergia</InputLabel>
          <Select
            {...field}
            labelId='idalergia'
            label='idalergia'
            defaultValue = ''

          >
            {data.map((alergia) => (
              <MenuItem key={alergia.id} value={alergia.id}>
                {alergia.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </>
      )}
    </>
  )
}
