const handleImageChange = (e) => {
    if (e.target.files === null) return;

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG|webp)$/)) {
        setImgSrc('');
        setImages({ ...images, frontImg: '' })
        toast.error('Must be a jpg/png/jpeg/webp file');
    } else {
        setImgSrc(URL.createObjectURL(e.target.files[0]));
        setImages({ ...images, frontImg: e.target.files[0] })
    }
}