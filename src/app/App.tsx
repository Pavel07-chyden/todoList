import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';

import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { AppRootStateType } from './store'
import { initializeAppTC, RequestStatusType } from './app-reducer'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Login } from '../features/TodolistsList/Login/Login'
import CircularProgress from '@mui/material/CircularProgress'
import { logoutTC } from '../features/TodolistsList/Login/auth-reducer'


type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    })
    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>

                <Routes>
                    <Route path="*" element={<h1 style={{ textAlign: 'center' }}> 404 page not found</h1>} />
                    <Route path="/" element={<TodolistsList demo={demo} />} />
                    <Route path="login" element={<Login />} />


                </Routes>

            </Container>
        </div>
    )
}

export default App
