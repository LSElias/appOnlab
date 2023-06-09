import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Layout } from './components/Layout'
import { Login } from './components/Login'
import { Footer } from './components/Footer'
import { Registro } from './components/Registro'
import { 
   createBrowserRouter, 
    RouterProvider 
  }  from 'react-router-dom'
import { Principal } from './components/Principal'
import { Loader } from './components/Loader'
import { Alergias } from './components/AlergiaForms/Alergias'
import { Enfermedades } from './components/EnfermedadForms/Enfermedades'
import { Medicamentos } from './components/MedicamentoForm/Medicamentos'
import { AlergiasForm } from './components/AlergiaForms/AlergiasForm'
import { EnfermedadesForm } from './components/EnfermedadForms/EnfermedadesForm'
import { MedicamentosForm } from './components/MedicamentoForm/MedicamentosForm'
import { Horario } from './components/HorarioForms/Horario'
import { HorarioForm } from './components/HorarioForms/HorarioForm'
import { HorarioDetail } from './components/HorarioForms/HorarioDetail'
import { Logout } from './components/Logout'
import  UserProvider  from './components/UserProvider'
import ListAlergia from './components/AlergiaForms/AlergiasList'
import ListEnfermedades from './components/EnfermedadForms/EnfermedadesList'
import ListMedic from './components/MedicamentoForm/MedicamentosList'
import { UsuarioForm } from './components/UsuarioForms/UsuarioForm'
import { Usuario } from './components/UsuarioForms/Usuarios'
import { VerifyForm } from './components/UsuarioForms/VerifyForm'
import { UnverifyForm } from './components/UsuarioForms/UnverifyForm'
import { Consultorio } from './components/ConsultorioForms/Consultorios'
import { ConsultorioForm } from './components/ConsultorioForms/ConsultoriosForm'
import { Cita } from './components/Cita'
import AgendaProvider from './components/AgendaProvider'
import { Expediente } from './components/Expediente/Expediente'
import { ExpedienteForm } from './components/Expediente/ExpedientesForm'
import ExpedienteDetail from './components/Expediente/ExpedienteDetail'
import { CompartirForm } from './components/Expediente/CompartirExp'
import { CitaCliente } from './components/CitaCliente'
import { CitaForm } from './components/CitaForm'
import { CitasListado } from './components/CitasListado'
import { CitasDetail } from './components/CitasDetail'
import { UsuarioDetail } from './components/UsuarioForms/UsuarioDetail'
import { Preferencias } from './components/Preferencias'
import { PreferenciasPerfil } from './components/PreferenciasPerfil'
import { PreferenciasContrasena } from './components/PreferenciasContrasena'
import { ReporteMedico } from './components/Reportes/ReporteMedico'
import { ReporteDias } from './components/Reportes/ReporteDias'
import { Auth } from './components/Auth'
import { Unauthorized } from './components/Unauthorized'



const router=createBrowserRouter([
  {
    path:'/',
    element:<Principal />
  },
  {path:'/login',
  element:<Login/>},
  {
    path:'/registro/',
    element: <Registro />
  },  
  {
    path: '/',
    element: <Auth allowedRoles={['3']} />,
    children: [
      {
        path:'/agendar/',
        element: <CitaCliente />
      },
      {
        path:'/agendar/cita/:id',
        element: <CitaForm />
      },
      {
        path:'/ver/citas/',
        element: <CitasListado/>
      },
      {
        path:'/ver/citas/:id',
        element: <CitasDetail/>
      },
    ]
  },
  {
    path: '/',
    element: <Auth allowedRoles={['3', '2']} />,
    children: [
      {
        path:'/expedientes',
        element: <Expediente />
      },
      {
        path:'/expediente/:id',
        element: <ExpedienteDetail />
      },
      {
        path:'/expediente/create',
        element: <ExpedienteForm />
      },
      {
        path:'/expediente/update/:id',
        element: <ExpedienteForm />
      },
      {
        path:'/expediente/compartir/',
        element: <CompartirForm />
      },
    ]
  }, 
  {
    path: '/',
    element: <Auth allowedRoles={['2']} />,
    children: [
      { 
        path:'/Consultorios/',
        element: <Consultorio />
      },
      { 
        path:'/Consultorio/create',
        element: <ConsultorioForm />
      },
      { 
        path:'/Consultorio/update/:id',
        element: <ConsultorioForm />
      },
      { 
        path:'/Horario/',
        element: <Horario />
      },  
      { 
        path:'/Horario/:id',
        element: <HorarioDetail />
      },  
      { 
        path:'/Horario/create/',
        element: <HorarioForm />
      },
      { 
        path:'/Horario/update/:id',
        element: <HorarioForm />
      },
      {
        path:'/Citas/',
        element: <Cita />
      }
    ]
  },
  {
    path: '/',
    element: <Auth allowedRoles={['1', '2','3']} />,
    children: [
      {
        path:'/preferencias/',
        element: <Preferencias/>
      },
      {
        path:'/preferencias/perfil',
        element: <PreferenciasPerfil/>
      },
      {
        path:'/preferencias/cambio-contrasena',
        element: <PreferenciasContrasena/>
      },
    ]
  }, 
  {
    path: '/',
    element: <Auth allowedRoles={['1', '2']} />,
    children: [
      {
        path:'/reportes/CantidadRegistro',
        element: <ReporteDias/>
      },
    ]
  },
  {
    path: '/',
    element: <Auth allowedRoles={["1"]} />,
    children: [
      {
        path:'/usuario/',
        element: <Usuario />
      },
      {
        path:'/usuario/:id',
        element: <UsuarioDetail />
      },
      {
        path:'/usuario/create',
        element: <UsuarioForm />
      },   
      {
        path:'/usuario/verify/:id',
        element: <VerifyForm />
      },
      {
        path:'/usuario/unverify/:id',
        element: <UnverifyForm />
      },
      {
        path:'/usuario/update/:id',
        element: <UsuarioForm />
      },
      {
        path:'/reportes/CantidadMedico',
        element: <ReporteMedico/>
      },
      {
        path:'/Alergias',
        element: <Alergias />
      },  
      {
        path:'/Alergias/create',
        element: <AlergiasForm/>
      },
      {
        path:'/Alergias/update/:id',
        element: <AlergiasForm/>
      },
      {
        path:'/Medicamentos',
        element: <Medicamentos />
      },
      {
        path:'/Medicamentos/create',
        element: <MedicamentosForm />
      },
      {
        path:'/Medicamentos/update/:id',
        element: <MedicamentosForm />
      },  
      {
        path:'/Enfermedades',
        element: <Enfermedades />
      },
      {
        path:'/Enfermedades/create',
        element: <EnfermedadesForm />
      },
      {
        path:'/Enfermedades/update/:id',
        element: <EnfermedadesForm />
      },
    ]
  },
  {
    path:'/logout',
    element: <Logout />
  },
  {
    path:'/ver/alergias',
    element: <ListAlergia />
  },
  {
    path:'/ver/medicamentos',
    element: <ListMedic />
  },
  {
    path:'/ver/enfermedades',
    element: <ListEnfermedades />
  },  
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
])

function App() {
  return (
    <>
    <UserProvider>
      <AgendaProvider>
        <Layout>
          <RouterProvider router={router}/>  
        </Layout>
      </AgendaProvider>
    </UserProvider>
    </>
  )
}

export default App
