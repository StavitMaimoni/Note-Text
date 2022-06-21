
loadTasks();

// Load Tasks from storage into table: 
function loadTasks() {

    // Extract task array from storage:
    const allTasks = getTasksFromStorage();

    // Display the updated array:
    displayTasks(allTasks);
}

// Add given task:
function addTask() {
    if (datetimepicker.value=="" && (noteText.value=="" || noteText.value==" ")) {
        alert("You have to pick a date and write new task");
        return;
    }
   else if (datetimepicker.value=="") {
        alert("You have to pick a date");
        return;
    }
    else if ( noteText.value=="" || noteText.value==" ") {
        alert("You have to write new task ");
        return;
    }
    // 2. Take Task values into a single object:
    const Object = MakeAnObject();

    // 3. Extract Task array from storage:
    const allTasks = getTasksFromStorage();

    // 4. Add that object into a single array:
    allTasks.push(Object);

    // 5. Display the updated array:
    displayTasks(allTasks);

    // 6. Save back to storage: 
    saveTasksToStorage(allTasks);

    // 7.: clear note text; including date and time:
    clearNoteText();


}

// Save all Tasks to storage: 
function saveTasksToStorage(allTasks) {

    // Convert array to string: 
    const str = JSON.stringify(allTasks);

    // Save string to storage: 
    localStorage.setItem("Tasks", str);
}

// Load all Tasks from storage: 
function getTasksFromStorage() {

    // Extract string from storage: 
    const str = localStorage.getItem("Tasks"); // Tasks = key

    // convert to array: 
    const Tasks = (str === null) ? [] : JSON.parse(str);

    // Return array: 
    return Tasks;
}

//Make An Object of note task: 
function MakeAnObject() {
    const noteTextBox=document.getElementById("noteText");
    const noteText=noteTextBox.value;
    const datetimepickertBox=document.getElementById("datetimepicker");
    const datetimepicker=datetimepickertBox.value;
    const TaskObject = {
        noteText,
        datetimepicker
    }

    return TaskObject;
}

// Display all Tasks: 
function displayTasks(allTasks) {
    // Clear previous data: 
    tbody.innerHTML = "";
    // Run on all Tasks: 
    for (let i = 0; i < allTasks.length; i++) {
        //convert run.datetimepicker to string
        let datestring = String(allTasks[i].datetimepicker);
        let datetime =new Date(datestring);
        let datetimeDisplay = datetime.toLocaleDateString() +" "+ datetime.toLocaleTimeString()
             const row=
             `
        
             <div id="relativeMiniNote">
             <img src="assets/note.34500640-63c5-4954-81ac-ed8b1238479a" style="height: 180px;">
                <span id="frontMainNote">
                <span id="miniText">${allTasks[i].noteText} </span>
                <span id="datetimeDisplay"> ${datetimeDisplay} </span>  
                <button class="deletebtn" id="${i}" onclick="DeleteNote(this)"> 
                <i class="fa fa-trash"></i> 
                </button>
                </span>
                &nbsp &nbsp
             </div>
              
             `
              tbody.innerHTML+=row;      
    }  
         
}
   
  
    // Clear note text; including dat-e and time:
    function clearNoteText(){
        noteText.value="";
        datetimepicker.value="";
     }
        
     //  Delete mini note:
      function DeleteNote(button) {
        const index = button.id;
         //  Extract Task array from storage:
          const allTasks = getTasksFromStorage();
          //delete object from array:
         allTasks.splice(index,1);
         //save new array:
         saveTasksToStorage(allTasks);
         //display new array:
         displayTasks(allTasks);
     }