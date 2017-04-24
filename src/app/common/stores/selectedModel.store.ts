export const selectedModel = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_MODEL':
      return payload;
    default:
      return state;
  }
};
