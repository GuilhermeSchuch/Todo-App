import React, { useState } from 'react';

// CSS
import styles from "./App.module.css";

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// Interfaces
import { ITask } from "./interfaces/Task";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => task.id !== id));
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");

    if(display){
      modal!.classList.remove("hide");
    }
    else{
      modal!.classList.add("hide");
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);
    hideOrShowModal(false);
  }

  return (
    <div className="App">
      <Modal children={ <TaskForm btnText='Edit task' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} /> } />
      <Header />

      <main className={styles.main}>
        <div>
          <h2>Add your task!</h2>
          <TaskForm btnText='Add task' taskList={taskList} setTaskList={setTaskList} />
        </div>

        <div>
          <h2>Your tasks:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
