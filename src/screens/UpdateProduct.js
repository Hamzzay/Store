import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import Button from "../components/Button";
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';

class UpdateProduct extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
      title: "",
      image: null,
      description: "",
      price: "",
      category: "",
      sku: "",
      barcode: "",
      quantity: "",
      weight: "",
      length: "",
      vendorInput: "",
      size: "",
      color: "",
      isLoading: false,
      item: null,
    };
  }
  async componentDidMount() {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  removeImage() {
    this.setState({ image: null })
  };
  componentDidMount() {
    let product = this.props.route.params.item
    this.setState({
      title: product.item.title,
      description: product.item.description,
      image: product.item.image,
      price: product.item.price,
      category: product.item.category,
      sku: product.item.sku,
      barcode: product.item.barcode,
      quantity: product.item.quantity,
      weight: product.item.weight,
      length: product.item.length,
      vendorInput: product.item.vendorInput,
      size: product.item.size,
      color: product.item.color,
    })
  }

  handlePress() {
    let key = {
      title: this.state.title,
      image: this.state.image,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      sku: this.state.sku,
      barcode: this.state.barcode,
      quantity: this.state.quantity,
      orderQuantity: 0,
      qtyError: '',
      weight: this.state.weight,
      length: this.state.length,
      vendorInput: this.state.vendorInput,
      size: this.state.size,
      color: this.state.color,
      label: this.state.sku,
      value: this.state.sku
    }
    if (this.state.title == '' || this.state.sku == '' || this.state.quantity == '' || this.state.price == '') {
      Alert.alert("Please Enter Name, Price, Sku and Quantity.");
    }
    else {
      this.props.updateProduct(key)
      this.props.navigation.navigate("Store")
    }
  }

  DeletePress(sku) {
    let key = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      sku: this.state.sku,
      image: this.state.image,
      barcode: this.state.barcode,
      quantity: this.state.quantity,
      weight: this.state.weight,
      length: this.state.length,
      vendorInput: this.state.vendorInput,
      size: this.state.size,
      color: this.state.color,
      label: this.state.sku,
    }
    this.props.deleteProduct(key)
    this.props.navigation.navigate("Store")
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("HomeStack", { screen: "Store" })
              }>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerMid}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Update Product
            </Text>
          </View>
        </View>
        {/* ////////////////header ends//////////////// */}
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text>Product Name</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.title}
              onChangeText={(val) => this.setState({ title: val })}
            />
            <Text>Description</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.description}
              onChangeText={(val) => this.setState({ description: val })}
            />
            <Text>Price</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.price}
              onChangeText={(val) => this.setState({ price: val })}
            />
            <Text>Select Category</Text>
            <Picker
              selectedValue={this.state.category}
              style={{ height: 50, width: 370 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ category: itemValue })
              }
            >
              <Picker.Item label="Category1" value="category1" />
              <Picker.Item label="Category2" value="category2" />
            </Picker>

            <Text
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              Inventory
            </Text>

            <Text>SKU</Text>
            <TextInput
              editable={false}
              style={styles.inputStyle}
              value={this.state.sku}
              onChangeText={(val) => this.setState({ sku: val })}
            />
            <Text>Bar Code</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.barcode}
              onChangeText={(val) => this.setState({ barcode: val })}
            />
            <Text>Quantity</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.quantity}
              onChangeText={(val) => this.setState({ quantity: val })}
            />
            <Text
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              Shipping
            </Text>
            <Text>Weight</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.weight}
              onChangeText={(val) => this.setState({ weight: val })}
            />
            <Text>Length</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.length}
              onChangeText={(val) => this.setState({ length: val })}
            />
            <Text>Vendor</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.vendorInput}
              onChangeText={(val) => this.setState({ vendorInput: val })}
            />
            <Text
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              Variants
            </Text>
            <Text>Size</Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.size}
              onChangeText={(val) => this.setState({ size: val })}
            />
            <Text>Color </Text>
            <TextInput
              style={styles.inputStyle}
              value={this.state.color}
              onChangeText={(val) => this.setState({ color: val })}
            />
            <View style={styles.imageArea}>
              {this.state.image
                ?
                <Button
                  style={styles.imageButton}
                  text="Remove Images" onPress={() => this.removeImage()} />
                :
                <Button
                  style={styles.imageButton}
                  text="Add Image" onPress={() => this.pickImage()} />

              }
              {this.state.image !== null
                ? <Image source={{ uri: this.state.image }} style={styles.image} />
                : <Image source={require('../../assets/placeholder.png')} style={styles.image} />}
            </View>
            <Button
              text="Update Product"
              onPress={() => this.handlePress()}
            />
            <Button
              text="Delete"
              onPress={() => this.DeletePress()}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.store }
}

export default connect(mapStateToProps, actions)(UpdateProduct)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,

  },
  imageArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 90,
    left: 30,
    height: 90
  },
  header: {
    flex: 1.5,
    flexDirection: "row",
    marginTop: 20,
  },
  headerButtons: {
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerMid: {
    flex: 3,
    fontWeight: "bold",
    right: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 11,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  inputStyle: {
    width: "100%",
    marginBottom: 10,
    paddingBottom: 3,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
});
