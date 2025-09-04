let taskInput = document.querySelector('#taskInput');
let addbtn = document.querySelector('.addbtn');
let todoContaier = document.querySelector('.todoContaier');

addbtn.addEventListener('click',postData);
// console.log("jio")
let API = 'https://68b7656073b3ec66cec48f76.mockapi.io/api/v1/todo'
async function fetchData(){

    let response = await fetch(API);
    let data = await response.json();
    if(data){
        todoContaier.innerHTML ='';
        data.forEach(obj => {
        let div = document.createElement('div');
    div.className = 'todo'
    div.innerHTML = 
            ` <p class ="paratext" >${obj.text}</p>
        <div>
        <input  id="editinput" type="text" placeholder="Enter your task!!" value = '${obj.text}'>
            <button class="dltbtn">Delete</button>
            <button class="editbtn">edit</button>
            <button class="savebtn">SAVE</button>
        </div>`
        let dletebtn =div.querySelector('.dltbtn');
        let editbtn =div.querySelector('.editbtn');
        let savebtn =div.querySelector('.savebtn');
        let paratext =div.querySelector('.paratext');
        let editinput =div.querySelector('#editinput');

        dletebtn.addEventListener('click',function(){
            dleteData(obj.id)
        })
        editbtn.addEventListener('click',function(){
            editbtn.style.display = 'none'
            savebtn.style.display = 'inline'
            paratext.style.display = 'none'
            editinput.style.display = 'inline'

        })
        savebtn.addEventListener('click',async function(){
            let editVAlue = editinput.value
            await putdata(obj.id,editVAlue)
            if(response.status === 200){
            savebtn.style.display = 'none'
            editbtn.style.display = 'inline'
            paratext.style.display = 'inline'
            editinput.style.display = 'none'

            }
            
        })
        todoContaier.append(div)
        
    });
    }
    
}
async function postData(){
    let value = taskInput.value;
    // console.log(value);
    let objData = {
        text: value.trim()
    }
    let response = await fetch(API,{
        method :'POST',
        headers :{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData),
    })
    // 
    return response
    // console.log(response);
    // let data = await response.json();

}
async function putdata(id,value){
    console.log(id,value)
    // let value = taskInput.value;
    // console.log(value);
    let objData = {
        text: value.trim()
    }
    let response = await fetch(`${API}/${id}`,{
        method :'PUT',
        headers :{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData),
    })
    if(response.status === 200){
        fetchData();
        taskInput.value = ''
    }
    // if(response.status === 0){
    //     fetchData();
    // }
    // // console.log(response);

    // let data = await response.json();

}
async function dleteData(id) {
    // console.log(id);
    let response = await fetch (`${API}/${id}`,{
        method :'DELETE',
    })
    if(response.status === 200){
        fetchData();
    }
    
}

fetchData();