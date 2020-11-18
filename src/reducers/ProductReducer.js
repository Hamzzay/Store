//  import products from './products.json'

export default (state = [], action) => {
  switch (action.type) {
    case "save_product":
      return [...state, action.payload];

    case "update_product":
      let newState = state.filter((item) => {
        if (item.sku !== action.payload.sku) {
          return true
        }
      })
      return [...newState, action.payload];

    case "delete_product":
      let newState2 = state.filter((item) => {
        if (item.sku !== action.payload.sku) {
          return true
        }
      })
      return [...newState2];

    case "update_store":
      return action.payload

    default:
      return state;
  }
};