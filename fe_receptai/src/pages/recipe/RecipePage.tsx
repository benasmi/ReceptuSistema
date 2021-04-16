import React, { useEffect, useState } from 'react';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import { IRecipe } from '../../components/RecipeCard';
import { addRecipeProducts, deleteRecipeProducts, getRecipe } from '../../api/recipesApi';
import { AxiosError } from 'axios';
import { deleteRecipe as deleteRecipeRequest, updateRecipe as updateRecipeRequest } from '../../api/recipesApi';
import { Button } from 'react-bootstrap';
import { getProducts } from '../../api/productsApi';
import RecipeProduct from '../../components/RecipeProduct';

const recipeInitial: IFullRecipe = {
  id: -1,
  title: '',
  description: '',
  price: '',
  difficulty: '',
  imageUrl: '',
  products: []
};

export interface IProduct {
  name?: string;
  quantity: string | number;
  quantityType: string;
  id?: number;
}

export interface IFullRecipe extends IRecipe {
  price: string;
  difficulty: string;
  products: IProduct[]
}

export interface IAvailableProduct {
  name: string;
  id: number;
}

const quantities = ['sp', 'g', 'kg', 'l', 'ml'];

export default function RecipePage() {
  let { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState<IFullRecipe>(recipeInitial);
  const [availableProducts, setAvailableProducts] = useState<IAvailableProduct[]>([]);

  const [quantityProduct, setQuantityProduct] = useState({ productId: -1, quantityType: '', quantity: '', name:'' });

  const [newProducts, setNewProducts] = useState<IProduct[]>([]);
  const [removedProducts, setRemovedProducts] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([getRecipe(id), getProducts()]).then(([data, products])=>{
      setRecipe(data as IFullRecipe)
      setAvailableProducts(products as IAvailableProduct[])
    })
  }, [id]);


  //todo: move to redux state
  function deleteRecipe() {
    deleteRecipeRequest(id).then(() => {
      history.push('/app/my-recipes');
    }).catch((err: AxiosError<Error>) => {
      //Display toast
    });
  }

  function updateRecipe() {
    if (recipe) {
      Promise.all([
        updateRecipeRequest(id, { ...recipe }),
        addRecipeProducts(id, newProducts),
        deleteRecipeProducts(id, removedProducts)
      ]).then(()=>{
        //show success
      }).catch((err:AxiosError<Error>)=>{
        //show error
      })
    }
  }


  function updateFields(id: string, value: string | number) {
    setRecipe(oldVal => {
      return {
        ...oldVal,
        [id]: value
      };
    });
  }

  function deleteProduct(id: number) {
    if(newProducts.some(it=>it.id===id)){
      setNewProducts(newProducts.filter(it=>it.id!==id))
    }else{
      setRemovedProducts([...removedProducts, id])
      setRecipe(oldRecipe=>{
        return {
          ...oldRecipe,
          products: oldRecipe.products.filter(it=>it.id!==id)
        }
      })
    }
  }

  function displayProducts() {
    if (recipe?.products.length  === 0 && newProducts.length === 0) {
      return <div>
        Currently no products assigned
      </div>;
    }

    return <div>
      {
        recipe.products.map(product=>{
          return <RecipeProduct product={product} onDelete={deleteProduct}/>
        })
      }
      {
        newProducts.map((product, idx) =>{
          return <div style={{background: 'grey'}}>
            <RecipeProduct key={`product@${idx}`} product={product} onDelete={deleteProduct}/>
          </div>
        })
      }
    </div>
  }

  function addProductToRecipe() {
    const {name, quantity, quantityType, productId} = quantityProduct
    const newProd = {name, quantity, quantityType, productId}

    setNewProducts([...newProducts, newProd])
  }

  useEffect(()=>{
    console.log("new prods", newProducts)
  },[newProducts])

  //todo: move to other component
  function ProductsRecipe(){
    return (
      <>
        {displayProducts()}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <select className='form-control'
                  id='product'
                  value={quantityProduct.productId}
                  style={{ width: '150px' }}
                  onChange={(event) => setQuantityProduct(oldVal => {
                    return {
                      ...oldVal,
                      productId: parseInt(event.target.value),
                      name: availableProducts.filter(row=>row.id==parseInt(event.target.value))[0].name
                    };
                  })}
          >
            <option value="-1">-</option>
            {
              availableProducts.map(row => {
                return <option value={row.id}>{row.name}</option>;
              })
            }
          </select>
          <select className='form-control' id='quantityType' value={quantityProduct.quantityType}

                  onChange={(event) => setQuantityProduct(oldVal => {
                    return {
                      ...oldVal,
                      quantityType: event.target.value
                    };
                  })}
                  style={{ width: '150px' }}>
            <option value=''>-</option>
            {
              quantities.map((row: any) => {
                return <option value={row.name}>{row}</option>;
              })
            }
          </select>
          <input type='text'
                 className='form-control'
                 id='quantity'
                 style={{width: '150px'}}
                 placeholder='quantity'
                 value={quantityProduct.quantity}
                 onChange={(event) => setQuantityProduct(oldVal => {
                   return {
                     ...oldVal,
                     quantity: event.target.value
                   };
                 })}
          />
          <Button variant='success' onClick={addProductToRecipe}>Add product</Button>
        </div>
      </>
    )
  }

  return (
    <div>
      <form>
        <img
          src={recipe?.imageUrl || ''}
          alt='recipe'
        />
        <div className='form-group'>
          <label htmlFor='imageUrl'>Recipe image</label>
          <input type='text'
                 className='form-control'
                 id='imageUrl'
                 placeholder='Enter recipe image'
                 value={recipe?.imageUrl || ''}
                 onChange={(event) => updateFields('imageUrl', event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='title'>Recipe title</label>
          <input type='text'
                 className='form-control'
                 id='title'
                 placeholder='Enter recipe title'
                 value={recipe?.title}
                 onChange={(event) => updateFields('title', event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Recipe description</label>
          <textarea className='form-control'
                    id='description'
                    rows={3}
                    value={recipe?.description}
                    onChange={(event) => updateFields('description', event.target.value)}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='difficulty'>Select difficulty</label>
          <select className='form-control' id='difficulty' value={recipe?.difficulty}
                  onChange={(event) => updateFields('difficulty', event.target.value)}>
            <option value='easy'>Easy</option>
            <option value='normal'>Normal</option>
            <option value='difficult'>Difficult</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Select price</label>
          <select className='form-control' id='price' value={recipe?.price}
                  onChange={(event) => updateFields('price', event.target.value)}>
            <option value='cheap'>Cheap</option>
            <option value='average'>Average</option>
            <option value='expensive'>Expensive</option>
          </select>
        </div>
        <div>
          <p>
            Products
          </p>
          <ProductsRecipe />
        </div>
      </form>
      <div>
        {recipe?.id === -1 && <button type='button' className='btn btn-primary' onClick={()=>{}}>Insert</button>}
        {recipe?.id && <button type='button' className='btn btn-primary' onClick={updateRecipe}>Update</button>}
        {recipe?.id && <button type='button' className='btn btn-danger' onClick={deleteRecipe}>Delete</button>}
      </div>
    </div>
  );
};


