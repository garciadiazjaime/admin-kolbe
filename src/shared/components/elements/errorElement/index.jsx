import React from 'react';

export default function apiErrorElement() {
  return (<div className="text-center">
    <br />
    <p className="text-danger">
      Lo sentimos, un error ha sucedido.
    </p>
    <p>
      <a href="https://goo.gl/rnSQPG" target="_blank" rel="noopener noreferrer">
        Reportar Error.
      </a>
    </p>
  </div>);
}
