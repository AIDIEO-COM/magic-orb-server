import React, { useEffect, useState } from 'react'
import Button from '../../../../customComp/Button';
import Input from '../../../../customComp/Input';
import { BsArrowRightShort } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useUpdateMagicORBOthersDefaultMutation } from '../../../../redux-rtk/features/tool/toolApi';
import toast from 'react-hot-toast';
import SelectCustom from '../../../../customComp/SelectCustom';
import { cx } from '../../../../hooks/helpers';

export const gptVersions = [
    { _id: 'xyz', label: 'Select GPT version', value: '' },
    { _id: "gpt-3.5-turbo", label: "gpt-3.5-turbo", value: "gpt-3.5-turbo" },
    { _id: "gpt-4", label: "gpt-4", value: "gpt-4" },
]

const OtherFieldsFrom = ({ data }) => {

    // update rtk
    const [updateMagicORBOthersDefault, { isLoading }] = useUpdateMagicORBOthersDefaultMutation();

    // states
    const [newFilterItem, setNewFilterItem] = useState('');
    const [filterFields, setFilterFields] = useState([]);
    const [selectGPTVersion, setSelectGPTVersion] = useState(gptVersions[0])

    // setting api filter data
    useEffect(() => {
        setFilterFields(data.filterFields);
        setSelectGPTVersion(gptVersions.find((item) => item.value === data.gptVersion))
    }, [data])

    // adding and removing filter field
    const handleAddFilterFieldItem = (newItem) => {

        if (!newItem) {
            toast.error('Please enter something to add!')
            return;
        }

        setFilterFields([...filterFields, newItem]);
        setNewFilterItem('')
    }

    const handleRemoveFilterFieldItem = (i) => {
        setFilterFields(filterFields.filter(item => item !== filterFields[i]));
    }

    // handler
    const onSubmit = (e) => {
        e.preventDefault();

        if (filterFields.length === 0) {
            toast.error('Please add atleast one item to filter fields!');
            return;
        }

        if (selectGPTVersion?.value === '') {
            toast.error('Please select GPT version!');
            return;
        }

        const updatedData = {
            filterFields,
            gptVersion: selectGPTVersion.value
        }

        updateMagicORBOthersDefault({
            defaultId: data._id, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>

                <SelectCustom
                    value={selectGPTVersion}
                    defaultValue={selectGPTVersion}
                    onChange={(option) => setSelectGPTVersion(option)}
                    options={gptVersions}
                    label='Select GPT Version'
                    placeHolder='Select GPT Version'
                    required
                // error={error.city}
                />

                <div className='mt-4'>

                    <p className="mb-2.5 block font-medium text-black dark:text-white">
                        Filterable Fields
                    </p>

                    <ul className={cx(
                        'my-4 ',
                        filterFields.length && 'flex flex-wrap gap-x-3 gap-y-4'
                    )}>
                        {!filterFields.length ? <div className='flex items-center justify-center text-danger'>No items are there.</div> : <>
                            {filterFields.map((item, index) => (
                                <li
                                    key={`fieldF${index}`}
                                    className='flex items-center w-max gap-x-1 border border-dashed px-2 py-1 text-[16px] font-medium'
                                >
                                    <div className='flex items-center'>
                                        <BsArrowRightShort className='text-[26px]' />
                                        <span className='text-black'>{item}</span>
                                    </div>


                                    <div className='flex items-center'>
                                        <button
                                            className='text-danger ml-4'
                                            onClick={() => handleRemoveFilterFieldItem(index)}
                                        >
                                            <RxCrossCircled />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </>}

                    </ul>

                    <div className='flex gap-2'>
                        <div className='flex-1'>
                            <Input
                                placeholder='Add new filterable field'
                                value={newFilterItem}
                                onChange={(e) => setNewFilterItem(e.target.value)}
                            />
                        </div>

                        <Button
                            type='button'
                            text={<AiFillPlusCircle />}
                            onClick={() => handleAddFilterFieldItem(newFilterItem)}
                            disabled={!newFilterItem}
                        />
                    </div>


                </div>

                <div className='flex justify-end mt-6'>
                    <Button
                        text='Update'
                        isLoading={isLoading}
                    />
                </div>

            </form>
        </>
    )
}

export default OtherFieldsFrom