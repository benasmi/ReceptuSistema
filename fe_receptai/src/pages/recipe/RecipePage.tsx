import React, { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';
import { IRecipe } from '../../components/RecipeCard';
import { getRecipe } from '../../api/recipesApi';
import { AxiosError } from 'axios';

export interface IProduct {
  name: string;
  quantity: string | number;
  quantityType: string;
  id: number;
}

export interface IFullRecipe extends IRecipe {
  price: string;
  difficulty: string;
  products: IProduct[]
}

export default function RecipePage() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState<IFullRecipe>();

  useEffect(() => {
    getRecipe(id).then((data: IFullRecipe) => {
      setRecipe(data);
    }).catch((err: AxiosError<Error>) => {
      console.log('Error');
    });
  }, [id]);
  return (
    <div>
      <form>
        <img
          src={recipe?.imageUrl || ''}
          alt='recipe'
        />
        <div className='form-group'>
          <label htmlFor='imageUrl'>Recipe image</label>
          <input type='text' className='form-control' id='imageUrl' placeholder='Enter recipe image'
                 value={recipe?.imageUrl || ''} />
        </div>
        <div className='form-group'>
          <label htmlFor='title'>Recipe title</label>
          <input type='text' className='form-control' id='title' placeholder='Enter recipe title'
                 value={recipe?.title} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Recipe description</label>
          <textarea className='form-control' id='description' rows={3} value={recipe?.description}></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='difficulty'>Select difficulty</label>
          <select className='form-control' id='difficulty' value={recipe?.difficulty}>
            <option value='easy'>Easy</option>
            <option value='normal'>Normal</option>
            <option value='difficult'>Difficult</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Select price</label>
          <select className='form-control' id='price' value={recipe?.price}>
            <option value='cheap'>Cheap</option>
            <option value='average'>Average</option>
            <option value='expensive'>Expensive</option>
          </select>
        </div>
      </form>
    </div>
  );
};


