import React from 'react';
import { useRoutes } from './routes';
import { AuthContext } from './context/auth.Context';
import { useAuth } from './hooks/auth.hook';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import "materialize-css";

function App() {
  const { login, logout, token, userId, ready} = useAuth();
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);
  if(!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      <div className="App">
        {isAuthenticated && <Header />}
        <div className='container'>
          {routes}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
