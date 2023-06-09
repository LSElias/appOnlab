import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import './css/loader.css'

export function Loader () {
  return (
    <>
        <Container maxWidth='xl' style={{ paddingTop:'35vh'}} >
            <div className="spinner">
            </div>
        </Container>
        <Container style={{display:'block',  margin: '5px auto', padding: '15px', width:'180px'}}>
        <Typography variant='h4' component='h1' gutterBottom margin='auto'
                    sx={{

                        fontFamily: 'monospace',
                        fontWeight: 700,

                      }}>
            
             Cargando 
            </Typography>
        </Container >
    </>
  )
}
