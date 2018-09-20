import React from 'react';

export const renderFieldTextArea = (
  {
    input,
    label,
    type,
    placeholder,
    autoComplete,
    meta: { touched, error, warning },
  }) => (
  <div style={{ lineHeight: '39px' }} className="field">
    <label className="label">{label}</label>
    <textarea
      style={{ textAlign: "left" }}
      {...input}
      placeholder={placeholder}
      className={touched ? 'text error-text' : 'text'}
      autoComplete={autoComplete}
    />
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
  </div>
);