const { useState } = React

export function ToDoList({ todos, onUpdateTodo, noteId }) {
    const handleTodoToggle = (index) => {
        const updatedTodos = [...todos]
        updatedTodos[index].doneAt = updatedTodos[index].doneAt ? null : Date.now()
        onUpdateTodo(noteId, updatedTodos)
    }

    return (
        <ul className="todo-container">
            {todos.map((todo, index) => (
                <li key={index} className="todo-item">
                    <span className={todo.doneAt ? "todo-text todo-done" : "todo-text"}>{todo.txt}</span>
                    <div className="checkbox-container">
                        <input
                            id="checkbox"
                            type="checkbox"
                            className="todo-checkbox"
                            checked={!!todo.doneAt}
                            onChange={() => handleTodoToggle(index)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}