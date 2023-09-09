import React from 'react'
import CardLayout from '../../../customComp/ViewLayout/CardLayout'
import { useGetDefaultMagicORBChatQuery } from '../../../redux-rtk/features/tool/toolApi';
import MagicORBForm from './partials/MagicORBForm';

const MagicORBUpdate = () => {

    // get default chat from redux api
    const { data: chat, isLoading, isError, isSuccess } = useGetDefaultMagicORBChatQuery();

    return (
        <CardLayout isLoading={isLoading} isError={isError} isSuccess={isSuccess} title='Update Magic ORB'>

            <div className='mt-6'>
                <MagicORBForm
                    content={chat?.data.content}
                />
            </div>

        </CardLayout>
    )
}

export default MagicORBUpdate