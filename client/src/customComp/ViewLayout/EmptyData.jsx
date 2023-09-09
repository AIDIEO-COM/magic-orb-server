import React from 'react'
import { cx } from '../../hooks/helpers'

const EmptyData = ({ height, errorMsg }) => {
    return (
        <div className={cx(
            'f-center mt-8 cardLayout py-6 px-5',
            height ? 'h-[62vh]' : 'h-screen'
        )}
        >
            <p className='text-[18px] text-error-hover font-medium'>
                {errorMsg ? 'There is currently a server-side error.' : 'There are presently no records available.'}
            </p>
        </div>
    )
}

export default EmptyData