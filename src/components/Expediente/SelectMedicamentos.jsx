import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../../hooks/useCallApi'
import { FormControl } from '@mui/material'

export function SelectMedicamento ({field}) {
  const { data, error, loaded } = useCallApi({ endpoint: `medicamento` })
  return (
    <>
      {loaded && (
        <>
        <FormControl variant='standard' fullWidth sx={{ }}>
          <InputLabel id='idmedicamento'>Medicamentos</InputLabel>
          <Select
            {...field}
            labelId='idmedicamento'
            label='idmedicamento'
            defaultValue = ''
          >
            {data.map((medicamento) => (
              <MenuItem key={medicamento.id} value={medicamento.id}>
                {medicamento.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>        
        </>
      )}
    </>
  )
}
