import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Table, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { useCallApi } from '../../hooks/useCallApi';
import { Loader } from '../Loader';
import '../css/principal.css'
import { Header } from '../Header';
import { useParams } from 'react-router-dom';

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


 function genre(genre){
    switch(genre){
    case 'F' ||  'f':
        return 'Mujer';
        break;
    case 'M' || 'm':
        return 'Hombre';
        break;
    case 'N' || 'n':
        return 'Otro';
        break;
    }
 }

export default function ExpedienteDetail() {
    const routeParams = useParams()
    

    const { data, error, loaded } = useCallApi({ endpoint: `Expediente/GetFull/${routeParams.id}` })
  
    return (
        <>
        <Header/>
        {!loaded && ( <Loader/>)}
        {data && data!=null && (
          <Container maxWidth='lg' sx={{marginY: 4,padding: 2, border: 1, borderColor: 'gray', borderRadius:'0.5em'}}> 
            <Typography variant='h6' component='h1' sx={{paddingY:1, fontWeight: '900', letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                Expediente de {data.usuario.nombre} {data.usuario.apellido1} {data.usuario.apellido2}
             </Typography>
             <hr/>
             <Typography variant='h6' component='h2' sx={{paddingY:1, fontWeight: '700', letterSpacing:'0.1em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                Datos de Importancia
             </Typography>
             <Grid container spacing={1}>
             <Grid item xs={12}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Nacimiento: </Box> {fechaFormateada(data.nacimiento)}
             </Typography>
             </Grid>      
             <Grid item xs={12}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Género: </Box> {genre(data.genero)}
             </Typography>
             </Grid>       
             <Grid item xs={12}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Tipo de sangre: </Box> {data.sangre}
             </Typography>
             </Grid>     
            <Grid item xs={12}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Correo: </Box> {data.usuario.email}
             </Typography>
             </Grid>
            <Grid item xs={12}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Teléfono: </Box> {data.telefono}
             </Typography>
             </Grid>
             <Grid item xs={12}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Teléfono de emergencia: </Box> {data.emergencia}
             </Typography>
             </Grid>
             <Grid item xs={12} sx={{paddingY:1}}>
             <Typography variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                <Box display='inline' color='black' fontWeight={700}>
                Lugar de residencia: </Box> {data.residencia}
             </Typography>
             </Grid>
             </Grid>
             <hr/>
             <Typography variant='h6' component='h2' sx={{paddingY:1, fontWeight: '700', letterSpacing:'0.1em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                Datos Médicos
             </Typography>
            <Grid item xs={12}>
                 <Typography variant='h7' component='h3' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                    Alergias
                </Typography>
             </Grid>
             <Grid container spacing={1}>
            {data.alergias  && data.alergias.map((row)=>(
            <Grid item xs={12} key={row.idalergia}>
            <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                     {row.nombre}
             </Typography>
             </Grid>
            ))}
             {!data.alergias && (
                <Grid item xs={12}>
                    <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                         No hay alergías registradas para esta persona.
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography   Typography variant='h7' component='h3' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                    Enfermedades
                </Typography>
            </Grid>
            {data.enfermedades  && data.enfermedades.map((row)=>(
            <Grid item xs={12} key={row.idenfermedad}>
            <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                     {row.nombre}
             </Typography>
             </Grid>
            ))}
             {!data.enfermedades && (
                <Grid item xs={12}>
                    <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                         No hay enfermedades registradas para esta persona.
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography   Typography variant='h7' component='h3' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                    Medicamentos
                </Typography>
            </Grid>
            {data.medicamentos  && data.medicamentos.map((row)=>(
            <Grid item xs={12} key={row.idmedicamento}>
            <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                     {row.nombre} : {row.dosis}
             </Typography>
             </Grid>
            ))}
             {!data.medicamentos && (
                <Grid item xs={12}>
                    <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                         No hay medicamentos registrados para esta persona.
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography   Typography variant='h7' component='h3' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                    Cirugías
                </Typography>
            </Grid>
            {data.cirugias  && data.cirugias.map((row)=>(
            <Grid item xs={12} key={row.idmedicamento}>
            <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                     {row.nombre} 
             </Typography>
             </Grid>
            ))}
             {!data.cirugias && (
                <Grid item xs={12}>
                    <Typography  variant='subtitle' color='#4a4a51' sx={{paddingY:1, letterSpacing:'0.em',fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
                         No hay cirugías registradas para esta persona.
                    </Typography>
                </Grid>
            )}
            </Grid>
            
             </Container>

        )}     
        </>   
    );
  }