import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import todoReducer from "../Lab4/ReduxExamples/todos/todoReducer";
const store = configureStore({
  reducer: { 
    helloReducer,
    counterReducer,
    addReducer,
    todoReducer,
  },
});
export default store;