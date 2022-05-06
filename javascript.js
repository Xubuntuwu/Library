let myLibrary= [];
const container = document.getElementById('container');

function Book(title, author, pages, read){
    this.title = title
    this.author=author
    this.pages=pages
    this.read=read
    this.info= function(){
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
    this.toggleread= function(){
        if(this.read=="read"){
            this.read="not read yet";
        }
        else if(this.read=="not read yet"){
            this.read="read";
        }
    }
}

function addBookToLibrary(title, author, pages, read){
    if(title|author|pages==0){
        return;
    }
    if(read == null){
        read= "not read yet";
    }
    else if(read=="bookread"){
        read="read";
    }
    const newBook = new Book(title, author, pages, read);
    newBook.libraryIndex = myLibrary.length;
    myLibrary.push(newBook);
    libraryRotator();
}


const theCatcher = addBookToLibrary('The Catcher in the Rye', 'J.D. Saling', 300, 'not read yet');
// const LordofRings = addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', 400, 'not read yet');
// const HarryPotter = addBookToLibrary('Harry Potter', 'J.K Roling', 500, 'read');
// const StreetLawyer = addBookToLibrary('The Street Lawyer', 'John Grisham', 350, null);
// const Ulysses = addBookToLibrary('Ulysses', 'John Grisham', 350, null);
// const AnimalFarm = addBookToLibrary('Animal Farm', 'John Grisham', 350, null);
// const Twilight = addBookToLibrary('Twilight Saga', 'John Grisham', 350, null);
// const JuliusCaesar = addBookToLibrary('Julius Caesar', 'John Grisham', 350, null);



function libraryRotator(){
    const allCards= document.getElementsByClassName('card');
    Array.from(allCards).forEach(singlecard => {  //no foreach on a nodelist (array-like object)
       singlecard.remove();   //remove all existing cards before reposting the list again so copies wont show up over and over again
    });
    for(const book of myLibrary){
        // if(Array.from(document.getElementsByClassName('card')).some((card)=> card.id==book.libraryIndex)){
        //     console.log('book already exists');
        // }
        // else{
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.setAttribute('id', book.libraryIndex);
        // console.log(`index of ${book.title} is ${book.libraryIndex} and the id is ${newCard.getAttribute('id')}`)
    
        const titleDescriptor = document.createElement('div');
        const title = document.createElement('div');
        title.textContent=book.title;
        titleDescriptor.textContent='Title:';
        titleDescriptor.classList.add('titleCard');
        titleDescriptor.appendChild(title);
        newCard.appendChild(titleDescriptor);
    
        const authorDescriptor = document.createElement('div');
        const author = document.createElement('div');
        author.textContent=book.author;
        authorDescriptor.textContent='Author:';
        authorDescriptor.classList.add('authorCard');
        authorDescriptor.appendChild(author);
        newCard.appendChild(authorDescriptor);
    
        const pagesDescriptor = document.createElement('div');
        const pages = document.createElement('div');
        pages.textContent=book.pages;
        pagesDescriptor.textContent='Pages:';
        pagesDescriptor.classList.add('pagesCard');
        pagesDescriptor.appendChild(pages);
        newCard.appendChild(pagesDescriptor);
    
    
        const readDescriptor = document.createElement('div');
        const read = document.createElement('div');
        read.textContent=book.read;
        readDescriptor.textContent='Read?';
        readDescriptor.classList.add('readCard');
        readDescriptor.appendChild(read);
        newCard.appendChild(readDescriptor);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttonsDiv');

        const deleteBookDiv = document.createElement('div');
        const deleteBookButton = document.createElement('button');
        deleteBookButton.setAttribute('type', 'button');
        deleteBookButton.textContent="Delete Book";
        deleteBookDiv.classList.add('deleteDiv');
        deleteBookButton.classList.add('deleteButton');
        deleteBookDiv.appendChild(deleteBookButton);

        const toggleReadDiv = document.createElement('div');
        const toggleReadButton = document.createElement('button');
        toggleReadButton.setAttribute('type', 'button');
        toggleReadButton.textContent="Toggle Read";
        toggleReadDiv.classList.add('toggleDiv');
        toggleReadButton.classList.add('toggleButton');
        toggleReadDiv.appendChild(toggleReadButton);

        buttonsDiv.appendChild(deleteBookDiv);
        buttonsDiv.appendChild(toggleReadDiv);
        newCard.appendChild(buttonsDiv);
    
        container.appendChild(newCard);
    }
}

const addBookForm = document.getElementById("form-div");
const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click',() => {
    //modal popup to create new object
    //#container height to 67% when form pops up, 90% when not
    if (addBookForm.style.display=="none"||addBookForm.style.display==""){
        addBookForm.style.display="flex";
        document.getElementById("container").style.height="67%";
        document.getElementById('formbuttoncontainer').scrollIntoView(); //scrolls down to form when clicking button instead of having to do it manually
    }
    else{
        addBookForm.style.display="none";
        document.getElementById("container").style.height="90%";
    }
})

const formcheckbox = document.getElementById("newread");
formcheckbox.addEventListener('click', ()=>{
    if(formcheckbox.style.backgroundColor==="lightgreen"){
        formcheckbox.style.backgroundColor="whitesmoke";
        formcheckbox.style.backgroundImage="none";   
    }
    else{
        formcheckbox.style.backgroundColor="lightgreen";
        formcheckbox.style.backgroundImage="url(./icons/check-bold.svg)";
    }
})

const newBookSumbit = document.getElementById("newbooksubmit");
newBookSumbit.addEventListener('click',()=>{
    const newBookData = new FormData(document.querySelector('form'));
    addBookToLibrary(newBookData.get('newtitle'),newBookData.get('newauthor'),newBookData.get('newpages'),newBookData.get('newread'));
    document.querySelector('form').reset();
    formcheckbox.style.backgroundColor="whitesmoke";
    formcheckbox.style.backgroundImage="none"; 
    updateArray();
    updatenewArray();
    activeDelete();
    activeToggle();
})

let deleteBookButtons = document.getElementsByClassName('deleteButton');
//this array addeventlistener doesnt work after successfully submitting a new book, unless you copy and paste the function in the console. Why?
//THIS IS WHY: let deleteBookButtonsArray = Array.from(deleteBookButtons); console.log(deleteBookButtonsArray); it doenst update!!
//why is the shallow copy not updating the deletebookbuttonsarray array?

//this whole function update thing is a workaround, what is the real problem?
function updateArray(){
    window.theArray = Array.from(deleteBookButtons);
}
updateArray();
function activeDelete(){
theArray.forEach(deleteBookButton => {
    deleteBookButton.addEventListener('click',()=>{
        const cardLibraryIndexValue = deleteBookButton.parentNode.parentNode.parentNode.getAttribute('id');
        const deleteThisCard = deleteBookButton.parentNode.parentNode.parentNode;
        myLibrary.forEach((book, index) =>{
            if(book.libraryIndex== cardLibraryIndexValue){
                myLibrary.splice(index, 1);
                deleteThisCard.remove();
            }
    });
    })
})
}
//why is making a function out of it and calling it after the submit button the only way to make this work right now?

let toggleReadButtons = document.getElementsByClassName('toggleButton');
function updatenewArray(){
    window.thenewArray = Array.from(toggleReadButtons);
}
updatenewArray();
function activeToggle(){
thenewArray.forEach(toggleButton => {
    toggleButton.addEventListener('click',()=>{
        const cardLibraryIndexValue = toggleButton.parentNode.parentNode.parentNode.getAttribute('id');
        myLibrary.forEach((book, index) =>{
            if(book.libraryIndex== cardLibraryIndexValue){
                myLibrary[index].toggleread();
            }
        })
        libraryRotator();
        updateArray();
        updatenewArray();
        activeDelete();
        activeToggle();
    })
})
}

activeDelete();
activeToggle();
//both functions only work once unless you insert them after each other
