import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './css/principal.css'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Grid, MenuList } from '@mui/material';
import Other from '@mui/icons-material/BubbleChart';

export function Header() {
  const navigate = useNavigate();
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())


  useEffect(()=>{
    setUserData(decodeToken())
  },[user])
  //console.log(userData);

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElMant, setAnchorElMant] = useState(null)
  const [anchorElOth, setAnchorElOth] = useState(null)
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleOpenMantMenu = (event) => {
    setAnchorElMant(event.currentTarget)
  }
  const handleCloseMantMenu = () => {
    setAnchorElMant(null)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenVariousMenu = (event) => {
    setAnchorElOth(event.currentTarget)
  }
  const handleCloseVariousMenu = () => {
    setAnchorElOth(null)
  }

  const routeParams = useParams
  // eslint-disable-next-line no-unused-vars



  return (
    <AppBar position='static'>
    <Container maxWidth='xl'>
      <Toolbar disableGutters>
        <Typography
          variant='h6'
          noWrap
          component='a'
          href='/'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          ONLAB
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {!userData && (
              <Container>
                <MenuItem component={Link} to={'/ver/alergias/'}>
                  Alergias
                </MenuItem>
                <MenuItem component={Link} to={'/ver/enfermedades/'}>
                  Enfermedades
                </MenuItem>
                <MenuItem component={Link} to={'/ver/medicamentos/'}>
                  Medicamento
                </MenuItem>
              </Container>
        )}
            {userData && userData.tipousuario==3 && (
              <Container>
                <MenuItem component={Link} to={'/Expedientes/'}>
                  Expedientes
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/Agendar'}>
                  Agendar Cita
                </MenuItem>
                <MenuItem component={Link} to={`/ver/citas`}>
                   Listado de Citas
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/ver/alergias/'}>
                  Alergias
                </MenuItem>
                <MenuItem component={Link} to={'/ver/enfermedades/'}>
                  Enfermedades
                </MenuItem>
                <MenuItem component={Link} to={'/ver/medicamentos/'}>
                  Medicamento
                </MenuItem>
              </Container>
        )}
                    {userData && userData.tipousuario==2 && (
                      <Container>
                <MenuItem component={Link} to={'/Expedientes/'}>
                  Expedientes
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/Consultorios/'}>
                  Manejar Consultorios
                </MenuItem>
                <MenuItem component={Link} to={'/Horario'}>
                  Manejar Horario
                </MenuItem>
                <MenuItem component={Link} to={`/Citas`}>
                Citas Registradas
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={`/Reportes/CantidadRegistro`}>
                Reporte de Registro por Día
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/ver/alergias/'}>
                  Alergias
                </MenuItem>
                <MenuItem component={Link} to={'/ver/enfermedades/'}>
                  Enfermedades
                </MenuItem>
                <MenuItem component={Link} to={'/ver/medicamentos/'}>
                  Medicamento
                </MenuItem>
                </Container>
        )}
                    {userData && userData.tipousuario==1 && (
              <Container>
                <MenuItem component={Link} to={'/usuarios/'}>
                  Mantenimiento Usuarios
                </MenuItem>
                <MenuItem component={Link} to={'/alergias/'}>
                  Mantenimiento Alergias
                </MenuItem>
                <MenuItem component={Link} to={'/enfermedades/'}>
                  Mantenimiento Enfermedades
                </MenuItem>
                <MenuItem component={Link} to={'/medicamentos/'}>
                  Mantenimiento Medicamentos
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/usuario/create'}>
                  Registro Usuarios
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/reportes/cantidadregistro'}>
                  Reporte Citas Registradas por Día
                </MenuItem>
                <MenuItem component={Link} to={`/reportes/cantidadmedico`}>
                    Reporte Citas por Médico
                </MenuItem>
                <hr/>
                <MenuItem component={Link} to={'/ver/alergias/'}>
                  Alergias
                </MenuItem>
                <MenuItem component={Link} to={'/ver/enfermedades/'}>
                  Enfermedades
                </MenuItem>
                <MenuItem component={Link} to={'/ver/medicamentos/'}>
                  Medicamento
                </MenuItem>
              </Container>
        )}
          </Menu>
        </Box>
        <Typography
          variant='h5'
          noWrap
          component='a'
          href='/'
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          ONLAB
        </Typography>
        {userData && userData.tipousuario==3 && (
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Tooltip  title='Ver Expedientes'>
            <Button sx={{color:'white'}}  component={Link} to={`/Expedientes`}>
            Expedientes
            </Button>
            </Tooltip>
            <Tooltip sx={{color:'white'}}  title='Agenda una cita'>
            <Button component={Link} to={`/Agendar`}>
            Agendar Citas
            </Button>
            </Tooltip>
            <Tooltip sx={{color:'white'}}  title='Ver citas registradas'>
            <Button component={Link} to={`/ver/citas`}>
            Listado de Citas
            </Button>
           </Tooltip>
        </Box>
        )}
        {userData && userData.tipousuario==2 && (
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Tooltip  title='Ver Expedientes'>
          <Button sx={{color:'white'}}  component={Link} to={`/Expedientes`}>
            Expedientes
          </Button>
          </Tooltip>
          <Tooltip  title='Registrar o Editar Consultorios'>
            <Button sx={{color:'white'}} component={Link} to={`/Consultorios`}>
            Manejar Consultorios
            </Button>
            </Tooltip>
          <Tooltip  title='Registrar o Editar Horarios'>
            <Button sx={{color:'white'}} component={Link} to={`/Horario`}>
            Manejar Horario
            </Button>
            </Tooltip>
            <Tooltip sx={{color:'white'}}  title='Ver citas registradas por clientes'>
            <Button component={Link} to={`/Citas`}>
            Citas Registradas
            </Button>
            </Tooltip>
            <Tooltip sx={{color:'white'}}  title='Reporte que muestra la cantidad de registros por día'>
            <Button component={Link} to={`/reportes/cantidadregistro`}>
            Reporte de Registro por día
            </Button>
           </Tooltip>
        </Box>
        )}
        {userData && userData.tipousuario==1 && (
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Tooltip  title='Registrar Usuarios'>
          <Button sx={{color:'white'}}   component={Link} to={`/usuario/create`}>
          Registro
          </Button>
          </Tooltip>
          <Tooltip  title='Citas por Día'>
          <Button sx={{color:'white'}}   component={Link} to={`/reportes/CantidadMedico`}>
          Reporte Citas Registradas por Día
          </Button>
          </Tooltip>
          <Tooltip  title='Cantidad Citas'>
          <Button sx={{color:'white'}}   component={Link} to={`/reportes/CantidadRegistro`}>
          Reporte Cantidad de Citas por Día
          </Button>
          </Tooltip>
            <Tooltip sx={{color:'white'}} title='Otros'>
            <Button sx={{color:'white'}} onClick={handleOpenMantMenu} >
              Mantenimientos
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElMant}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElMant)}
            onClose={handleCloseMantMenu}
          >

            {userData && ( 
              <MenuList>
                <MenuItem component={Link} to={'/alergias'}>
                  <Typography textAlign='center'>Mantenimiento Alergias</Typography>
                </MenuItem>
                <MenuItem component={Link} to={'/enfermedades'}>
                  <Typography textAlign='center'>Mantenmiento Enfermedades</Typography>
                </MenuItem>
                <MenuItem component={Link} to={'/medicamentos'} >
                  <Typography textAlign='center'>Mantenimiento Medicamentos</Typography>
                </MenuItem>
                <MenuItem component={Link} to={'/usuario'}>
                  <Typography textAlign='center'>Mantenimiento Usuarios</Typography>
                </MenuItem>
              </MenuList>
            )}
          </Menu>
        </Box>
        )}
        {/* Menú Otros */ }
        {!userData && (
          <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip  title='Ver listado de alergias'>
              <Button sx={{color:'white'}}  component={Link} to={`/ver/alergias`}>
                Alergias
                </Button>
            </Tooltip>
            <Tooltip  title='Ver listado de enfermedades'>
              <Button sx={{color:'white'}} component={Link} to={`/ver/enfermedades`}>
                Enfermedades
              </Button>
            </Tooltip>
            <Tooltip  title='Ver listado de medicamentos'>
              <Button sx={{color:'white'}} component={Link} to={`/ver/medicamentos`}>
                Medicamentos
              </Button>
            </Tooltip>
          </Box>

        )}
        {userData && ( 

        <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title='Otros'>
            <IconButton onClick={handleOpenVariousMenu} sx={{ p: 0 }}>
              <Other sx={{color:'white'}}/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElOth}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElOth)}
            onClose={handleCloseVariousMenu}
          >

              <MenuList>
                <MenuItem component='a' href='/ver/alergias'>
                  <Typography textAlign='center'>Alergias</Typography>
                </MenuItem>
                <MenuItem component='a' href='/ver/enfermedades'>
                  <Typography textAlign='center'>Enfermedades</Typography>
                </MenuItem>
                <MenuItem component='a' href='/ver/medicamentos'>
                  <Typography textAlign='center'>Medicamentos</Typography>
                </MenuItem>
              </MenuList>
          </Menu>
        </Box>
            )}
        {/* Menú Otros */ }


        {/* Menu Mantenimientos */}
        {/* Menu Usuario */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Usuario'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {!userData && ( 
              <MenuList>
                <MenuItem component='a' href='/login'>
                  <Typography textAlign='center'>Inicio de Sesión</Typography>
                </MenuItem>
                <MenuItem component='a' href='/registro'>
                  <Typography textAlign='center'>Registrarse</Typography>
                </MenuItem>
              </MenuList>
            )}
            {userData && ( 
              <MenuList>
                <MenuItem sx={{
                  borderBottom:2.5,
                  borderBottomColor:'ButtonShadow',
                  }}>
                  <Typography variant='subtitle1' gutterBottom>
                    <Grid container spacing={0} >
                      <Grid paddingLeft={0} item xs={3} md={3} paddingTop={0.1} >
                       <Avatar/>
                      </Grid>
                      <Grid item xs={4} md={9} paddingRight={2}> 
                      <Typography sx={{
                        fontWeight:700, 
                      }}>
                     ¡Hola, {userData?.nombre}!  <br/>
                     </Typography>
                     {userData?.email}
                     </Grid>
                    </Grid>
                    
                    {/* var? resultado: resultado3 */}
                  </Typography>
                </MenuItem>
                <MenuItem sx={{
                  py:1
                }} color='secondary' component='a' href='/preferencias'>
                  <Typography textAlign='left'>Preferencias</Typography>
                </MenuItem>
                <MenuItem sx={{
                  py:1
                }} color='secondary' component='a' href='/logout'>
                  <Typography textAlign='left'>Cerrar Sesión</Typography>
                </MenuItem>
              </MenuList>
            )}
          </Menu>
        </Box>
        {/* Menu Usuario */}
      </Toolbar>
    </Container>
  </AppBar>
  );
}
