import React, { useState } from 'react'
import CardLayout from '../../../customComp/ViewLayout/CardLayout'
import { useGetDefaultMagicORBChatQuery } from '../../../redux-rtk/features/tool/toolApi';
import MagicORBForm from './partials/MagicORBForm';
import OtherFieldsFrom from './partials/OtherFieldsFrom';
import { cx } from '../../../hooks/helpers';
import Button from '../../../customComp/Button';

const tabClass = 'bg-bodydark2'
const tabActiveClass = 'bg-meta-5'

const MagicORBUpdate = () => {

    // get default chat from redux api
    const { data: chat, isLoading, isError, isSuccess } = useGetDefaultMagicORBChatQuery();

    // states
    const [tab, setTab] = useState(1);

    return (
        <CardLayout isLoading={isLoading} isError={isError} isSuccess={isSuccess} title='Update Magic ORB'>

            <div className='mt-6'>

                <div className='flex gap-3 mb-6'>
                    <Button
                        onClick={() => setTab(1)}
                        classes={tab === 1 ? tabActiveClass : tabClass}
                        text='Default Chat'
                    />
                    <Button
                        classes={tab === 2 ? tabActiveClass : tabClass}
                        onClick={() => setTab(2)}
                        text='Others'
                    />
                </div>

                {tab === 1 ? <MagicORBForm
                    content={chat?.data.content}
                /> : <OtherFieldsFrom
                    data={chat?.data}
                />}

            </div>

        </CardLayout>
    )
}

export default MagicORBUpdate