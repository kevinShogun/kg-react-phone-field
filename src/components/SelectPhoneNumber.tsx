import React from 'react'
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

import { PropsList, listCountriesCodes } from "../utils/getCountries"

interface SelectPhoneNumberProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (value: any) => void;
    value?: string
    listOfProperties: PropsList,
    defaultCountryNumber: number,
    containerClassName?: string,
    selectClassName?: string,
    defaultStyles?: boolean,
    language?: 'en' | 'es',
    label?: string,
    labelClassName?: string,
    /*** React Select Props */
    withReactSelect?: boolean,
    reactSelectCustomStyles?: StylesConfig,
    reactSelectDefaultValues?: {
        label: string,
        value: unknown,
    },
    
}

const stylesContainer = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    padding: '0.5rem',
    boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
}

const stylesSelect = {
    width: '100%',
    height: '100%',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
}
const SelectPhoneNumber = ({
    defaultCountryNumber, onChange, value,
    listOfProperties, containerClassName,
    selectClassName, defaultStyles = true, language = 'es',
    label, labelClassName,
    reactSelectCustomStyles,
    reactSelectDefaultValues,
    withReactSelect = false,
}: SelectPhoneNumberProps) => {

    const list = listCountriesCodes(listOfProperties, defaultCountryNumber, language);
    const options = list.map((country) => {
        if (country) return { label: country[listOfProperties[0]], value: country }
        else return null
    });
    const animatedComponents = makeAnimated();

    if (withReactSelect) {
        return (
            <Select
                options={options}
                onChange={onChange}
                components={animatedComponents}
                styles={reactSelectCustomStyles}
                defaultValue={reactSelectDefaultValues}
            />
        )
    } else {
        return (
            <div
                style={defaultStyles ? stylesContainer : {}}
                className={containerClassName}
            >
                <label
                    style={
                        defaultStyles ? {
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            lineHeight: '1.5rem',
                        } : {}}
                    className={labelClassName}
                >
                    {label}
                    <select
                        style={defaultStyles ? stylesSelect : {}}
                        className={selectClassName}
                        value={value}
                        onChange={
                            (e) => {
                                if (typeof onChange === 'function') onChange(e.target.value)
                            }
                        }
                    >
                        {
                            listCountriesCodes(listOfProperties, defaultCountryNumber, language).map((country, index) => {
                                if (country) {
                                    switch (listOfProperties.length) {
                                        case 1:
                                            return <option
                                                key={`${country[listOfProperties[0]]}__${index}`}
                                                value={country[listOfProperties[0]]}>{
                                                    country[listOfProperties[0]]
                                                }</option>
                                        case 2:
                                            return <option
                                                key={`${country[listOfProperties[0]]}__${index}`}
                                                value={country[listOfProperties[0]]}>{
                                                    country[listOfProperties[0]]
                                                } ( + {country[listOfProperties[1]]} )</option>
                                        case 3:
                                            return <option
                                                key={`${country[listOfProperties[0]]}__${index}`}
                                                value={country[listOfProperties[0]]}>{
                                                    country[listOfProperties[0]]
                                                } ({country[listOfProperties[1]]}) +{country[listOfProperties[2]]}</option>
                                    }
                                }else{
                                    return null
                                }
                            })
                        }
                    </select>
                </label>
            </div>
        )
    }
}

export default SelectPhoneNumber