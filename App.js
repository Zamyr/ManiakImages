import 'react-native-gesture-handler';
import React from 'react';

// Navigation
import Navigation from './src/navigation/Navigation'

// ErrorBoundary
import ErrorBoundary from './src/components/Errors/ErrorBoundary'

const App = () => {

  return (
    <>
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
    </>

  );
};

export default App;
