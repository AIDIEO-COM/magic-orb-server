import React from 'react'
import Select from 'react-select';

const SelectCustom = ({ label, options, defaultValue, onChange, value, id, placeHolder, isSearchable, required, isLoading, error }) => {

    const customStyle = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '44px',
            border: state.menuIsOpen || state.isFocused ? error ? "2px solid #F04438" : "2px solid #3C50E0" : error ? "2px solid #F04438" : "2px solid #E5E7EB",
            borderRadius: '8px',
            cursor: 'pointer',
            outline: 'none',
            '&:focus': {
                borderColor: error ? "#F04438" : '#3C50E0',
            },
            '&:hover': {
                borderColor: error ? "#F04438" : '#d7d9f3',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#80CAEE' : 'transparent',
            color: state.isSelected ? 'white' : '#6B7280',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? '#3C50E0' : '#e5e7eb',
                color: state.isSelected ? 'white' : '#4B5563'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#6B7280",
        }),
        dropdownIndicator: base => ({
            ...base,
            '&:hover': {
                color: "#d7d9f3",
            }
        }),
    };

    return (
        <div className="mt-0.5 scrollbar">
            {label && <label
                htmlFor={id}
                className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>}

            <div className="mt-1">
                <Select
                    options={options}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    styles={customStyle}
                    isSearchable={isSearchable ? isSearchable : false}
                    placeholder={placeHolder}
                    className='w-full capitalize'
                    required={required}
                    isLoading={isLoading}
                />
            </div>

            {error && (
                <span className="text-xs ml-1 text-error-hover absolute -bottom-5 left-0">
                    {error}
                </span>
            )}

        </div>
    )
}

export default SelectCustom

