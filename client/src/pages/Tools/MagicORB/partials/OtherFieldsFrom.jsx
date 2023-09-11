import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Button from '../../../../customComp/Button';
import Input from '../../../../customComp/Input';
import { BsArrowRightShort } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useUpdateMagicORBOthersDefaultMutation } from '../../../../redux-rtk/features/tool/toolApi';
import toast from 'react-hot-toast';

const orbOtherDefSchema = Yup.object().shape({
    gptVersion: Yup.string().required("Version field is required"),
});

const OtherFieldsFrom = ({ data }) => {

    // update rtk
    const [updateMagicORBOthersDefault, { isLoading }] = useUpdateMagicORBOthersDefaultMutation();

    // globals
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(orbOtherDefSchema),
        defaultValues: {
            gptVersion: data.gptVersion,
        },
    });

    // states
    const [newFilterItem, setNewFilterItem] = useState('');
    const [filterFields, setFilterFields] = useState([]);

    // setting api filter data
    useEffect(() => {
        setFilterFields(data.filterFields)
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
    const onSubmit = (formData) => {

        if (filterFields.length === 0) {
            toast.error('Please add atleast one item to filter field!s')
        }

        const updatedData = {
            filterFields,
            gptVersion: formData.gptVersion
        }

        updateMagicORBOthersDefault({
            defaultId: data._id, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="gptVersion"
                    control={control}
                    render={({ field }) => (
                        <Input
                            rows={7}
                            label="Chat GPT version"
                            onChange={field.onChange}
                            error={errors.gptVersion?.message}
                            value={field.value}
                            placeholder="Please enter chat gpt version message"
                        />
                    )}
                />

                <div className='mt-4'>

                    <p className="mb-2.5 block font-medium text-black dark:text-white">
                        Filterable Fields
                    </p>

                    <ul className='my-4 space-y-4'>
                        {!filterFields.length ? <div className='flex items-center justify-center text-danger'>No items are there.</div> : <>
                            {filterFields.map((item, index) => (
                                <li
                                    key={`fieldF${index}`}
                                    className='flex items-center justify-between gap-x-1 border border-dashed p-2 text-[20px]'
                                >
                                    <div className='flex items-center'>
                                        <BsArrowRightShort className='text-[28px]' />
                                        <span className='text-black'>{item}</span>
                                    </div>


                                    <div className='flex items-center'>
                                        <button
                                            className='text-danger ml-6'
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