import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LinkCard from '../../components/LinkCard/LinkCard';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../context/auth.Context';
import { UseHttp } from '../../hooks/http.hook';
const Details = () => {
  const {token} = useContext(AuthContext);
  const { request, loading } = UseHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) { }
  }, [token, linkId, request])
  useEffect(() => {
    getLink()
  }, [getLink])
  if (loading) {
    return <Loader />
  }
  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  )
}

export default Details