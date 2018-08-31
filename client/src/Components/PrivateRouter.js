import React from 'react';
import Router from './Router'

const PrivateRouter = ({ history, layout, component }) => {

  return (
    <div>
      {document.cookie.includes('token=true') ?
        <Router layout={layout} component={component}/> : history.push('/login')
      }
    </div>
)};

export default PrivateRouter;