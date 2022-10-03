
//기본적인 middleware 구조
// const middlewareFn = (store) => {
//   return (next) => {
//     return (action) => {
//
//     }
//   }
// }


const thunk = (store) => (next) => (action) => {
  //login
  if(typeof action === 'function'){
    action(store.dispatch, store.getState);
  } else {
    next(action);
  }
}

export default thunk;