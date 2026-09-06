import { useState } from 'react'
import React from 'react'
import Header from './components/Header'
import Home from './assets/pages/Home';
import Men from './assets/pages/Men';


export const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Header />

      {selectedCategory ? (
        <Men category={selectedCategory} />
      ) : (

        <Home
          onCategoryClick={(category) =>
            setSelectedCategory(category)
          }
        />
      )}
    </>
  );
};

export default App;
