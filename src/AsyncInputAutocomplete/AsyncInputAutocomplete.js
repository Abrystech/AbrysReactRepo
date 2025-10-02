import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Skeleton } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { Input, useHandleOpen } from '../';
import { execHelper } from '../helper';

const TIME = 500;

// More Info Autocomplete
// https://material-ui.com/es/api/autocomplete/

export function AsyncInputAutocomplete({
  requestAction,
  validators,
  defaultInputValue,
  errorMessages,
  icon,
  required,
  label,
  value,
  multiple,
  onChange,
  isLoading,
  onClick,
  skeletonHeight = 48,
  inputVariant,
  composed, // <-- If the input is painting the option with more text, like stars or something else, we need this prop to avoid bugs
  sortedProp,
  ...props
}) {
  const { isOpen, handleClose, handleOpen } = useHandleOpen(false);
  const [input, setInput] = useState('');
  const [internalValue, setInternalValue] = useState(value);
  const [options, setOptions] = useState([]);
  const [startLoading, setStartLoading] = useState(false);
  const hasChosenAnOption = useRef(false);

  useEffect(() => {
    setInput(defaultInputValue);
  }, [defaultInputValue]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  function handleAutocompleteOpen() {
    if (startLoading) {
      handleOpen();
    }
  }

  function handleAutocompleteClose() {
    handleClose();
    setOptions([]);
    setStartLoading(false);
  }

  function onClickOpenButton() {
    setStartLoading(true);
    handleOpen();
    loadRequest();
  }

  function onInputChange(event) {
    hasChosenAnOption.current = false;
    const value = (event && event.target.value) || '';
    setInput(value);

    if (!value) {
      return;
    }

    setStartLoading(true);
    handleOpen();
    execHelper.delayed(() => loadRequest(value), TIME);
  }

  function onChangeValueSingle(event, newValue) {
    setInternalValue(newValue);

    const newInputValue = props.getOptionLabel(newValue || {});
    setInput(newInputValue || '');

    hasChosenAnOption.current = true;

    onChange(event, newValue);
  }

  function handleSelectOption(option) {
    if (!multiple && !composed) {
      setTimeout(() => {
        hasChosenAnOption.current = true;
        setInternalValue(option);
        setInput(option.name);
      }, 100);
    }
  }

  function onBlur(e) {
    if (!multiple && !composed && !hasChosenAnOption.current) {
      setInput('');
      setInternalValue({});
    }
  }

  async function loadRequest(queryString) {
    try {
      const response = await requestAction(queryString);

      // WIP - Workarround, we should refactor the dropdowns to always get data formatted as Id, Name
      if (response) {
        if (sortedProp) {
          setOptions(
              Object.keys(response)
                .map(index => response[index])
                .sort((a, b) => a[sortedProp].localeCompare(b[sortedProp]))
            );
        } else {
          if (response[0].name) {
            setOptions(
              Object.keys(response)
                .map(index => response[index])
                .sort((a, b) => a.name.localeCompare(b.name))
            );
          } else if (response[0].reference) {
            setOptions(
              Object.keys(response)
                .map(index => response[index])
                .sort((a, b) => a.reference.localeCompare(b.reference))
            );
          } else if (response[0].alias) {
            setOptions(
              Object.keys(response)
                .map(index => response[index])
                .sort((a, b) => a.alias.localeCompare(b.alias))
            );
          } else {
            setOptions(Object.keys(response).map(index => response[index]));
          }
        }
      
        setStartLoading(false);
      }
    } catch (error) {
      setStartLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Skeleton height={skeletonHeight} />
      ) : (
        <Autocomplete
          {...props}
          variant="standard"
          value={internalValue}
          open={isOpen}
          onOpen={handleAutocompleteOpen}
          multiple={multiple}
          onClose={handleAutocompleteClose}
          options={options}
          onInputChange={onInputChange}
          inputValue={input || ''}
          onChange={multiple ? onChange : onChangeValueSingle}
          onBlur={onBlur}
          onClick={onClick ?? null}
          loading={startLoading}
          popupIcon={<ArrowDropDownIcon onClick={onClickOpenButton} />}
          // Agrega un evento onClick al contenedor de las opciones
          {...(!composed
            ? { renderOption: option => <div onClick={() => handleSelectOption(option)}>{option.name}</div> }
            : {})}
          // renderOption={option => <div onClick={() => handleSelectOption(option)}>{option.name}</div>}
          renderInput={params => (
            <Input
              variant={inputVariant ?? 'outlined'}
              {...params}
              icon={icon}
              label={label}
              onClick={onClick ?? null}
              value={input || ''}
              required={required}
              validators={validators}
              errorMessages={errorMessages}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {startLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      )}
    </>
  );
}

AsyncInputAutocomplete.propTypes = {
  requestAction: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.element,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  getOptionSelected: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  isLoading: PropTypes.bool,
  defaultInputValue: PropTypes.string,
  required: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.string),
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  skeletonHeight: PropTypes.number,
  composed: PropTypes.bool,
  sortedProp: PropTypes.string,
  inputVariant: PropTypes.string
};
