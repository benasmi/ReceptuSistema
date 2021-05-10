import React, { useState } from 'react';
import RecipeList from '../../components/RecipeList';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center">Ka valgyt???</h1>
      <RecipeList/>
    </div>
);
};
