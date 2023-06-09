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
import AddIcon from '@mui/icons-material/Add'
import { visuallyHidden } from '@mui/utils'
import { useCallApi } from '../../hooks/useCallApi'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate, useParams, Link } from 'react-router-dom'
import '../css/principal.css'
import { Loader } from '../Loader'
import { Header } from '../Header'
import { Footer } from '../Footer'
import VerifiedUserIcon from '@mui/icons-material/Done'; 
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Info } from '@mui/icons-material';
import { Icon } from '@mui/material'


//#region  Comparación
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
//#endregion
//#region Estados y tipo de usuario
function getEstado(estado){
  if(estado==0){
    return (
    <CloseIcon/>
    )
  }else{
    return (
    <VerifiedUserIcon/>
    )
  }
}

function getTipoUsuario(tipo){
  switch(tipo){
    case "1":
      return 'Administrador';
      break;
    case "2":
      return 'Médico';
      break;
    case "3":
      return 'Cliente';
      break;
  }
}
//#endregion
//#region Settings de DataTable Head
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
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre'
  },
  {
    id: 'apellido1',
    numeric: false,
    disablePadding: false,
    label: 'Primer Apellido'
  },  
  {
    id: 'apellido2',
    numeric: false,
    disablePadding: false,
    label: 'Segundo Apellido'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Correo'
  },
  {
    id: 'estado',
    numeric: false,
    disablePadding: false,
    label: 'Estado de cuenta'
  },
  {
    id: 'tipousuario',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de Usuario'
  },
]

function TableUsuarioHead (props) {
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
          <Tooltip title='Nuevo'>
            <IconButton component={Link} to='/usuario/create'>
              <AddIcon />
            </IconButton>
          </Tooltip>
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
//#endregion
//#region Proptypes de Head 
// PropTypes es un verificador de tipos
TableUsuarioHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  /*  onSelectAllClick: PropTypes.func.isRequired, */
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}
//#endregion





function TableUsuarioToolbar (props) {
  const navigate = useNavigate()
  const { numSelected } = props
  const { idSelected } = props
  const { estado } = props
  const update = () => {
    console.log(idSelected)
    return navigate(`/Usuario/update/${idSelected}`)
  }
  const verify = ()=>{
    if(estado.estado=="0"){
      return navigate(`/Usuario/verify/${idSelected}`)
    }else{
      return navigate(`/Usuario/unverify/${idSelected}`)
    }
  }

  const detalle = ()=>{
      return navigate(`/Usuario/${idSelected}`)
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
            {numSelected} Usuario seleccionado/s
          </Typography>
          )
        : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            Usuario
          </Typography>
          )}

      {numSelected > 0
        ? (<>
          <Tooltip title='Actualizar'>
            <IconButton onClick={update}>
              <EditIcon key={idSelected} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Verificar'>
            <IconButton onClick={verify}>
              <VerifiedIcon key={idSelected} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Detalle'>
            <IconButton onClick={detalle}>
              <Info key={idSelected}/>
            </IconButton>
          </Tooltip>
           </>)
        : (<></>)}
    </Toolbar>
  )
}

TableUsuarioToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired,
  estado: PropTypes.object
}

export function Usuario () {
    const { data, error, loaded } = useCallApi({ endpoint: 'Usuario/' })
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('tipousuario')
    const [selected, setSelected] = React.useState([])
    const [item, setItem] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    }
  
    const handleClick = (event, row) => {
      const selectedIndex = selected.indexOf(row.id)
      let newSelected = []
      let newItem = []
  
      if (selectedIndex === -1) {
        newSelected = [(selected, row.id)]
        newItem = [row];
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
      setItem(newItem)
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
     {!loaded && 
     <div>
      <Loader/>
     </div>
     }
     {data && 
      <>
      
      <Header />
      <Box sx={{ width: '95%', marginX: 'auto', marginY: 2,pb:8}}>
          <Paper sx={{ width: '100%', mb: 1,  }}>
            <TableUsuarioToolbar numSelected={selected.length} idSelected={Number(selected[0]) || 0} estado={item[0]} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
              >
                <TableUsuarioHead
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
                          onClick={(event) => handleClick(event, row)}
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
                            {row.nombre}
                          </TableCell>
                          <TableCell align='left'>{row.apellido1}</TableCell>
                          <TableCell align='left'>{row.apellido2}</TableCell>
                          <TableCell align='left'>{row.email}</TableCell>
                          <TableCell align='left'>{ getEstado(row.estado) }</TableCell>
                          <TableCell align='left'>{ getTipoUsuario(row.tipousuario) }</TableCell>


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
      <Footer/>
      </>
      }
    </>
  )
}