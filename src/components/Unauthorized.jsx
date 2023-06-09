import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Header } from './Header'
export function Unauthorized () {
  return (
    <>
    <Header/>
    <Container sx={{ p: 2 }} maxWidth='sm'>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom
      >
        Autorizacion
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' paragraph>
        Usuario no autorizado
      </Typography>
    </Container>
    </>
  )
}