import React from "react";
import CircleLoading from "../icons/CircleLoading";
import { cx } from "../hooks/helpers";

const Button = ({ isLoading, text, classes }) => {
    return (
        <button
            type="submit"
            className={
                cx(
                    classes,
                    isLoading && 'flex items-center',
                    "px-4 rounded bg-primary py-2 font-medium text-gray disabled:bg-secondary"
                )
            }
            disabled={isLoading}
        >
            {isLoading && <CircleLoading />}

            {text}
        </button>
    );
};

export default Button;
