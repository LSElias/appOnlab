import React from 'react'
import { Header } from './Header'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from '../themes/theme'
import Container from '@mui/material/Container'
import './css/Login.css'
import { Footer } from './Footer'
import { Toaster } from 'react-hot-toast'

export function Layout ({ children }) {
  return (
    <>
    <Toaster position='top-center'/>
        {children}
    <Footer/>
    </>
  )
}
