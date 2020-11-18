import React, { Component  } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import * as actions from "../actions";
import { connect } from "react-redux";
import SelectMultiple from "react-native-select-multiple";
import Button from "../components/Button";



class AddOrderScreen extends Component {

  constructor() {
    super();
    this.state = {
     selectedProducts: []
    };
  }
  onSelectionsChange = (selectedProducts) => {
    this.setState({ selectedProducts });
  };
  showProduct = (label) => {
    let sku = label
    let product = null
    this.props.reducerState.filter((element)=>{
      if(element.sku === sku){
        product = element
      }
    })
   return (
      <View style={styles.list}>
        {product.image !== null

?   <Image style={styles.tinyLogo} source={{ uri:product?.image }}/>
:<Image style={styles.tinyLogo} source={require('../../assets/placeholder.png')}/>
        }
          {(product?.title).length> 10
        
        ?<Text style={styles.listTitle}>{(product?.title).slice(0,12)}...</Text>
        : <Text style={styles.listTitle}>{product?.title}</Text>
          }
          <Text style={styles.listPrice}>${product?.price}</Text>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("HomeStack", { screen: "Home" })
              }
            >
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerMid}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Select Products</Text>
          </View>
        </View>
        <View style={styles.body}>
          
         
          {this.props.reducerState.length > 0
          ?
          <>
          <SelectMultiple
          renderSeparator 
          items={this.props.reducerState}
          keyExtractor={(item) => item.sku}
          renderLabel={(label) => this.showProduct(label)}
          selectedItems={this.state.selectedProducts}
          onSelectionsChange={this.onSelectionsChange}
        />
          <Button
          text="Next"
          onPress={() =>  
          this.props.navigation.navigate('OrderQuantity', { selectedProducts:this.state.selectedProducts })}
        />
        </>
        : <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#72bcd4'}}>There are no products available</Text>
          </View>
          }
           
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.store };
};
export default connect(mapStateToProps, actions)(AddOrderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1.5,
    flexDirection: "row",
    marginTop: 20,
  },
  headerButton: {
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  headerMid: {
    flex: 3,
    fontWeight: "bold",
    right:60,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 11.5,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  list:{
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems:'center',
    flex:1
   },
  listTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8ED1FC",
    justifyContent: 'center',
  },
  listPrice: {
    fontSize: 25,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 70,
    height: 80,
  },
});
