import { useState } from 'react'
import './App.css'
import ListComp from './ListComp'
import DarkModeSwitch from './DarkModeSwitch'
import lightBG from './assets/AppBackground.png'
import darkBG from './assets/AppBackgroundDark.png'

function App() {
  const [darkModeClicked, setDarkModeClicked] = useState(false)
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
      setTaskArray(t => [newTask ,...t])
      setfilteredTaskArray(f => [newTask, ...f])
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

    if (searchterm.trim()){
      const updatedFilteredTaskArray = taskArray.filter((currenttask) => {
                                                        return currenttask.task.toLowerCase().includes(searchterm.toLowerCase())
                                                      })
      setfilteredTaskArray(_ => updatedFilteredTaskArray)
    }
    else setfilteredTaskArray(_ => [...taskArray])
  }

  function onDeleteAll(){
    setfilteredTaskArray([])
    setTaskArray([])
  }

  return (
    <div id='app-container' style={darkModeClicked ? {backgroundImage: `url(${darkBG})`} : {backgroundImage: `url(${lightBG})`}}>
      <DarkModeSwitch clicked={darkModeClicked} setClicked={setDarkModeClicked}/>
      <h1 id='App-Header'>My <span>React</span> Tasks:</h1>
      <div id='my-form'>
        <div className='input-container'>
          <div className='labels'>
            <label  className='label'
                    htmlFor="new-task-input" 
                    style={darkModeClicked ? {color: 'white'} : {color: 'black'}} >
              New Task:
            </label>
          </div>
          <div className='inputs'>
            <input  type="text" 
                    id='new-task-input' 
                    className='input'
                    onKeyDown={(event) => onKeyDownAddTaskInput(event)} 
                    style={darkModeClicked ? {color: 'white'} : {color: 'black'}} />
            <button className='button' 
                    id='add-new-task-button'
                    onClick={onAddTask}>
                    <span className="material-icons-round">
                      add
                    </span>
            </button> 
          </div>
        </div>
        <div className='input-container'>
          <div className='labels'>  
            <label  className='label'
                    htmlFor="search-for-task"
                    style={darkModeClicked ? {color: 'white'} : {color: 'black'}} >
              Search Task:
            </label>
          </div>
          <div className='inputs'>
            <input  type="text" 
                    id='search-for-task' 
                    className='input'
                    onChange={onSearch}
                    style={darkModeClicked ? {color: 'white'} : {color: 'black'}} />
            <button className='button' 
                    id='search-button'
                    onClick={onSearch}>
              <span className="material-icons-round">
                search
              </span>
            </button>
          </div>
        </div>
      </div>

      <div id='list-container' style={darkModeClicked ? {backgroundColor: 'rgb(80, 80, 80)'} : {backgroundColor: 'white'}}>
        <div id='ul-container'>
          <ul>
            {filteredTaskArray.length > 0 ? filteredTaskArray.map((_,index) =>{
                                              return <li key={`filtered${index}`}>
                                                        {<ListComp  taskArray={taskArray} 
                                                                    filteredTaskArray={filteredTaskArray}
                                                                    idx={index} 
                                                                    setOgArray={setTaskArray}
                                                                    setFiletredOgArray={setfilteredTaskArray}
                                                                    dmclicked={darkModeClicked}/>}
                                                      </li>
                                              }) : null}
          </ul>
        </div>
        <div id="Delete-all-container">
          <button id="delete-all" onClick={onDeleteAll}>
            Delete all
            <span className="material-icons-round">
              delete_sweep
            </span> 
          </button>
        </div>
      </div>

      <div id="profile-link">
          Meet me:
          <a href="https://github.com/IceBag95" target="_blank" rel="noopener noreferrer">
              <span className="material-icons-round" id='profile-icon'>
                account_circle
              </span>
              <u>GitHub Page</u>
          </a>
      </div>
    
    </div>
  )
}

export default App
