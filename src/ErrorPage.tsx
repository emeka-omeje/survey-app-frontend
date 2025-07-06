import React from 'react';

const ErrorPage: React.FC = () => {


  return (
    <section id="error-page">
      <h1>Oops!</h1>
      <p data-testid="error-message">Sorry, an unexpected error has occurred.</p>
      <button className='btn' role='button' onClick={() => window.history.back()}>
        Go back
      </button>
    </section>
  );
};

export default ErrorPage;