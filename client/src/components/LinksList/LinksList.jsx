import React from 'react';
import { Link } from 'react-router-dom';

const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className='center'>Link not created</p>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>N</th>
                    <th>Original</th>
                    <th>Decrement</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                               <Link to={`/detail/${link._id}`}>Open</Link> 
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}

export default LinksList