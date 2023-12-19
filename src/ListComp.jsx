import './ListComp.css'

function ListComp(props){

    const filteredTaskArray = [...props.filteredTaskArray]
    const taskArray = [...props.taskArray]
    const i = props.idx
    // unfilterd_i -> taskid[k] == taskid[i] 

    function changeSelectedState(){
        const UpdatedFilteredTaskArray = [...filteredTaskArray]
        UpdatedFilteredTaskArray[i].selected = !UpdatedFilteredTaskArray[i].selected

        props.setFiletredOgArray(UpdatedFilteredTaskArray)
    }

    function deleteTask(){
        console.log(filteredTaskArray)
        console.log(taskArray)
        let itemToDeleteTaskId;
        const UpdatedFilteredTaskArray = filteredTaskArray.filter((_,index) => {
                                                            itemToDeleteTaskId = filteredTaskArray[i].taskid
                                                            return (filteredTaskArray[index].taskid !== filteredTaskArray[i].taskid)                                                                
                                                        })
        const updatedTaskArray = taskArray.filter((_, index) => {
                                                return (taskArray[index].taskid !== itemToDeleteTaskId) 
                                            })
        console.log(UpdatedFilteredTaskArray)
        console.log(updatedTaskArray)
        props.setFiletredOgArray(UpdatedFilteredTaskArray)
        props.setOgArray(updatedTaskArray)
    }

    return(
        <div id='list-item'>
            <input  type="checkbox" 
                    id={`checkbox${i}`}
                    className='checkbox' 
                    checked={filteredTaskArray[i].selected}
                    onChange={changeSelectedState}
                    //style={props.dmclicked ?  {color: 'white'} : {color: 'rgb(80, 80, 80)'} }
                    /> 
            <p  style = {filteredTaskArray[i].selected ? {color: 'rgb(98, 184, 98)'} :
                        props.dmclicked ? {color: 'white'} : {color: 'black'}} 
                id={`item-descr${i}`} 
                className='item-descr'>
                    {filteredTaskArray[i].selected ? <s>{filteredTaskArray[i].task}</s> : filteredTaskArray[i].task}           
            </p>
            <button id={`delete-item-btn${i}`} className='delete-item-btn' onClick={deleteTask}>
                <span className="material-icons-round">
                    delete_forever
                </span>
            </button>
        </div>
    )
}

export default ListComp