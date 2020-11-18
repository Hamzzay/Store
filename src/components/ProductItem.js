import React, { Component } from "react";
import {
Text, 
TouchableWithoutFeedback, 
View,
LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';


class  ProductItem extends Component {
    componentWillUpdate(){
        LayoutAnimation.spring();
    }
    renderDescription(){
        const {products, expanded}= this.props;

        if(expanded)
        return(
            <CardSection>
            <Text styles={{flex:1}}>
            {product.description}</Text>
            </CardSection>
        )
    }

    render(){
       const {titleStyle} = styles;
       const { id, title } = this.props.products;
     return (
         <TouchableWithoutFeedback
           onPress={()=> this.props.selectProducts(id)}>
           <View>
               <CardSection>
                <Text style={titleStyle}>
                      {title}
                 </Text>
               </CardSection>
               {this.renderDescription()}
            </View>
       </TouchableWithoutFeedback>
       
     );
    }
}

const styles ={
    titleStyle: {
        fontSize:18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded= state.selectedProductsId=== ownProps.products.id;
    return { expanded};
};
export default connect(mapStateToProps, actions)(ProductItem);