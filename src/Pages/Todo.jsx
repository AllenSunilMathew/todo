// Todo.jsx
import React, { useState } from 'react';


function Todo() {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== '' && dueDate !== '') {
      setTasks([...tasks, { text: task, completed: false, date: dueDate }]);
      setTask('');
      setDueDate('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleCompleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="todo-bg">
      <div className="todo-container">
        <header className="todo-header">
          <h1>📝 My ToDo List</h1>
          <p>Stay organized and track your tasks with deadlines!</p>
        </header>

        {/* Input Area */}
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="progress-container">
            <div className="progress-text">
              Tasks Completed: {completedCount} of {totalCount}
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Task List */}
        <ul className="todo-list">
          {tasks.map((t, index) => (
            <li key={index} className={t.completed ? 'completed' : ''}>
              <div className="task-info">
                <span>{t.text}</span>
                <small className="task-date">
                  📅 {new Date(t.date).toLocaleDateString()}
                </small>
              </div>
              <div className="task-buttons">
                <button
                  className="complete-btn"
                  onClick={() => handleCompleteTask(index)}
                >
                  {t.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
