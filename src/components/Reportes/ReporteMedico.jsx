import * as React from 'react'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Container } from '@mui/system'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import PropTypes from 'prop-types'
import { Box, Checkbox, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

function descendingComparator (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  
  function getComparator (order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  } 


export function ReporteMedico () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const id = routeParams.id
  const esCrear = !id
  const [values, setValues] = useState(null)
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
    const [fechaData,setFecha] = useState(null);
    const [order, setOrder] = React.useState('desc')
    const [orderBy, setOrderBy] = React.useState('Cantidad')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
  

  const today = new Date();
  today.setHours(0, 0, 0, 0)

  function stableSort (array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }
  
  const headCells = [
    {
      id: 'Cantidad',
      numeric: false,
      disablePadding: false,
      label: 'Cantidad de Citas'
    },
    {
      id: 'Nombre',
      numeric: false,
      disablePadding: false,
      label: 'Nombre del Funcionario'
    }
  ]
  
  function TableDatosHead (props) {
    const {
      // onSelectAllClick,
      order,
      orderBy,
      // numSelected,
      // rowCount,
      onRequestSort
    } = props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }
  
    return (
      <TableHead sx={{ backgroundColor:'#82C2ED',}}>
        <TableRow>
          <TableCell align='center'  padding='checkbox'> #
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id
                  ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                    )
                  : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
  // PropTypes es un verificador de tipos
  TableDatosHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    /*  onSelectAllClick: PropTypes.func.isRequired, */
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  }

 const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    }
  
    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id)
      let newSelected = []
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        )
      }
      setSelected(newSelected)
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked)
    }
  
    const isSelected = (name) => selected.indexOf(name) !== -1
  
    // Avoid a layout jump when reaching the last page with empty data.
    const emptydata =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - responseData.length) : 0
  

  const ExpedienteSchema=yup.object({
    fechaMenor: yup.date()
    .typeError('Debe de ingresar una fecha.')
    .required('Ingrese la fecha menor'),
    fechaMenor: yup.date()
    .typeError('Debe de ingresar una fecha.')
    .required('Ingrese la fecha mayor')
})
  //Establecer formulario
  //valores defecto, valores de carga y validación
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        fechaMenor:'',
        fechaMayor:'',
      },
      values,
      resolver: yupResolver(ExpedienteSchema)
    })  
    
    const [formData, setData] = useState(null)
    // Accion: post, put
    const [action, setAction] = useState('POST')
    // Booleano para establecer si se envia la informacion al API
    const [start, setStart] = useState(false)
    // Obtener la respuesta de la solicitud de crear o actualizar en el API
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: `usuario/ReporteMedico`, action, formData, start })


    const onSubmit = (DataForm) => {
        try {
            let dateinicio=new Date(DataForm.fechaMenor).getTime();
            let datefin=new Date(DataForm.fechaMayor).getTime();

            if(dateinicio >= datefin){
                toast.error('La fecha de inicio tiene que ser menor que la del fin. Intente otra vez.', {
                    style: {
                      border: '1px solid #5A00FF',
                      padding: '16px',
                      fontWeight: 700,
                      color: '#000159',
                      fontFamily: 'sans-serif',
                    },
                    iconTheme: {
                      primary: '#7B33FF',
                      secondary: 'white',
                    },
                  });
                return;
            }
            setData(DataForm);
            setStart(true);
        } catch (e) {
            setStart(false)
    
        }
      }
      const onError = (errors, e) => console.log(errors, e)

      useEffect(()=>{ 
        if(responseData!= null && responseData !="No hay datos") {
          //  console.log(responseData);
            setStart(false);
        }else{
            if(responseData == "No hay datos"){
            setStart(false)
            toast.error('El rango de fechas no tiene ningún registro. Intente otra vez después de que se refresque la página ', {
                style: {
                  border: '1px solid #5A00FF',
                  padding: '16px',
                  fontWeight: 700,
                  color: '#000159',
                  fontFamily: 'sans-serif',
                },
                iconTheme: {
                  primary: '#7B33FF',
                  secondary: 'white',
                },
              });
              setTimeout(() => {
                document.location.reload();
              }, 1800);
            }
        }

      },[responseData])


  return (
    <>
    <Header/>
    <Container sx={{ mt: 5, mb: 1, marginRight: '5vh', marginLeft:0,  }}>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography component='h1' variant='h5' gutterBottom>
                Reporte Mayor Cantidad de Citas por Médico
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' sx={{ marginY: 1 }}>
              <Controller
                name='fechaMenor'
                control={control}
                render={({ field })=>(
                <TextField
                 { ... field}
                id="fechaMenor"
                label="Fecha Inicio"
                type="date"
                error={Boolean(errors.fechaMenor)}
                helperText={errors.fechaMenor ? errors.fechaMenor.message : ''}
                InputLabelProps={{
                shrink: true,
                }}/>
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' sx={{ marginY: 1 }}>
              <Controller
                name='fechaMayor'
                control={control}
                render={({ field })=>(
                <TextField
                 { ... field}
                id="fechaMayor"
                label="Fecha Fin"
                type="date"
                error={Boolean(errors.fechaMayor)}
                helperText={errors.fechaMayor ? errors.fechaMayor.message : ''}
                InputLabelProps={{
                shrink: true,
                }}/>
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10}>     
          </Grid>
          <Grid item xs={10} sm={10}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1, mb: 5 }}>Buscar</Button>
          </Grid>
        </Grid>
      </form>

      {responseData != null && responseData !='' && responseData !="No hay datos" && (
        <>
            <Box sx={{ width: '100%', marginX: 'auto', marginY: 2,pb:8}}>
            <Paper sx={{ width: '100%', mb: 1,  }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby='tableTitle'
                  size={dense ? 'small' : 'medium'}
                >
                  <TableDatosHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={responseData.length}
                  />
                  <TableBody>
                    {stableSort(responseData, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id)
                        const labelId = `enhanced-table-checkbox-${index}`
  
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role='none'
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell align='center' padding='checkbox'>
                                {index+1}
                            </TableCell>
                            <TableCell align='center'
                              component='th'
                              id={labelId}
                              scope='row'
                              padding='none'
                            >
                              {row.Cantidad}
                            </TableCell>
                            <TableCell align='center'>{row.Nombre}</TableCell>
  
                          </TableRow>
                        )
                      })}
                    {emptydata > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptydata
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Paginacion */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={responseData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label='Dense padding'
            />
          </Box>
        </>
        )}

      </Container>
    <Footer/>
    </>
  )
}
