import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Table, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { useCallApi } from '../hooks/useCallApi';
import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Info } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './css/principal.css'
import { spacing } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { AgendaContext } from '../context/agendaContext';

function militaryTimeTo12Hour(s) {
  const answer_array = s.split(':');
  s = answer_array[0] + answer_array[1]; 
  if(s.length == 3) s = `0${s}`; // 930 -> 0930
  const hour = parseInt(s.substring(0, 2), 10);
  const min = answer_array[1];
  if(hour < 12) return `${hour % 12}:${min} AM`;
  return `${hour % 12 || 12}:${min} PM`;
}



export default function Agenda({props}) {
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const {agendaC, getAgenda} =useContext(AgendaContext)
  const [AgendaData, setAgendaData]=useState(getAgenda())
  const [value, setValue] = React.useState(0);
  const tipo = props.tipo;
  const especialidad = props.especialidad;
  //console.log(tipo,especialidad)
  var url = '';
  if(tipo=="Cliente"){
     var { data, error, loaded } = useCallApi({ endpoint: 'Horario/' })
    }else{
      if(tipo=="HorariosMedicos"){
     var { data, error, loaded } = useCallApi({ endpoint: `Horario/getMedico/${userData.id}` })
      }else{
        var { data, error, loaded } = useCallApi({ endpoint: `Citas/getByMedico/${userData.id}` })

      }
    }



  const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  useEffect(() => {

  }, [value])
    
function TabPanel(props) {
  const {priva, children, value, index, meow, ...other } = props;
  return (

    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      
      {...other
      }
    >
      {value === index && (
        <>
    <Grid container spacing={2} sx={{ p: 2 }} >
    {!loaded && 
      <Loader/>
    }
    
    {/* Agenda desde el punto de vista de creación */}
     {data && data!="No hay registros" && 
       data.map((row)=>{
        if(row.dia==meow && tipo=="HorariosMedicos"){
          return(
        <Grid item xs={12} md={3} key={row.idHorario} >
        <Card sx={{
          borderRadius:2,
        }}>
          <CardContent
            sx={{
            p: 1,
            backgroundImage: "linear-gradient(180deg, #17518c, #35bad0)",
            color: "#fff",
            }}>
          <Typography variant='h6' color='text.principal' sx={{fontWeight: 'bold'}}>
              {row.Consultorio}
            </Typography>
            <Typography variant='body1' color='HighlightText' sx={{pb:1}} >
              {row.Especialidad}
            </Typography>
            <Box sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              py: 2,
              px: 1,
              borderRadius: 2,   
            }}>
            <Typography variant='body2'  color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
              Día: {row.dia}
            </Typography>
            <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
              Inicio: {militaryTimeTo12Hour(row.hora)}
            </Typography>
            <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
              Termina: {militaryTimeTo12Hour(row.cierre)}
            </Typography>
            <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
            Estado: {row.ocupado=="1" ? "Ocupado o Deshabilitado" : "Libre para uso" }
            </Typography>
            </Box>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              backgroundImage: "linear-gradient(180deg, #35bad0, #2c8fbe)",
              color: (theme) => theme.palette.common.white
            }}
          >
            <IconButton color='inherit' key={row.id} component={Link} to={`/Horario/update/${row.idHorario}`}   aria-label='Editar' sx={{ }}>
              <EditIcon  />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
     )}
      if(row.dia==meow && tipo=="Registrados" && row.estado=="Agendado"){
        return(
          <Grid item xs={12} md={3} key={row.id} >
          <Card key={row.idhorario} sx={{
            borderRadius:2,
          }}>
            <CardContent
              sx={{
              p: 1,
              backgroundImage: "linear-gradient(180deg, #17518c, #35bad0)",
              color: "#fff",
              }}>
            <Typography variant='h6' color='text.principal' sx={{fontWeight: 'bold'}}>
                {row.Consultorio}
              </Typography>
              <Typography variant='body1' color='HighlightText' sx={{pb:1}} >
                {row.especialidad}
              </Typography>
              <Box sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                py: 2,
                px: 1,
                borderRadius: 2,   
              }}>
              <Typography variant='body2'  color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                Fecha: {row.dia} {row.Fecha}
              </Typography>
              <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                Inicio: {militaryTimeTo12Hour(row.hora)}
              </Typography>
              <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                Termina: {militaryTimeTo12Hour(row.cierre)}
              </Typography>
              <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
              Estado: {row.estado}
              </Typography>
              </Box>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                backgroundImage: "linear-gradient(180deg, #35bad0, #2c8fbe)",
                color: (theme) => theme.palette.common.white
              }}
            >
              <IconButton color='inherit' component={Link} to={`/Horario/${row.id}`}   aria-label='Detalle' sx={{ ml:'auto' }}>
                <Info  />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
       )
      }
      // Agenda que se le muestra al cliente/paciente a la hora de querer registrar una cita 
      if(row.dia==meow && tipo=="Cliente" && row.ocupado==0 && row.idespecialidad == especialidad  ){
        return(
          <Grid item xs={12} md={3} key={row.idHorario} >
          <Card sx={{
            borderRadius:2,
          }}>
            <CardContent
              sx={{
              p: 1,
              backgroundImage: "linear-gradient(180deg, #17518c, #35bad0)",
              color: "#fff",
              }}>
            <Typography variant='h6' color='text.principal' sx={{fontWeight: 'bold'}}>
                {row.Consultorio}
              </Typography>
              <Typography variant='body1' color='HighlightText' sx={{pb:1}} >
                {row.Especialidad}
              </Typography>
              <Typography variant='body1' color='HighlightText' sx={{pb:1}} >
                Funcionario {row.nombre} {row.apellido1} 
              </Typography>
              <Box sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                py: 2,
                px: 1,
                borderRadius: 2,   
              }}>
              <Typography variant='body2'  color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                Día: {row.dia}
              </Typography>
              <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                Inicio: {militaryTimeTo12Hour(row.hora)}
              </Typography>
              <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                Termina: {militaryTimeTo12Hour(row.cierre)}
              </Typography>
              <Typography variant='body2' color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
              Estado: {row.ocupado=="1" ? "Ocupado" : "Desocupado" }
              </Typography>
              </Box>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                backgroundImage: "linear-gradient(180deg, #35bad0, #2c8fbe)",
                color: (theme) => theme.palette.common.white
              }}
            >
              <Button variant='contained' type='button' component={Link} to={`/agendar/cita/${row.idHorario}`}   sx={{backgroundColor:"white", color:'#17518c', fontWeight:900,
               ":hover":{
                backgroundColor:"#17518c",
                color:'white',

               }}}>
                Agendar
              </Button>
            </CardActions>
          </Card>
        </Grid>
       )
      }
     }
     )}
    </Grid>
    </>   
     )}
     
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  meow: PropTypes.string.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    width: "100vh"
  };
}
  
    return (
      <Box 
         sx={{ mb:5, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
      >
        <Tabs
          margin="0"
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider', height:'100%', minHeight:'100vh'}}
        >
          <Tab sx={{backgroundColor: ""}} label="Lunes" {...a11yProps(0)} />
          <Tab label="Martes" {...a11yProps(1)} />
          <Tab label="Miércoles" {...a11yProps(2)} />
          <Tab label="Jueves" {...a11yProps(3)} />
          <Tab label="Viernes" {...a11yProps(4)} />
          <Tab label="Sábado" {...a11yProps(5)} />
          {data && tipo=="HorariosMedicos" && (
          <Tab sx={{
            borderTop: 1,
            borderColor: 'divider'
          }} label="Agregar Horario" component={Link} to={`/horario/create`}  />
        )}
          </Tabs>
        <TabPanel className="tabby" value={value} index={0} meow={'Lunes'} > 
          Item One
        </TabPanel>
        <TabPanel className="tabby" width="100%" value={value} index={1} meow={'Martes'}>
          Item Two
        </TabPanel>
        <TabPanel className="tabby"  value={value} index={2} meow={'Miercoles'}>
          Item Three
        </TabPanel>
        <TabPanel className="tabby" value={value} index={3} meow={'Jueves'}>
          Item Four
        </TabPanel>
        <TabPanel className="tabby" value={value} index={4} meow={'Viernes'}>
          Item Five
        </TabPanel>
        <TabPanel className="tabby"  value={value} index={5} meow={'Sabado'}>
          Item Six
        </TabPanel>
      </Box>
    );
  }