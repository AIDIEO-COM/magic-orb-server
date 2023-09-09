import React from 'react'
import Loading from './Loading';
import EmptyData from './EmptyData';

const CardLayout = ({ children, title, isLoading, isError, isSuccess, isNotInitalized }) => {

    {/* error and loading */ }
    if (isLoading) return <Loading height />
    if (!isLoading && isError) return <EmptyData height errorMsg />

    if (isSuccess && !isLoading && !isError) return (
        <div className='mt-8 bg-primary-50 shadow-md rounded-md pt-6 pb-10 px-5'>

            <h1 className='text-gray-600 text-[22px] font-medium font-secondary'>{title}</h1>
            <div className='border-t border-gray-300 mt-2 mb-4'></div>

            {children}
        </div>
    )

    if (isNotInitalized) return <div className='mt-8 bg-primary-50 shadow-md rounded-md pt-6 pb-10 px-5'>

        <h1 className='text-gray-600 text-[22px] font-medium font-secondary'>{title}</h1>
        <div className='border-t border-gray-300 mt-2 mb-4'></div>

        {children}
    </div>

    return <></>
}

export default CardLayout