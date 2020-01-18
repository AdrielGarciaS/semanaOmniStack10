import React, { useState } from 'react';
import { DiTerminal } from 'react-icons/di';

import { Container, Select } from './styles';

export default function InputCreatable({ icon, fowardRef, ...rest }) {
  const [values, setValues] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleChange(updateValue, actionMeta) {
    if (values) {
      setValues(updateValue);
    }
  }

  function handleInputChange(input) {
    setInputValue(input);
  }

  function createOption(label) {
    return {
      label,
      value: label,
    };
  }

  function handleKeyDown(event) {
    if (!inputValue) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case 'Tab':
      case ',':
        setInputValue('');
        if (values) {
          const existValue = values.find(v => v.value === inputValue);
          if (!existValue) {
            setValues([...values, createOption(inputValue)]);
          }
        } else {
          setValues([createOption(inputValue)]);
        }

        event.preventDefault();
        break;
      default:
    }
  }

  return (
    <Container>
      <Select
        {...rest}
        value={values}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        components={{ DropdownIndicator: null }}
        menuIsOpen={false}
        ref={fowardRef}
        isClearable
        isMulti
        styles={{
          control: (base, state) => ({
            ...base,
            border: '0',
            boxShadow: '0',
            '&:hover': {
              border: '0',
            },
          }),
        }}
      />
      <DiTerminal size={35} color="rgba(0,0,0, 0.8)" />
    </Container>
  );
}
