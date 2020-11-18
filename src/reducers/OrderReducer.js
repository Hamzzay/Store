export default (state = [], action) => {
  switch (action.type) {
    
    case "save_order":
      return [...state, action.payload]

    case "update_order":
      let newState = state.filter((item) => {
        if (item.orderNo !== action.payload.orderNo) {
          return true
        }
      })
      return [...newState, action.payload];

    case "delete_order":
      return state.filter((item) => {
        if (item.orderNo !== action.payload.orderNo) {
          return true
        }
      })
    
    default:
      return state;
  }
};