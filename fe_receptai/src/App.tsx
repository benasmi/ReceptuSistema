import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {getProducts} from './api/productsApi';
import { AxiosError } from 'axios';

interface IProduct{
  id: number;
  name: string;
}

function App() {

  const [products, setProducts] = useState<IProduct[]>([])
  
  useEffect(()=>{
    getProducts().then((data: IProduct[])=>{
      setProducts(data)
    }).catch((err: AxiosError<Error>) =>{
      console.log(err)
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {
          products.length > 0 ? products.map((item: IProduct) => {
            return <div>
              {item.name}
            </div>
          }) : <div>
            Add products to products table in Backend and see the results.
          </div>
        }

      </header>
    </div>
  );
}

export default App;
