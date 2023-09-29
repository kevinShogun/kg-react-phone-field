import React from "react"
import { PropsList, listCountriesCodes } from "../utils/getCountries"

interface SelectPhoneNumberProps {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    value?: string
    listOfProperties: PropsList,
    defaultCountryNumber: number,
    containerClassName?: string,
    selectClassName?: string,
    defaultStyles?: boolean,
    language?: 'en' | 'es',
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
    outline: 'none',
}
export const SelectPhoneNumber = ({
    defaultCountryNumber, onChange, value,
    listOfProperties, containerClassName,
    selectClassName, defaultStyles = true, language = 'es'
}: SelectPhoneNumberProps) => {

    /**
     * Renders a dropdown select input for selecting a phone number.
     * 
     * @param {number} defaultCountryNumber - The default country number to be pre-selected in the select input.
     * @param {function} onChange - A callback function to be called when the selected value in the select input changes.
     * @param {string} value - The currently selected value in the select input.
     * @param {array} listOfProperties - An array of property names to be displayed as options in the select input.
     * @param {string} containerClassName - The CSS class name for the container div element.
     * @param {string} selectClassName - The CSS class name for the select input element.
     * @param {boolean} defaultStyles - Determines whether to apply default styles to the container and select elements. Default is true.
     * @param {string} language - The language code ('en' or 'es') used to display the country names in the select input. Default is 'es'.
     * 
     * @returns {JSX.Element} - The rendered JSX elements representing the select input and its options.
     */
    return (
        <div
            style={defaultStyles ? stylesContainer : {}}
            className={containerClassName}
        >
            <select
                style={defaultStyles ? stylesSelect : {}}
                className={selectClassName}
                value={value}
                onChange={e => {
                    if (e.target.value) {
                        if (typeof onChange === 'function') onChange(e)
                    }
                }}
            >
                {
                    listCountriesCodes(listOfProperties, defaultCountryNumber, language).map((country) => {
                        if (country) {
                            switch (listOfProperties.length) {
                                case 1:
                                    return <option value={country[listOfProperties[0]]}>{
                                        country[listOfProperties[0]]
                                    }</option>
                                case 2:
                                    return <option value={country[listOfProperties[0]]}>{
                                        country[listOfProperties[0]]
                                    } ( + {country[listOfProperties[1]]} )</option>
                                case 3:
                                    return <option value={country[listOfProperties[0]]}>{
                                        country[listOfProperties[0]]
                                    } ({country[listOfProperties[1]]}) +{country[listOfProperties[2]]}</option>
                            }
                        }else{
                            return <option value={''}>{''}</option>
                        }
                    })
                }
            </select>

        </div>
    )
}

export default SelectPhoneNumber