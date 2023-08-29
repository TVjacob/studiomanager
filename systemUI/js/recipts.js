var recipts = [];
var customersBalances = [];


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
var payaccount = document.getElementById("payaccount").value;
var tdate = document.getElementById("tdate").value;
var remrks = document.getElementById("remarks").value;
var amt = document.getElementById("amount").value;
var customer = document.getElementById("customer").value;

var id = "";



////////////////////////////
////////Bills file.
///////
// //////////////////////////////
function onLoadCustomersBalances() {
  var datalist = document.getElementById("samples");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      customersBalances = data;
      var cnt =0;
      for (balance of data) {
        var option = document.createElement("option");
        option.value = cnt;
        var balanceamt = balance.totalbill-balance.totalpayments;
        option.text = balance.customername +" "+formatUsing(balanceamt) ;
        datalist.appendChild(option);
        cnt++;
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/find/balances", true);
  xhttp.send();
}
function onclearReciptForm() {
  document.getElementById("customer").value = "";
  document.getElementById("tdate").value = "";
  document.getElementById("payaccount").value = "";
  document.getElementById("amount").innerText = 0;
  document.getElementById("totalbill").innerText = 0;
  document.getElementById("balance").innerText = 0;
  document.getElementById("totalpayment").innerText = 0;
  document.getElementById("service").innerHTML="Service :";

  document.getElementById("remarks").innerText = "";
  var btn = document.getElementById('btn');
  btn.innerHTML = "New Recipt";
  btn.disabled = false;
}
function onCreateRecipt() {
  // var accttype = document.getElementById("account_type").value;
  // var acctname = document.getElementById("accountName").value;
  // var isincome = document.getElementById("isincome").value == "" ? "NULL" : document.getElementById("isincome").value;
  // var acctcode = document.getElementById("code").innerText;
  var btn = document.getElementById('btn');
  btn.innerHTML = "Loading";
  btn.disabled = true;
  var customer_id = customersBalances[customer]['customername']
  var referID = customersBalances[customer]['reference_id']
  var formdata = 'customer=' + customer_id + '& remarks=' + remarks + '&amount=' + amount + '&tdate=' + tdate +  '&reference_id=' + referID +'&debit=' + payaccount +'';
  console.log(formdata);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/bill/payment");


  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      feedback = JSON.parse(xhr.responseText);
      btn.innerHTML = "New Recipt";
      btn.disabled = false;
      document.getElementById('reciptsform').style.display = 'none';
      messageBox.style.display = 'block';
      messagepanel.className = "w3-panel w3-green";
      messagetitle.innerHTML = "Success";
      message.innerHTML = feedback.message;

    } else {
      btn.innerHTML = "New Recipt";
      btn.disabled = false;
      messageBox.style.display = 'block';
      messagepanel.className = "w3-panel w3-red";
      messagetitle.innerHTML = "Failed !";
      message.innerHTML = xhr.responseText;
    }
  };
  xhr.send(formdata);
}
async function onLoadRecipts() {
  var table = document.getElementById("table");
  onclearTable(table);
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/find/recipts", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      recipts = data;
      onPageniation(recipts, table);
    }
  };
}
function onPageniation(data, table) {
  total = data.length;
  totalpages = Math.ceil(total / size);
  pageno = new Number(1);
  var index = new Number(0);
  index = (pageno == "1" ? index : (pageno - 1) * size);
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(table.length);
    var id = row.insertCell(0)
    var service = row.insertCell(1);
    var account = row.insertCell(2);
    var customer = row.insertCell(3);
    var amount = row.insertCell(4);
    var date = row.insertCell(5);
    var remarks = row.insertCell(6);
    var action = row.insertCell(7);
    id.innerHTML = recipts[i]["reference_id"];;
    service.innerHTML = recipts[i]["productname"];
    account.innerHTML = recipts[i]["accountName"];
    customer.innerHTML = recipts[i]["customername"];
    amount.innerHTML = recipts[i]["amount"];
    date.innerHTML = recipts[i]["transDate"];
    remarks.innerHTML = recipts[i]["remarks"];
    action.innerHTML = '<button class="w3-bar-item w3-button w3-red">Delete</button>';
  }
  onDisplayTable(index);

}
async function onDisplayTable(index) {
  var table = document.getElementById('table');
  total = table.rows.length;//inludes the header;
  totalpages = Math.ceil(total / size);
  count = 1;
  tr = table.getElementsByTagName("tr");

  for (var i = 1; i < tr.length; i++) {
    tr[i].style.display = "none"
    if (i == index + 1) {
      if (count <= size) {
        tr[i].style.display = "";
      }
      count++;
      index++;
    }
  }
}
function onclearTable(table) {
  tr = table.getElementsByTagName("tr");
  console.log("here with the clicked ")
  console.log(table.rows.length + " " + tr.length);
  console.log(table.rows.length + " " + tr.length);
  while (table.rows.length != 1) {
    for (var i = 1; i < table.rows.length; i++) {
      table.deleteRow(i);
    }
  }
  console.log(table.rows.length + " " + tr.length);
  // }
}
async function onNextPage() {
  var table = document.getElementById("table");
  total = accountinfor.length;
  totalpages = Math.ceil(total / size);
  pageno = pageno < totalpages ? pageno + 1 : pageno;
  var index = new Number(0);
  index = (pageno == "1" ? index : (pageno - 1) * size);
  onDisplayTable(index, table);
}
async function onPreviousPage() {
  var table = document.getElementById("table");
  total = accountinfor.length;
  totalpages = Math.ceil(total / size);
  pageno = (pageno - 1) < 1 ? pageno : pageno - 1;
  var index = new Number(0);
  index = (pageno == "1" ? index : (pageno - 1) * size);
  onDisplayTable(index, table);
}
function onfiltervalue() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    td3 = tr[i].getElementsByTagName("td")[3];
    td4 = tr[i].getElementsByTagName("td")[4];
    td5 = tr[i].getElementsByTagName("td")[5];
    td6 = tr[i].getElementsByTagName("td")[6];
    if (td1 || td2 || td3 || td4 || td5 || td6) {
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      txtValue3 = td3.textContent || td3.innerText;
      txtValue4 = td4.textContent || td4.innerText;
      txtValue5 = td5.textContent || td5.innerText;
      txtValue6 = td6.textContent || td6.innerText;


      if (txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1 ||
        txtValue3.toUpperCase().indexOf(filter) > -1 ||
        txtValue4.toUpperCase().indexOf(filter) > -1 ||
        txtValue5.toUpperCase().indexOf(filter) > -1 ||
        txtValue6.toUpperCase().indexOf(filter) > -1 ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
async function  ondisplayFormData(person){
 var index =person.value;
 if(index!=null||index!=""){
  var totalbalance = customersBalances[index]['totalbill']-customersBalances[index]['totalpayments'];
  document.getElementById("totalbill").value=formatUsing(customersBalances[index]['totalbill']);
  document.getElementById("balance").value=formatUsing(totalbalance);
  document.getElementById("totalpayment").value=formatUsing(customersBalances[index]['totalpayments']);
 } 
}

onLoadRecipts();
onLoadCustomersBalances();


