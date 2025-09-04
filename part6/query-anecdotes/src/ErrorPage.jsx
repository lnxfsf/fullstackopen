import React from 'react';

const ErrorPage = ({ error }) => (
  <div style={{ color: 'red', padding: 20 }}>
    <h2>Server Error</h2>
    <p>{error?.message || 'Could not connect to the server.'}</p>
  </div>
);

export default ErrorPage;
