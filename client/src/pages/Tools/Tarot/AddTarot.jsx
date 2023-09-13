import React, { useState } from 'react'
import * as Yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Breadcrumb from '../../../components/Breadcrumb';
import CardLayout from '../../../customComp/ViewLayout/CardLayout';
import Button from '../../../customComp/Button';
import Input from '../../../customComp/Input';
import Textarea from '../../../customComp/Textarea';
import SelectCustom from '../../../customComp/SelectCustom';
import ImageBox from '../../../customComp/ImageBox';
import toast from 'react-hot-toast';
import { useCreateTarotMutation } from '../../../redux-rtk/features/tool/tarotApi';

const addTarotSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    deck: Yup.string().required("Deck is required"),
    meanings: Yup.object().shape({
        upright: Yup.string().required("Upright meaning is required"),
        reversed: Yup.string().required("Reversed meaning is required"),
        advicePosition: Yup.string().required("Advice position is required"),
    }),
});

export const statusOptions = [
    { _id: 'status1', label: 'Select status', value: '' },
    { _id: "status2", label: "Free", value: "free" },
    { _id: "status3", label: "Premium", value: "premium" },
]

const AddTarot = () => {

    // rtk
    const [createTarot, { isLoading, isSuccess }] = useCreateTarotMutation();

    // hook form
    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(addTarotSchema) });

    // states
    const [images, setImages] = useState({ frontImg: '', backImg: '' });
    const [frontImgSrc, setFrontImgSrc] = useState('');
    const [backImgSrc, setBackImgSrc] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[1])

    // image validation
    const handleFrontImageChange = (e) => {
        if (e.target.files === null) return;

        if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG|webp)$/)) {
            setFrontImgSrc('');
            setImages({ ...images, frontImg: '' })
            toast.error('Must be a jpg/png/jpeg/webp file');
        } else {
            setFrontImgSrc(URL.createObjectURL(e.target.files[0]));
            setImages({ ...images, frontImg: e.target.files[0] })
        }
    }

    const handleBackImageChange = (e) => {
        if (e.target.files === null) return;

        if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG|webp)$/)) {
            setBackImgSrc('');
            setImages({ ...images, backImg: '' })
            toast.error('Must be a jpg/png/jpeg/webp file');
        } else {
            setBackImgSrc(URL.createObjectURL(e.target.files[0]));
            setImages({ ...images, backImg: e.target.files[0] })
        }
    }

    // add handler
    const onSubmit = (data) => {

        if (!images.frontImg || !images.backImg) {
            toast.error('Please select both images!');
            return;
        }

        if (selectedStatus?.value === '') {
            toast.error('Please select status of card!');
            return;
        }

        const setData = {
            ...data,
            status: selectedStatus?.value
        }

        var formData = new FormData();
        formData.append('frontImg', images.frontImg);
        formData.append('backImg', images.backImg);
        formData.append('data', JSON.stringify(setData));

        createTarot(formData);
        if (isSuccess) {
            reset();
        }
    }

    return (
        <>
            <Breadcrumb pageName="Add Tarot" />

            <CardLayout
                isNotInitalized
                title={`Add Tarot Card`}
            >

                <div className='mt-6'>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex gap-x-5 justify-center mb-6'>
                            <ImageBox
                                // demoImgSrc={!editPage ? (imgSrc ? imgSrc : '/globals/demo-user.png') : (imgSrc ? imgSrc : input.image ? `${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}${input.image}` : '/globals/demo-user.png')}
                                demoImgSrc={frontImgSrc ? frontImgSrc : '/vite.svg'}
                                name='frontImg'
                                imgCss=' h-[130px] w-[250px]'
                                label={`Choose front image`}
                                onChange={handleFrontImageChange}
                                alt='front image'
                            />
                            <ImageBox
                                demoImgSrc={backImgSrc ? backImgSrc : '/vite.svg'}
                                name='backImg'
                                imgCss=' h-[130px] w-[250px]'
                                label={`Choose back image`}
                                onChange={handleBackImageChange}
                                alt='back image'
                            />
                        </div>


                        <div className="grid lg:grid-cols-2 gap-x-5 gap-y-7">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Name"
                                        id="name"
                                        placeholder="Name"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="deck"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Deck"
                                        id="deck"
                                        placeholder="Enter deck name"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.deck?.message}
                                    />
                                )}
                            />

                            <div className='lg:col-span-2'>
                                <SelectCustom
                                    value={selectedStatus}
                                    defaultValue={selectedStatus}
                                    onChange={(option) => setSelectedStatus(option)}
                                    options={statusOptions}
                                    label='Select Status'
                                    placeHolder='Select status'
                                    required
                                // error={error.city}
                                />
                            </div>

                            <div className='lg:col-span-2'>
                                <Controller
                                    name="meanings.upright"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            label="Upright meaning"
                                            id="upright"
                                            placeholder="Enter upright meaning"
                                            value={field.value}
                                            rows={5}
                                            onChange={field.onChange}
                                            error={errors.meanings?.upright?.message}
                                        />
                                    )}
                                />
                            </div>

                            <div className='lg:col-span-2'>
                                <Controller
                                    name="meanings.reversed"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            label="Reversed meaning"
                                            id="reversed"
                                            placeholder="Enter reversed meaning"
                                            value={field.value}
                                            rows={5}
                                            onChange={field.onChange}
                                            error={errors.meanings?.reversed?.message}
                                        />
                                    )}
                                />
                            </div>

                            <div className='lg:col-span-2'>
                                <Controller
                                    name="meanings.advicePosition"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            label="Advice Position"
                                            id="advicePosition"
                                            placeholder="Enter advice position meaning"
                                            value={field.value}
                                            rows={5}
                                            onChange={field.onChange}
                                            error={errors.meanings?.advicePosition?.message}
                                        />
                                    )}
                                />
                            </div>



                        </div>

                        <div className="mt-5 flex justify-end">
                            <Button
                                text='Add Tarot Card'
                                isLoading={isLoading}
                            />
                        </div>
                    </form>

                </div>

            </CardLayout>
        </>
    )
}

export default AddTarot