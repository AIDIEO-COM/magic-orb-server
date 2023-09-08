
const Input = ({ label, type, icon, ...props }) => {
    return (
        <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative">

                <input
                    type={type ? type : 'text'}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...props}
                />

                {icon ? <span className="absolute right-4 top-4">{icon}</span> : null}
            </div>
        </div>
    )
}

export default Input