import React, { useState, useContext, useCallback, useEffect } from 'react';
import { UseHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/auth.Context';
import Loader, {} from '../../components/Loader/Loader';
import LinksList from '../../components/LinksList/LinksList';
const Links = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = UseHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', "GET", null, {
        authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) { }
  }, [request, token])
  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])
  if(loading) {
    return <Loader/>
  }
  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}

export default Links