import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../redux-rtk/features/user/userApi';
import Breadcrumb from '../../components/Breadcrumb';
import CardLayout from '../../customComp/ViewLayout/CardLayout';
import UpdateUserForm from './partials/UpdateUserForm';

const EditUser = () => {

    //global
    const { userId } = useParams();

    // get user from rtk
    const { data: user, isLoading, isError, isSuccess } = useGetUserQuery(userId);

    return (
        <>
            <Breadcrumb pageName="Update Users" />

            <CardLayout
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                title={`User (${user?.data?.email})`}
            >

                <div className='mt-6'>
                    <UpdateUserForm
                        data={user?.data}
                        userId={userId}
                    />
                </div>

            </CardLayout>
        </>
    )
}

export default EditUser