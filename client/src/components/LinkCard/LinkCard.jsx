import React from 'react'

const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your Link: <a href={link.to} target="_blank" rel='noopener noreferrer' >{link.to}</a> </p>
            <p>Where: <a href={link.from} target="_blank" rel='noopener noreferrer' >{link.from}</a> </p>
            <p>number link: <strong>{link.clicks}</strong> </p>
            <p>Date created: <strong>{new Date(link.date).toLocaleString()}</strong></p>
        </>
    )
}

export default LinkCard