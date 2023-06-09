import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

export function Footer () {
  return (
    <Box
      sx={{
        display:'block',
        position: 'fixed',
        bottom: 0,
        marginTop: '1rem',
        width: '100%',
        height: '2rem',
        backgroundColor: 'transparent',
        paddingBottom: '1.5rem'
      }}
    >
      <Container maxWidth='lg'>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12}>
            <Typography color='textSecondary' variant='subtitle1'>
            © ONLAB
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='textSecondary' variant='body1'>
              {`${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
