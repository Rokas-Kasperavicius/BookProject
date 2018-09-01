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
  <div>
    <label className="label">{label}</label>
    <div>
      <Input
        {...input}
        placeholder={placeholder}
        type={type}
        className="text"
        autoComplete={autoComplete}
        style={{ width: "100%", textAlignLast: "center" }}
      />
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    </div>
  </div>
);