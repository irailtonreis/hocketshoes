import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/module/Cart/actions';

import { ProductLsit } from './styles';

export default function Home(){
  const [products, setProducts] = useState([]);
  const amount = useSelector(state=> state.cart.reduce((sumAmount, product)=>{
    sumAmount[product.id] = product.amount;
    return sumAmount;
  }, {}));

  const dispatch = useDispatch();

  useEffect(()=>{
    async function loadProducts(){

      const response = await api.get('products');

      const data = response.data.map(product =>({
        ...product,
        priceFormatted: formatPrice(product.price),
      
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  
  function handleAddProduct(id){
   dispatch(CartActions.addToCartRequest(id)) ;
  };

    return (
      <ProductLsit>
        {products.map(product => (
          <li>
            <img src={product.image} alt={product.title}/>
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={()=> handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF"/> {''}
              { amount[product.id] || 0 }
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
          </li>
          ))
        }
        </ProductLsit>
    );
  }



