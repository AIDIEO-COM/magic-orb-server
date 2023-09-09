import React from 'react'
import * as Yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../../customComp/Input';

const addUserSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    phoneNo: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    country: Yup.string().required("Country is required"),
});

const UserForm = ({ onSubmit }) => {

    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(addUserSchema) });

    // const handleSubmit = () => {
    //     onSubmit();
    // }

    return (
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
                        // icon={<PasswordLockIcon />}
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
    )
}

export default UserForm