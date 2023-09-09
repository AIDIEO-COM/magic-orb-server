import Breadcrumb from '../../components/Breadcrumb';
import CardLayout from '../../customComp/ViewLayout/CardLayout';
import { cx } from '../../hooks/helpers';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux-rtk/features/user/userApi';
import DataTable from 'react-data-table-component';
import { IoTrash, IoCogOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';

const Users = () => {

    // hooks
    const { sendDeleteRequest } = useDelete();

    // get users from rtk
    const { data: users, isLoading, isError, isSuccess } = useGetUsersQuery();
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

    // datas
    const columns = [
        // {
        {
            name: 'Username',
            selector: row => row.username,
            // filterable: true,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            filterable: true,
        },
        {
            name: 'Role',
            selector: row => <span
                className={cx(
                    row.role === 'user' ? 'bg-primary' : 'bg-danger',
                    'px-5 text-white rounded-lg capitalize'
                )}>
                {row.role}
            </span>,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='flex gap-1.5 items-center'>
                    <Link
                        to={`/edit-user/${row._id}`}
                        className='text-primary text-[24px] hover:text-secondary trans relative top-[1px]'
                    >
                        <IoCogOutline />
                    </Link>

                    <button
                        className='text-cancelled text-[24px] hover:text-danger trans disabled:text-form-strokedark'
                        disabled={deleteLoading}
                        onClick={() => sendDeleteRequest(row._id, deleteUser)}
                    >
                        <IoTrash />
                    </button>
                </div>
            ),
        },
    ];


    return (
        <>
            <Breadcrumb pageName="All Users" />

            <CardLayout
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                title={`Users (${users?.data?.meta?.count})`}
            >

                <div className='mt-6'>
                    <DataTable
                        columns={columns}
                        data={users?.data?.datas}
                        highlightOnHover
                        progressPending={isLoading || deleteLoading}
                        pagination
                        persistTableHead={true}
                    />
                </div>

            </CardLayout>
        </>
    )
}

export default Users