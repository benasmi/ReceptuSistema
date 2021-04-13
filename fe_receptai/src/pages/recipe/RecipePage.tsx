import React, { useState } from 'react';
import {
  useParams
} from "react-router-dom";

export default function RecipePage() {
  let { id } = useParams();

  
  return (
    <div>
      recipe page: {id}
    </div>
  );
};
