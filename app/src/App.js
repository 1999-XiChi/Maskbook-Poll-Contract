import React, {useState} from 'react';
import SimpleStorage from './simpleStorage'
import Poll from './poll'

function App() {

  return (
    <div className="App">
      <SimpleStorage />
      <Poll />
    </div>
  );
}

export default App;
