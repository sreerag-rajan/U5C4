import { loginReducer } from "./Login/loginReducer";
import { combineReducers, createStore,compose, applyMiddleware } from "redux";

const rootReducer = combineReducers({
    auth:loginReducer
})

const loggerMiddleWare = (store)=>(next)=>(action)=>{
    console.log(typeof action)
    if(typeof action === "function"){
        return action(store.dispatch)
    }
    next(action);

}

export const store = createStore(rootReducer,compose( applyMiddleware(loggerMiddleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)); // add your reducers here

