// The "mlmodels" reducer performs actions on our list of mlmodels
export const mlmodels = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_MODEL':
      return payload;
    case 'CREATE_MODEL':
      return [...state, payload];
    case 'UPDATE_ITEM':
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_MODEL':
      return state.filter(item => {
        return item._id !== payload._id;
      });
    default:
      return state;
  }
};
