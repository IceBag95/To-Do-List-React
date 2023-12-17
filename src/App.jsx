import { useState } from 'react'
import './App.css'
import ListComp from './ListComp'

function App() {
  const [totalTasks, setTotalTasks] = useState(0)
  const [taskArray, setTaskArray] = useState([])
  const [filteredTaskArray, setfilteredTaskArray] = useState([...taskArray]);

  function onAddTask(){
    const taskInput = document.getElementById('new-task-input')
    if (taskInput.value.trim() !== ''){

      const newTaskText = taskInput.value
      taskInput.value = ""



      // creating the new task object for the taskArray
      const newTask = {
        taskid: totalTasks,
        task: newTaskText,
        selected: false
      }

      setTotalTasks(t => t + 1)
      setTaskArray(t => [...t, newTask])
      setfilteredTaskArray(f => [...f, newTask])
    }
    else taskInput.value = ""
  }

  function onKeyDownAddTaskInput(event){
    if (event.key === 'Enter'){
      onAddTask()
    }
  }

  function onSearch(){
    const searchterm = document.getElementById('search-for-task').value

    if (searchterm){
      const updatedFilteredTaskArray = taskArray.filter((currenttask) => {
                                                        return currenttask.task.toLowerCase().includes(searchterm.toLowerCase())
                                                      })
      setfilteredTaskArray(_ => updatedFilteredTaskArray)
    }
    else setfilteredTaskArray(_ => [...taskArray])
  }

  return (
    <div id='app-container'>
      <h1>My Tasks:</h1>
      <div id='my-form'>
        <div className='input-container'>
          <div className='labels'>
            <label htmlFor="new-task-input">New Task:</label>
          </div>
          <div className='inputs'>
            <input  type="text" 
                    id='new-task-input' 
                    className='input'
                    onKeyDown={(event) => onKeyDownAddTaskInput(event)}/>
            <button className='button' 
                    id='add-new-task-button'
                    onClick={onAddTask}>
                      Add task
            </button> 
          </div>
        </div>
        <div className='input-container'>
          <div className='labels'>  
            <label htmlFor="search-for-task">Search Task:</label>
          </div>
          <div className='inputs'>
            <input  type="text" 
                    id='search-for-task' 
                    className='input'
                    onChange={onSearch}/>
            <button className='button' 
                    id='search-button'
                    onClick={onSearch}>
                      Search
            </button>
          </div>
        </div>
      </div>

      <div id='list-container'>
        <ul>
          {filteredTaskArray.length > 0 ? filteredTaskArray.map((_,index) =>{
                                            return <li key={`filtered${index}`}>
                                                      {<ListComp  taskArray={taskArray} 
                                                                  filteredTaskArray={filteredTaskArray}
                                                                  idx={index} 
                                                                  setOgArray={setTaskArray}
                                                                  setFiletredOgArray={setfilteredTaskArray}/>}
                                                    </li>
                                            }) : null}
        </ul>
      </div>
    
    </div>
  )
}

export default App
