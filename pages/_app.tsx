import React from 'react';
import '../css/index.css';

const App = ({ Component, pageProps }): React.ReactElement => {
  return <Component {...pageProps} />;
};

export default App;
