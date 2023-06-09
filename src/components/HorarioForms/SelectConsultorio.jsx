import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../../hooks/useCallApi'

export function SelectConsultorio (field) {
  const { data, error, loaded } = useCallApi({ endpoint: `Consultorio/GetUser/${field.id}` })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='idconsultorio'>Consultorio</InputLabel>
          <Select
            {...field}
            labelId='idconsultorio'
            label='consultorio'
            defaultValue = ''
            value={field.field.value}
          >
            {data.map((consultorio) => (
              <MenuItem key={consultorio.id} value={consultorio.id}>
                {consultorio.consultorio} — {consultorio.especialidad}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )
}
