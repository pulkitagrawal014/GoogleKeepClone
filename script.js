const addButton = document.querySelector('#add');

const addNewNote = (text = '') =>{
    const note = document.createElement('div');
    //jese apan add note par click kare wese hi apna wo div wala box samne aaye
    //uske liye yeh createElement method use kar rahe hai isse div add hoga

    note.classList.add('note');
    //isse jo div hai uss mai note naam ki class add hogi aab

    //aab anpe pass div aa gya note class aa gyi aab note class ke andar ka data chaiye hai
    //jo apan Template literal se le lenge👇 
    const htmlData =`            
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"> </div>           
    <textarea class="${text ? "hidden" : ""}"> </textarea>      `; //

    note.insertAdjacentHTML('afterbegin',htmlData);
    //jo html wo aa gya hai, aab usse add bh karna hai toh wo isse karenge
    //iss mai 2 argument pass hote hai 1. kaha add hona dusra kya add karna hai
    //1. div ke baad add karna hai isliye afterbegin 2. htmlData add karna hai
    
    //console.log(note);   // iss pata chal gya ki add ho gya hai sab


    //getting the References
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the node  
    delButton.addEventListener('click',() => {
        note.remove();  //remove defined method hai drct delete karte jayega jese hi click karenge

        updateLSData();  //jab delete button par click kar rahe hai delete bh toh hoye local storage se
    })

    const updateLSData = ()=>{
        const textAreaData = document.querySelectorAll('textarea');  
        //querySelectorAll isliye kyoki saare text area ka data store karana hai na
        //data jo hai array ke form mai store hoga kyoki querySelectorAll hai
        const notes = [];

        console.log(textAreaData);     //yeh bata rha hai ki text box add huaa hai
        textAreaData.forEach((note)=>{
            return notes.push(note.value);      //jo bh data hai wo notes array mai jata jayega
        })
        console.log(notes);  //yeh bata rha hai ki uss text mai data aa gya hai, jo array mai save hota jaa rha hai

        //Now data hai usse local storage mai add karna hai
        localStorage.setItem('notes', JSON.stringify(notes));  //local storage mai data dal dega yeh array se string format mai karke
    }
   

    //toggle using edit button
        //jo data hai phele se ,wo dikhana hai toh
        textArea.value = text;
        mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change',(event) => {      //change isliye jese hi kuch aata hai uss mai toh 
        const value = event.target.value;               //event is the parent object  
        // console.log(value);
        mainDiv.innerHTML = value;
        updateLSData();    //function we have created to store data at local storage
    });
    
    

    document.body.appendChild(note);
    //The appendChild() method: it appends a node as the last child of a node.
    }

//getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes')) //isse data local storage se data aa jayega. String format se array mai convert karke

if(notes){notes.forEach((note) => addNewNote(note))};

addButton.addEventListener('click',() => addNewNote()); //jab jab click ho tabh tabh kam karta jaaye
