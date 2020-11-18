import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import * as actions from "../actions";
import { connect } from "react-redux";
import Button from "../components/Button";
import NumericInput from "react-native-numeric-input";

class OrderQuantityAgain extends Component {
  constructor() {
    super();
    this.state = {
      selectedProducts: [],
      OrderQuantity: "",
    };
  }
  handlePress() {
    let key = {
      orderNo: this.props.route.params.LastOrderDetails.orderNo,
      products: this.state.selectedProducts,
    };
    let flag = true;
    for (const item of key.products) {
      if (item.quantity == "") {
        flag = false;
      }
    }
    if (flag === false) {
      Alert.alert("Please Enter Quantity.");
    } else {
      this.props.updateOrder(key);
      this.props.navigation.navigate("Order");
    }
  }

  componentDidMount() {
    let newProducts = this.props.route.params.newSelectedProducts;
    let products = [];
    newProducts.forEach((param) => {
      this.props.reducerState.forEach((product) => {
        if (param.value === product.sku) {
          products = [...products, product];
        }
      });
    });
    let selectedProducts = this.props.route.params.LastOrderDetails
      .selectedProducts;
    selectedProducts = selectedProducts.concat(products);

    this.setState({ selectedProducts: selectedProducts });
  }
  showProduct(item) {
    return (
      <View>
      <View style={styles.list}>
        {item.item.image !== null
        ? <Image style={styles.tinyLogo} source={{ uri: item.item.image }} />
        : <Image style={styles.tinyLogo} source={require('../../assets/placeholder.png')} />

        }

        {(item.item.title).length > 10

          ? <Text style={styles.listTitle}>{(item.item.title).slice(0, 12)}...</Text>
          : <Text style={styles.listTitle}>{item.item.title}</Text>
        }
        <View style={styles.inputStyle}>
          <NumericInput
            value={item.item.orderQuantity}
            onChange={(val) => this.setQuantity(item.item, val)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={80}
            totalHeight={50}
            iconSize={25}
            minValue={0}
            step={1}
            valueType="real"
            rounded
            textColor="black"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="#72bcd4"
            leftButtonBackgroundColor="#72bcd4"
          />
          {/* <TextInput
                value={item.item.orderQuantity}
                 onChangeText={(val) => this.setQuantity(item.item,val)}
                 /> */}
        </View>
       
      </View>
      <View
          style={{
            marginVertical: 5,
            // borderBottomColor: 'wh',
            // borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }
  setQuantity(item, val) {
    let newProducts = this.state.selectedProducts;
    newProducts.forEach((e) => {
      if (e.sku === item.sku) {
        e.orderQuantity = val;
      }
    });
    this.setState({ selectedProducts: newProducts });
  }
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
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Add Quantity
            </Text>
          </View>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("OrderStack", {
                  screen: "Order",
                })
              }
            >
              <Text> Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            data={this.state.selectedProducts}
            keyExtractor={(item) => item.sku}
            renderItem={(item) => this.showProduct(item)}
          />
        <Button text="Done" onPress={() => this.handlePress()} />

        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.store };
};
export default connect(mapStateToProps, actions)(OrderQuantityAgain);

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
  body: {
    flex: 11.5,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  list: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  listTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8ED1FC",
    justifyContent: "center",
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
