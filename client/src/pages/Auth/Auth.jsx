import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.Context';
import { UseHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message';
const Auth = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = UseHttp();
  const message = useMessage()
  const [form, setForm] = useState({ email: "", password: "" });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const registerHandler = async (e) => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {

    }
  }
  const loginHandler = async (e) => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId)
    } catch (e) {

    }
  }
  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Link Save</h1>
        <div className='card blue darken-1'>
          <div className="card-content white-text">
            <span className='card-title'>Registratsiya</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  className="validate yellow-input"
                  name='email'
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  className="validate yellow-input"
                  name='password'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button onClick={registerHandler} disabled={loading} className='btn yellow darken-4' style={{ marginRight: 10 }}>Sign Up</button>
            <button onClick={loginHandler} disabled={loading} className='btn grey lighten-1 black-text'>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth