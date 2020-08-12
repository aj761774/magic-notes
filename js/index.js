//Add note and store it into localStorage
showNotes();
document.getElementById('addBtn').addEventListener('click',()=>{
    let addTxt = document.getElementById('addTxt');
    let msg = addTxt.value;
    if (msg)
    {
       let notes = localStorage.getItem('notes');
       if(notes == null){
           notesObj = [];
       }
       else{
           notesObj = JSON.parse(notes);
       }
       notesObj.push(msg);
       localStorage.setItem('notes',JSON.stringify(notesObj));
       addTxt.value = '';
       showNotes();
    }
  
  });
  
  function showNotes(){
      let html = "";
      let totalNotes = JSON.parse(localStorage.getItem('notes'));
      if( totalNotes == null || totalNotes.length == 0 ){
        document.getElementById('notes').innerHTML = "<h3>Nothing here! please add some notes</h3>" 
    }
    else{
        totalNotes.forEach((element,index) => {
            html +=   `
                    <div class="card shadow my-2 mx-2 mynote" style="width:18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index+1}</h5>
                        <p class="notes">${element}</p>
                        <button id = ${index} onClick = "deleteNote(this.id)" class="btn btn-warning text-white deleteBtn">Delete Note</button>
                    </div>
                    </div>
                   `     
   });
   document.getElementById('notes').innerHTML = html;
      
    }
  }
   
  function deleteNote(noteId){
    let totalNotes = JSON.parse(localStorage.getItem('notes'));
    totalNotes.splice(noteId,1);  //delete particular element
    localStorage.setItem('notes',JSON.stringify(totalNotes));
    showNotes();
  }

  document.getElementById('searchNote').addEventListener('input',()=>{
    const searchValue = document.getElementById('searchNote').value;
    const search = searchValue.toLowerCase();
    const allNotes = document.getElementsByClassName('mynote');
    Array.from(allNotes).forEach((note,index)=>{
       const text = note.getElementsByTagName('p')[0].innerText.toLowerCase();
       if(text.includes(search)){
           note.style.display = "block";
       }
       else{
        note.style.display = "none";
       }
    });
  });
  