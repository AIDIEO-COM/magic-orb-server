import React from 'react'
import Textarea from '../../../../customComp/Textarea'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Button from '../../../../customComp/Button';
import { useUpdateMagicORBChatMutation } from '../../../../redux-rtk/features/tool/toolApi';

const orbDefSchema = Yup.object().shape({
    content: Yup.string().required("Password is required"),
});

const MagicORBForm = ({ content }) => {

    // update rtk
    const [updateMagicORBChat, { isLoading }] = useUpdateMagicORBChatMutation();

    // globals
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(orbDefSchema),
        defaultValues: {
            content: content,
        },
    });

    // handler
    const onSubmit = (updatedData) => {
        updateMagicORBChat(updatedData)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            rows={7}
                            label="Default Message"
                            onChange={field.onChange}
                            error={errors.content?.message}
                            value={field.value}
                            placeholder="Please enter your default message"
                        />
                    )}
                />

                <div className='flex justify-end mt-2'>
                    <Button
                        text='Update Message'
                        isLoading={isLoading}
                    />
                </div>

            </form>
        </>
    )
}

export default MagicORBForm