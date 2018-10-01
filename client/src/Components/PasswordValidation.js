import React from 'react';
import { Icon } from 'semantic-ui-react'

export const PasswordValidation = ({ characters, lowercase, uppercase, digits }) => (
    <div>
      <div className="password-require">
        <Icon name={characters ? "check circle" : "warning circle"} style={{ color: characters ? "green" : "red" }} />
        <span>At least 8 characters long</span>
      </div>
      <div className="password-require">
        <Icon name={lowercase ? "check circle" : "warning circle"} style={{ color: lowercase ? "green" : "red" }} />
        <span>One lowercase character</span>
      </div>
      <div className="password-require">
        <Icon name={uppercase ? "check circle" : "warning circle"} style={{ color: uppercase ? "green" : "red" }} />
        <span>One uppercase character</span>
      </div>
      <div className="password-require">
        <Icon name={digits ? "check circle" : "warning circle"} style={{ color: digits ? "green" : "red" }} />
        <span>At least one number</span>
      </div>
    </div>
);