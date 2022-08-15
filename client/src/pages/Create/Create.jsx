import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.Context';
import { UseHttp } from '../../hooks/http.hook';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [link, setLink] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  const { request } = UseHttp()
  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', "POST", { from: link }, {
          authorization: `Bearer ${auth.token}`  
        });
        navigate(`/detail/${data.link._id}`)
      } catch (e) {

      }
    }
  }

  return (
    <div className='row'>
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Write Link</label>
        </div>
      </div>
    </div>
  )
}

export default Create