var accounttypeInfor = [];
var accountinfor = [];

var index = new Number(0);
var total = 0;
var size = new Number(3);
var totalpages = 0;
var pageno = new Number(1);
size = 4;

var messageBox = document.getElementById("message");
var messagepanel = document.getElementById("msgpanel");
var messagetitle = document.getElementById("msgtitle");
var message = document.getElementById("msg");
var accttype = document.getElementById("account_type").value;
var acctname = document.getElementById("accountName").value;
var isincome = document.getElementById("isincome").value;
var acctcode = document.getElementById("code").innerText;
var id = "";


function openUrl(url) {
  window.location.assign(url);
 
 }
function onSaveUser() {

  var status = "";
  var message = "";
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;

  var formdata = 'username=' + username + '& password=' + password + '&email=' + email + '';
  console.log(formdata);


  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost/KanyikeStudio/system/saveuser");
  document.getElementById('btn').innerHTML = "Loading";

  document.getElementById('btn').disabled = true;

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    document.getElementById('id01').style.display = 'block';

    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.status);
      console.log(this.responseText);
      message = JSON.parse(xhr.responseText);
      onDisplay(status, JSON.parse(xhr.responseText));
      window.location.assign('/index.html');

    } else {
      status = xhr.status;
      message = JSON.parse(xhr.responseText);
      onDisplay(status, JSON.parse(xhr.responseText));
    }
  };
  xhr.send(formdata);
}

function onDisplay(status, obj) {
  var elem = document.getElementById("myBar");
  // var width = 100;
  // var id = setInterval(frame, 10);
  // function frame() {
  if (status == 200) {
    // elem.style.width = width + '%';
    // clearInterval(id);
    document.getElementById("message").className = "w3-text-green w3-animate-opacity w3-large";
    document.getElementById("message").innerHTML = "Saved Successful";

  } else {
    // elem.style.width = width + '%';
    // clearInterval(id);
    document.getElementById("message").className = "w3-text-red w3-animate-opacity w3-large";
    document.getElementById("message").innerHTML = "failed to save";
  }
  // }
  document.getElementById('btn').innerHTML = "Save";

  document.getElementById('btn').disabled = false;
}



// ////////////////////////////
// ////////Account file.
// ///////
// // //////////////////////////////
// function onloadAccountypes() {
//   var select = document.getElementById("account_type");
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       // console.log(this.responseText);
//       var data = JSON.parse(this.responseText);
//       // console.log(data.length);
//       accounttypeInfor = data;
//       for (accounttype of data) {
//         var option = document.createElement("option");
//         option.value = accounttype.id;
//         option.text = accounttype.name;
//         select.appendChild(option);
//       }
//     }
//   };
//   xhttp.open("GET", "http://localhost/KanyikeStudio/system/accounttypes", true);
//   xhttp.send();
//   // console.log(accounttypeInfor.length);
// }
// function onselectAccountCode(selection) {
//   var x = selection.selectedIndex;
//   var y = selection.options;
//   console.log("hello its me");
//   console.log(accounttypeInfor.length);
//   for (accounttype of accounttypeInfor) {
//     if (accounttype.id == y[x].value) {
//       document.getElementById("code").innerHTML = accounttype.accountcode;
//     }
//   }

// }
// function onclearAccountForm() {
//   document.getElementById("account_type").value = "";
//   document.getElementById("accountName").value = "";
//   document.getElementById("isincome").value = "";
//   document.getElementById("code").innerText = "";
//   var btn = document.getElementById('btn');
//   btn.innerHTML = "Create Account";
//   btn.disabled = false;
// }
// function onCreateAccount() {
//   console.log("saving ....")
//   var accttype = document.getElementById("account_type").value;
//   var acctname = document.getElementById("accountName").value;
//   var isincome = document.getElementById("isincome").value == "" ? "NULL" : document.getElementById("isincome").value;
//   var acctcode = document.getElementById("code").innerText;
//   var btn = document.getElementById('btn');
//   btn.innerHTML = "Loading";
//   btn.disabled = true;
//   var formdata = 'acountCode=' + acctcode + '& isincome=' + isincome + '&accountName=' + acctname + '&account_type=' + accttype + '';
//   console.log(formdata);

//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", "http://localhost/KanyikeStudio/system/new/account");


//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function () {
//     // document.getElementById('id01').style.display='block';
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       feedback = JSON.parse(xhr.responseText);
//       btn.innerHTML = "createAccount";
//       btn.disabled = false;
//       document.getElementById('accountfom').style.display = 'none';

//       messageBox.style.display = 'block';
//       messagepanel.className = "w3-panel w3-green";
//       messagetitle.innerHTML = "Success";
//       message.innerHTML = feedback.message;


//     } else {
//       // feedback= JSON.parse(xhr.responseText);
//       btn.innerHTML = "createAccount";
//       btn.disabled = false;
//       messageBox.style.display = 'block';
//       messagepanel.className = "w3-panel w3-red";
//       messagetitle.innerHTML = "Failed !";
//       message.innerHTML = xhr.responseText;

//     }
//   };
//   xhr.send(formdata);
// }
// async function onloadAccounts() {
//   var table = document.getElementById("table");
//   onclearTable(table);
//   var xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost/KanyikeStudio/system/accounts", true);
//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var data = JSON.parse(this.responseText);
//       accountinfor = data;
//       onPageniation(accountinfor, table);
//     }
//   };
// }
// function onPageniation(data, table) {
//   total = data.length;
//   totalpages = Math.ceil(total / size);
//   pageno = new Number(1);
//   var index = new Number(0);
//   index = (pageno == "1" ? index : (pageno - 1) * size);
//   // onclearTable(table);
//   for (var i = 0; i < data.length; i++) {
//     var row = table.insertRow(table.length);
//     var id = row.insertCell(0)
//     var acctcode = row.insertCell(1);
//     var acttname = row.insertCell(2);
//     var accttype = row.insertCell(3);
//     var isincome = row.insertCell(4);
//     var action = row.insertCell(5);
//     // console.log(accountinfor[i]["accountName"]);
//     id.innerHTML = i + 1;
//     acctcode.innerHTML = accountinfor[i]["acountCode"];
//     acttname.innerHTML = accountinfor[i]["accountName"].toUpperCase();
//     accttype.innerHTML = accountinfor[i]["name"].toUpperCase();
//     isincome.innerHTML = accountinfor[i]["isincome"] == "NULL" ? "Not" : accountinfor[i]["isincome"];
//     action.innerHTML = '<button class="w3-bar-item w3-button  w3-black" onclick="onEditAccount(this)">Edit</button><button class="w3-bar-item w3-button w3-red">Delete</button>';
//   }
//   onDisplayTable(index);

// }
// async function onDisplayTable(index) {
//   var table = document.getElementById('table');
//   total = table.rows.length;//inludes the header;
//   totalpages = Math.ceil(total / size);
//   count = 1;
//   tr = table.getElementsByTagName("tr");

//   for (var i = 1; i < tr.length; i++) {
//     tr[i].style.display = "none"
//     if (i == index + 1) {
//       if (count <= size) {
//         tr[i].style.display = "";
//       }
//       count++;
//       index++;
//     }
//   }
// }
// function onclearTable(table) {
//   tr = table.getElementsByTagName("tr");
//   console.log("here with the clicked ")
//   console.log(table.rows.length + " " + tr.length);
//   console.log(table.rows.length + " " + tr.length);
//   while (table.rows.length != 1) {
//     for (var i = 1; i < table.rows.length; i++) {
//       console.log("the ids" + i);
//       table.deleteRow(i);
//     }
//   }
//   console.log(table.rows.length + " " + tr.length);
//   // }
// }
// async function onNextPage() {
//   var table = document.getElementById("table");
//   total = accountinfor.length;
//   totalpages = Math.ceil(total / size);
//   pageno = pageno < totalpages ? pageno + 1 : pageno;
//   var index = new Number(0);
//   index = (pageno == "1" ? index : (pageno - 1) * size);
//   onDisplayTable(index, table);
// }
// async function onPreviousPage() {
//   var table = document.getElementById("table");
//   total = accountinfor.length;
//   totalpages = Math.ceil(total / size);
//   pageno = (pageno - 1) < 1 ? pageno : pageno - 1;
//   var index = new Number(0);
//   index = (pageno == "1" ? index : (pageno - 1) * size);
//   onDisplayTable(index, table);
// }
// function onfiltervalue() {
//   var input, filter, table, tr, td, i;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("table");
//   tr = table.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[2];
//     if (td) {
//       txtValue = td.textContent || td.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }
// async function onEditAccount(row) {
//   // getting what to onEditAccount;
//   console.log("Editing ....")
//   var i = row.parentNode.parentNode.rowIndex;
//   console.log(i);
//   var table = document.getElementById("table");
//   tr = table.getElementsByTagName("tr");
//   td = tr[i].getElementsByTagName("td")[1];
//   if (td) {
//     txtValue = td.textContent || td.innerText;
//     onloadDataonForm(txtValue);
//   }
// }
// async function onloadDataonForm(text) {
//   document.getElementById('accountfom').style.display = 'block';
//   onloadAccountypes();
//   var btn = document.getElementById('btn');
//   var edit = document.getElementById('btn2');
//   btn.style.display = 'none';

//   edit.style.display = 'block';

//   var query = 'accountCode=' + text + '';
//   var xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost/KanyikeStudio/system/accountcode?" + query);
//   xhttp.onreadystatechange = function () {

//     if (this.readyState == 4 && this.status == 200) {
//       var data = JSON.parse(this.responseText);
//       var obj = data[0];
//       id = obj.id;
//       document.getElementById("account_type").value = obj.account_type;
//       document.getElementById("accountName").value = obj.accountName;
//       document.getElementById("isincome").value = obj.isincome != "NULL" ? obj.isincome : "";
//       document.getElementById("code").innerText = obj.acountCode;
//       if (edit.addEventListener) {     // For all major browsers, except IE 8 and earlier
//         edit.addEventListener("click", onUpdateAccount);
//       } else if (x.attachEvent) {   // For IE 8 and earlier versions
//         edit.attachEvent("onclick", onUpdateAccount);
//       }
//       // edit.onclick= onUpdateAccount();

//     }
//   };
//   xhttp.send(query);
// }
// function onUpdateAccount() {
//   console.log("clicked" + id);
//   var btn = document.getElementById('btn2');

//   var accttype = document.getElementById("account_type").value;
//   var acctname = document.getElementById("accountName").value;
//   var isincome = document.getElementById("isincome").value == "" ? "NULL" : document.getElementById("isincome").value;
//   var acctcode = document.getElementById("code").innerText;

//   var formdata = 'acountCode=' + acctcode + '& id=' + id + '& isincome=' + isincome + '&accountName=' + acctname + '&account_type=' + accttype + '';
//   console.log(formdata);
//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", "http://localhost/KanyikeStudio/system/edit/account");
//   btn.innerHTML = "Loading";
//   btn.disabled = true;

//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function () {
//     // document.getElementById('id01').style.display='block';
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       feedback = JSON.parse(xhr.responseText);
//       document.getElementById('accountfom').style.display = 'none';

//       messageBox.style.display = 'block';
//       messagepanel.className = "w3-panel w3-green";
//       messagetitle.innerHTML = "Success";
//       message.innerHTML = feedback.message;


//     } else {
//       // feedback= JSON.parse(xhr.responseText);
//       messageBox.style.display = 'block';
//       messagepanel.className = "w3-panel w3-red";
//       messagetitle.innerHTML = "Failed !";
//       message.innerHTML = xhr.responseText;

//     }
//   };
//   xhr.send(formdata);
//   onloadAccounts();
// }
// onloadAccounts();
// //////////back up////
