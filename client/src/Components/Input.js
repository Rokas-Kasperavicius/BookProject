import React from 'react'
import { Input } from 'semantic-ui-react'

export const renderField = (
  {
    input,
    label,
    type,
    placeholder,
    autoComplete,
    meta: { touched, error, warning },
  }) => (
  <div style={{ lineHeight: '39px' }}>
    <label className="label">{label}</label>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
      className={touched ? 'text error-text' : 'text'}
      autoComplete={autoComplete}
    />
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
  </div>
);