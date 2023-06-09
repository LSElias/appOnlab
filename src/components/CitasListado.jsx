import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import { useCallApi } from '../hooks/useCallApi'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './css/principal.css'
import { Loader } from './Loader'
import { Header } from './Header'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Container } from '@mui/material'

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

function fechaFormateada(fecha){
  const date = new Date(fecha);
  date.setDate(date.getDate() + 1)
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
  return formattedDate;
}


// Since 2020 all major bdataers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern bdataers (notably IE11). If you
// only support modern bdataers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: 'dia',
    numeric: false,
    disablePadding: false,
    label: 'Fecha'
  },
  {
    id: 'hora',
    numeric: false,
    disablePadding: false,
    label: 'Horario'
  },
  {
    id: 'especialidad',
    numeric: false,
    disablePadding: false,
    label: 'Especialidad'
  },
  {
    id: 'estado',
    numeric: false,
    disablePadding: false,
    label: 'Estado'
  }
]

function TableCitasHead (props) {
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
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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
TableCitasHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  /*  onSelectAllClick: PropTypes.func.isRequired, */
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

function TableCitasToolbar (props) {
  const navigate = useNavigate()
  const { numSelected } = props
  const { idSelected } = props
  const detail = () => {
    //console.log(idSelected)
    return navigate(`/ver/citas/${idSelected}`)
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0
        ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color='inherit'
            variant='subtitle1'
            component='div'
          >
            {numSelected} Citas seleccionada/s
          </Typography>
          )
        : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            Listado de Citas
          </Typography>
          )}

      {numSelected > 0
        ? (<>
          <Tooltip title='Ver más'>
            <IconButton onClick={detail} >
              <VisibilityIcon/>
            </IconButton>
          </Tooltip>
           </>)
        : (<></>)}
    </Toolbar>
  )
}

TableCitasToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired
}

export function CitasListado () {
    const {user, decodeToken, autorize } =useContext(UserContext)
    const [userData, setUserData]=useState(decodeToken())
    const { data, error, loaded } = useCallApi({ endpoint: `Citas/getByCliente/${userData.id}` })
   // console.log(data);
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('dia')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
  
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0
  
  return (
    <>
      <Header />
     {!loaded && 
     <div>
      <Loader/>
     </div>
     }
     {data && data=="No hay registros" && <>
     <Container sx={{m:10}}>
      <Typography component='h2' variant='h6' gutterBottom>
              Parece que no tienes citas registradas :( <br/>
              ¡Puedes agendar una en la sección de agendación!
            </Typography>
      </Container>
     </>}
     {data && data!=null && data!="No hay registros" && 
      <>
      <Box sx={{ width: '95%', marginX: 'auto', marginY: 2,pb:8}}>
          <Paper sx={{ width: '100%', mb: 1,  }}>
            <TableCitasToolbar numSelected={selected.length} idSelected={Number(selected[0]) || 0} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
              >
                <TableCitasHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id)
                      const labelId = `enhanced-table-checkbox-${index}`

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component='th'
                            id={labelId}
                            scope='row'
                            padding='none'
                          >
                            {fechaFormateada(row.dia)}
                          </TableCell>
                          <TableCell align='left'>{row.hora}</TableCell>
                          <TableCell align='left'>{row.especialidad}</TableCell>
                          <TableCell align='left'>{row.estado}</TableCell>


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
              count={data.length}
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
      }
    </>
  )
}
