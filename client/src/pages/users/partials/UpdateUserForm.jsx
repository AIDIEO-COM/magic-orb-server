import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Input from '../../../customComp/Input';
import Button from '../../../customComp/Button';
import { useUpdateUserMutation } from '../../../redux-rtk/features/user/userApi';

const editUserSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    username: Yup.string().required("Username is required"),
    phoneNo: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .test('min-length', 'Password must be at least 6 characters long', (value) => {
            if (!value) {
                return true;
            }
            return value.length >= 6;
        }),
    country: Yup.string().required("Country is required"),
});

const UpdateUserForm = ({ data, userId }) => {

    // update rtk
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    // globals
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(editUserSchema),
        defaultValues: {
            firstName: data?.firstName,
            lastName: data?.lastName,
            username: data?.username,
            email: data?.email,
            phoneNo: data?.phoneNo,
            country: data?.country,
        },
    });

    // handler
    const onSubmit = (updatedData) => {
        console.log(updatedData);
        updateUser({
            userId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid lg:grid-cols-2 gap-x-5 gap-y-7">
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Firstname"
                            id="firstName"
                            placeholder="Firstname"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.firstName?.message}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Lastname"
                            id="lastName"
                            placeholder="Lastname"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.lastName?.message}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="magicorb@gmail.com"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Username"
                            id="username"
                            placeholder="magicorb"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.username?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.password?.message}
                        />
                    )}
                />

                <Controller
                    name="phoneNo"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Phone Number"
                            id="phoneNo"
                            placeholder="Enter your phone number"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.phoneNo?.message}
                        />
                    )}
                />

                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Country"
                            id="country"
                            placeholder="Enter your country"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.country?.message}
                        />
                    )}
                />
            </div>

            <div className="mt-5 flex justify-end">
                <Button
                    text='Update User'
                    isLoading={isLoading}
                />
            </div>
        </form>
    )
}

export default UpdateUserForm