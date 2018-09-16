import React from 'react';
import { Route } from 'react-router-dom';

const Router = ({ component: Component, layout: Layout}) => {
  return (
    <Route>
      <Layout>
        <Component/>
      </Layout>
    </Route>
)};

export default Router;