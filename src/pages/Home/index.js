import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { ProductLsit } from './styles';

class Home extends Component{
  state ={
    products: [],
  };

  async componentDidMount(){
    const response = await api.get('products');

    const data = response.data.map(product =>({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data});
  }

  handleAddProduct = product =>{
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  render(){
    const { products } = this.state; 
    return (
      <ProductLsit>
        {products.map(product => (
          <li>
            <img src={product.image}/>
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={()=> this.handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF"/> 3
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
          </li>
          ))
        }
        </ProductLsit>
    );
  }
}

export default connect()(Home);