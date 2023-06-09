import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Table, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { useCallApi } from '../../hooks/useCallApi';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { Info } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/principal.css'
import { spacing } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import { Header } from '../Header';


export default function ListMedic() {

    var { data, error, loaded } = useCallApi({ endpoint: 'medicamento/' })
  
    return (
        <>
        <Header/>
        <Typography variant='h5' component='h1' gutterBottom  sx={
            {
              fontWeight: "bold" ,
              fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
              letterSpacing: 2,
              wordSpacing: 1,
              paddingTop: 2,
              paddingLeft: 3,
            }
              
            }>
              Listado de Medicamentos
            </Typography>
        <Grid container spacing={2} sx={{ p: 2 }} >
        {!loaded && 
          <Loader/>
        }
        
    
         {data && data!="No hay registros" && 
           data.map((row)=>(
            <Grid item xs={12} md={6} key={row.id} >
            <Card sx={{
                borderRadius:2,
                background: "#17518c",

            }}>
              <CardContent
                sx={{
                p: 1,
                color: "#fff",
                }}>
              <Typography variant='h6' color='text.principal' sx={{fontWeight: 'bold'}}>
                  {row.nombre}
                </Typography>
                <Typography variant='body1' color='HighlightText' sx={{pb:1}} >
                </Typography>
                <Box sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  py: 2,
                  px: 1,
                  borderRadius: 2,   
                }}>
                <Typography variant='body2'  color='text.secondary'sx={{fontWeight: 'bold',pb:1}}>
                {row.descripcion}
                
                </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>
        </>   
    );
  }