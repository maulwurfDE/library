let myLibrary = [];

function Book(title, author, pages, read, member) {
    return {title, author, pages, read, member,
    info: function() {return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`)} }
    
    }

    function addBookToLibrary(title,author,pages,read,member) {
    const newBook = new Book(title,author,pages,read,member)  // do stuff here
    myLibrary.push(newBook);
    }


  function render() {

    var mytbl = document.getElementById("myTable");
    mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;

    myLibrary.forEach(function (item,index) {
   /*   const container = document.getElementById('container');
      const div = document.createElement('div');
      div.setAttribute('id', index); 
      container.appendChild(div);
      document.getElementById(index).innerHTML = myLibrary[index].info();
     */ 
      let table = document.getElementById("myTable");
      let row = table.insertRow(index+1);
      row.insertCell(0).innerHTML = myLibrary[index].title;
      row.insertCell(1).innerHTML = myLibrary[index].author;
      row.insertCell(2).innerHTML = myLibrary[index].pages;
     let read = row.insertCell(3);
     read.innerHTML = myLibrary[index].read;

     read.setAttribute('data-attribute',index);


      row.insertCell(4).innerHTML = myLibrary[index].member;

     read.addEventListener('click', function(event){ 
       console.log(read.innerHTML);
        if(this.innerHTML === "<center>✔</center>") {
         //  this.innerHTML = "<center>&#10005;</center>";
          myLibrary[index]["read"] = "<center>&#10005;</center>";
         // mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
          render();
         
    
        }
        else if(this.innerHTML === "<center>✕</center>") {
         // this.innerHTML = "<center>&#x2714;</center>";
         // mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML; 
         myLibrary[index]["read"] = "<center>&#x2714;</center>";
          
          render();

        }
        
     }) 
      let buttonCell = row.insertCell(5);
      buttonCell.className = "remove";
      buttonCell.innerHTML = `<button id=${index} onclick="remove(${index})" class="removeButton">Remove</button>`
     // row.setAttribute('data-attribute',index);
    //  row.insertCell(4).getElementsByTagName("button").setAttribute('data-attribute',index);

    })

  }

  //document.querySelectorAll('[data-attribute]')

  addBookToLibrary("The Hobbit","J.R.R. Tolkien",500,"<center>&#x2714;</center>","Moritz");
  addBookToLibrary("The Hobbit","J.R.R. Tolkien",500,"<center>&#x2714;</center>","Moritz");
  addBookToLibrary("The Hobbit","J.R.R. Tolkien",500,"<center>&#x2714;</center>","Moritz");
  
  window.onload = function () {this.render();}

  function show() {
    document.getElementById("form").style.display = "block";
  }

  function mySubmit() {

    let bookRead;
    if(document.getElementById("yes").checked) {

      bookRead = "<center>&#x2714;</center>";

    }
    else {bookRead = "<center>&#10005;</center>";}

    addBookToLibrary(document.getElementById("title").value,document.getElementById("author").value,document.getElementById("pages").value,bookRead,document.getElementById("familyMember").value)
  //  var mytbl = document.getElementById("myTable");
   // mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
    render();
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    return false;
  }

  function remove(index) {
myLibrary.splice(index, 1);
var mytbl = document.getElementById("myTable");
mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
render();
  }

  function unread() {

  }

  (function () { 
  const firebaseConfig = {
    apiKey: "AIzaSyDd0FGsvoYOvISxauGTiNiZiBKF7Ic7yDk",
    authDomain: "library-65749.firebaseapp.com",
    databaseURL: "https://library-65749.firebaseio.com",
    projectId: "library-65749",
    storageBucket: "library-65749.appspot.com",
    messagingSenderId: "165834123361",
    appId: "1:165834123361:web:e31435ee24ca8478282220",
    measurementId: "G-KHWLF2ZJ4C"
  };

  firebase.initializeApp(firebaseConfig);

  const preObject = document.getElementById('object');

  const dbRefObject = firebase.database().ref.child('object');

  dbRefObject.on('value', snap => console.log(snap.val()));

}());
