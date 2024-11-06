import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todoReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todoReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item">
      <button className="btn btn-success"
              onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"> Add </button>
      <button className="btn btn-warning"
              onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </button>
      <input value={todo.title}
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
    </li>
);}
