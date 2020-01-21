

// let myLibrary = [];


// function Book(title, author, pages, read, member) {
//     return {title, author, pages, read, member,
//   //  info: function() {return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`)}
//    }
    
//     }


class Book {

  constructor(title,author,pages,read,member) {
    return {title, author, pages, read, member}
  }
}

    function addBookToLibrary(title,author,pages,read,member) {
    const newBook = new Book(title,author,pages,read,member)  // do stuff here
  //  myLibrary.push(newBook);
    rootRef.push(newBook);
  }

  const database = firebase.database();
  const rootRef = database.ref("/blubb");
 // rootRef.set([]);

/* rootRef.on('value', snapshot => {
  console.log(snapshot.val());

  let obj = snapshot.val();

for (prop in obj) {

  var mytbl = document.getElementById("myTable");
  mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;


if (obj.hasOwnProperty(prop)) {
  console.log("o." + prop + " = " + obj[prop])
  console.log(obj[prop].title);




}

}




});
*/

  function render() {

    var mytbl = document.getElementById("myTable");
    mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
    spinnerWorks.spin();
    rootRef.once('value', snapshot => {
     spinnerWorks.stop();
      // console.log(snapshot.val());
      let obj = snapshot.val();
      let count = 0;
    for (let prop in obj) {
    
    

    if (obj.hasOwnProperty(prop)) {
      count++;
     // console.log("o." + prop + " = " + obj[prop])
     // console.log(obj[prop].title);
  
      let table = document.getElementById("myTable");
      let row = table.insertRow(count);
      row.insertCell(0).innerHTML = obj[prop].title;
      row.insertCell(1).innerHTML = obj[prop].author;
      row.insertCell(2).innerHTML = obj[prop].pages;
     let read = row.insertCell(3);
     read.innerHTML = obj[prop].read;

     read.setAttribute('data-attribute',prop);


      row.insertCell(4).innerHTML = obj[prop].member;


      read.addEventListener('click', function(event){ 
      
         if(this.innerHTML === "<center>✔</center>") {
          //  this.innerHTML = "<center>&#10005;</center>";
          let newData = {
            read: "<center>&#10005;</center>"
          } 
          database.ref("/blubb").child(prop).update(newData);
       // console.log(prop);
          // console.log("Test");
          // mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
           render();
          
     
         }
         else if(this.innerHTML === "<center>✕</center>") {
          // this.innerHTML = "<center>&#x2714;</center>";
          // mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML; 
          let newData = {
            read: "<center>&#x2714;</center>"
          } 
          rootRef.child(prop).update(newData);
          // console.log("Test2");
           
           render();
 
         }
         
      }) 

      let buttonCell = row.insertCell(5);
      buttonCell.className = "remove";
      buttonCell.innerHTML = `<button id="${prop}" onclick="remove('${prop}')" class="removeButton">Remove</button>`
     
    
    
    
    }
    
    }

  })
}


/*

    myLibrary.forEach(function (item,index) {

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
*/
  
  //document.querySelectorAll('[data-attribute]')

//  addBookToLibrary("The Hobbit","J.R.R. Tolkien",500,"<center>&#x2714;</center>","Moritz");
//  addBookToLibrary("The Hobbit","J.R.R. Tolkien",500,"<center>&#x2714;</center>","Moritz");
//  addBookToLibrary("The Hobbit","J.R.R. Tolkien",500,"<center>&#x2714;</center>","Moritz");
  
  window.onload = function () {this.render();}

  function show() {
    document.getElementById("form").style.display = "block";
  }

  function hide() {
    document.getElementById("form").style.display = "none";
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

  function remove(prop) {
// myLibrary.splice(prop, 1);
rootRef.child(prop).remove();
var mytbl = document.getElementById("myTable");
mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
render();
  }


  