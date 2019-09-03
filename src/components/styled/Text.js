// @flow
import React from 'react';
import styled from 'styled-components';
import Autosuggest from '../projects/Autosuggest';
import { fontMedium, focus } from './Fonts';
import Colours from './Colours';

const Control = styled.div`
  margin-bottom: 1rem;
  position: relative;
`
const ControlLabel = styled.div`
  margin-bottom: 3px;
  position: relative;
  label {
    color: ${Colours.primary};
    font-family: ${fontMedium};
    font-size: 1rem;
  }
`
const ControlField = styled.div`
  position: relative;
  input {
    border-radius: 3px;
    font-family: ${fontMedium};
    font-size: 1rem;
    box-sizing: border-box;
    border: 1px solid ${Colours.secondary};
    padding: .65rem;
    width: 100%;
    width: 100%

    ${focus};
  }
`
const ControlError = styled.div`
  color: red;
  font-size: 12px;
  font-family: ${fontMedium};
`
export const TextInput = ({
  field,
  label,
  type = 'text',
  form: { touched, errors },
  required,
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];
  return (
    <Control className="control">
      <ControlLabel className="control_label">
        <label htmlFor={field.name}>{label}</label>
        {required && <span className="input__required"> *</span>}
      </ControlLabel>
      <ControlField className="control_field">
        <input id={field.name} type={type} {...field} {...props} />
      </ControlField>
      {hasError && <ControlError>{errors[field.name]}</ControlError>}
    </Control>
  );
};

export const TextAutosuggest = ({
  field,
  label,
  type = 'text',
  form: { touched, errors },
  required,
  ...props
}) => {
  console.log(field)
  const hasError = touched[field.name] && errors[field.name];
  return (
    <div className="control">
      <div className="control_label">
        <label htmlFor={field.name}>{label}</label>
        {required && <span className="input__required"> *</span>}
      </div>
      <div className="control_field">
        <Autosuggest
          value=""
          placeholder="Search by school name"
          onSelect={item => {field.value.school = item}}
          fetcher={props.fetcher}
          lastOption={props.lastOption}
          {...field}
          {...props}
        />
      </div>
      {hasError && <div className="field__error">{errors[field.name]}</div>}
    </div>
  );
};