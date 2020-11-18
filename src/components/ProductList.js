import React,{ Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux'
import ProductItem from './ProductItem';

class ProductList extends Component {
    renderItem(Product){
       return <ListItem Product={Product}/>
    }
    render(){
        return(
          <FlatList
              data={this.props.products}
               renderItem={(Product)=>this.renderItem(Product.item)}
              keyExtractor={(Product) => ''+(Product.id)}
          />
        );
    }
}

const mapStateToProps = state =>{
 return { products: state.products};
};

export default connect(mapStateToProps)(ProductList);