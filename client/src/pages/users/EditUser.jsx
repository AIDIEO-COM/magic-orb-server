import React from 'react'
import { useParams } from 'react-router-dom';

const EditUser = () => {

    const { userId } = useParams();

    return (
        <div>EditUser {userId}</div>
    )
}

export default EditUser