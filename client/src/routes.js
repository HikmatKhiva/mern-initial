import React from 'react';
import { Routes, Route, useNavigate, Navigate, NavLink } from 'react-router-dom';
import { Auth, Create, Details, Links } from './pages/export';
export const useRoutes = (isAuthenticated) => {
    const navigate = useNavigate();
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/links' element={<Links />} />
                <Route path='/create' element={<Create />} />
                <Route path='/detail/:id' element={<Details />} />
                <Route path='*' element={<NavLink to='/create' replace />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='*' element={<NavLink to='/' replace />} />
        </Routes>
    )
}