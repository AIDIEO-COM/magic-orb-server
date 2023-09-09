import { cx } from "../hooks/helpers"

const Input = ({ label, type, icon, error, ...props }) => {
    return (
        <div className="relative">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative">

                <input
                    type={type ? type : 'text'}
                    className={cx(
                        error ? "border-meta-1 focus:border-meta-1" : "border-stroke focus:border-primary",
                        "w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none  focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    )}
                    {...props}
                />

                {icon ? <span className="absolute right-4 top-4">{icon}</span> : null}
            </div>

            {error && (
                <span className="text-xs ml-1 text-meta-1 absolute -bottom-5 left-0">
                    {error}
                </span>
            )}
        </div>
    )
}

export default Input