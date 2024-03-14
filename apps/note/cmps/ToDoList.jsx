
export function ToDoList({ todos }) {
    return (
        <ul className="todo-container">
            {todos.map((todo, index) => (
                <li key={index} className="todo-item">
                    <span className="todo-text">{todo.txt}</span>
                    <input type="checkbox" className="todo-checkbox" checked={todo.doneAt !== null} readOnly />
                </li>
            ))}
        </ul>
    );
}
