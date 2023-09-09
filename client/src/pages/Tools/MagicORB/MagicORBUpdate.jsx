import React from 'react'
import CardLayout from '../../../customComp/ViewLayout/CardLayout'
import Textarea from '../../../customComp/Textarea'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Button from '../../../customComp/Button';

const orbDefSchema = Yup.object().shape({
    content: Yup.string().required("Password is required"),
});

const MagicORBUpdate = () => {

    // globals
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(orbDefSchema) });

    // handler
    const onSubmit = () => {

    }

    return (
        <div>
            <CardLayout isNotInitalized title='Update Magic ORB'>

                <div className='mt-6'>
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

                        <Button />
                    </form>


                </div>

            </CardLayout>
        </div>
    )
}

export default MagicORBUpdate