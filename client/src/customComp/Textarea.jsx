import React from "react";
import { cx } from "../hooks/helpers";

const Textarea = ({ label, type, icon, error, value, ...props }) => {
    return (
        <div className="relative">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative">
                <textarea
                    className={cx(
                        "w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary",
                        error ? "border-meta-1 focus:border-meta-1" : "border-stroke",
                        "dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary resize-none"
                    )}
                    value={value}
                    {...props}
                />
                {icon && (
                    <span className="absolute right-4 top-4">{icon}</span>
                )}
            </div>
            {error && (
                <span className="text-xs ml-1 text-meta-1 absolute bottom-0 left-0">
                    {error}
                </span>
            )}
        </div>
    );
};

export default Textarea;
