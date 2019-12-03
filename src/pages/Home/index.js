import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/module/Cart/actions';

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
    console.log(response.data);
    this.setState({ products: data});
  }

  handleAddProduct = id =>{
    const { addToCartRequest } = this.props;

    addToCartRequest(id);

    this.props.history.push('/cart')
  };

  render(){
    const { products } = this.state; 
    const { amount } = this.props;
    return (
      <ProductLsit>
        {products.map(product => (
          <li>
            <img src={product.image} alt={product.title}/>
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={()=> this.handleAddProduct(product.id)}>
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product)=>{
    amount[product.id] = product.amount;
    return amount;
  }, {}),
  
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);