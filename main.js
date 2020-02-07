  var monthly;
  $(document).ready(() => {
    document.getElementById("planDayDate").value=getDate();
  getAllDataFromLocalStorage();
  getPresentDataFromLocalStorage();
  eventscalculator();
  

  $("#saveBtn").click(function() {
    var task = $("#taskInput").val();
    var priority = $("#priorityInput").val();
    var status = $("#statusInput").val();
    var date = $("#planDayDate").val();
    //   console.log(task+status+priority+date);
    var colour;

    //   alert(task+status+priority+date);
    if(status == "Pending")
    {
     colour =  "#ff3333"
    }
    if(status == "Inprogress")
    {
     colour =  "#00cc00"
    }
    if(status == "Completed")
    {

      colour = "#007acc";
    }
    

    var dataObj = {
      name: task,
      priority: priority,
      status: status,
      startdate: date,
      color: colour
    };
    saveDataToLocalStorage(dataObj);
    getPresentDataFromLocalStorage();
    getAllDataFromLocalStorage();

    // thinking of array instead of object;
  });
  
  

  
});

// Documen ready ends


function getPresentDataFromLocalStorage() {
  var data = JSON.parse(localStorage.getItem("data"));
  if(!data){
    return;
  }
  let output = `<table style="width:100%">
  <tr>
  <th>Date</th>
  <th>Name</th> 
  <th>Priority</th>
  <th>Status</th>
</tr>`;
let i=0;
  data.forEach(element => {
    if(element.startdate == getDate() ){
    output += `<tr>
               <td>${element.startdate}</td>
              <td>${element.name}</td>
              <td>${element.priority}</td>
              <td> ${element.status}</td>
              <td><button onclick="Delete(${i})"class="btn btn-primary">Delete</button></td>
              <td><button onclick="update(${i})"class="btn btn-info">Update</button></td>
              </tr>`;
              
    }
    i++;
  });
  output += `</table>`
  $("#showTasks").html(output);
}
function eventscalculator() {
  monthly = JSON.parse(localStorage.getItem("data"));
  if(!monthly){
    return;
  }
  var eventsData = {
    "monthly": []
  };

  monthly.forEach((element, index) => {
    eventsData.monthly.push({
      "id": index,
      "name":element.name,
      "startdate": element.startdate,
      "color": element.color
    });
  });
 
  $("#demo-1").monthly({
    mode: "event",
    dataType: "json",
    events: eventsData
  });;
}





function getAllDataFromLocalStorage() {
  var data = JSON.parse(localStorage.getItem("data"));
  if(!data){
    return;
  }
  let output = `<table style="width:100%">
  <tr>
  <th>Date</th>
  <th>Name</th> 
  <th>Priority</th>
  <th>Status</th>
</tr>`;
  data.forEach(element => {
    output += `<tr>
               <td>${element.startdate}</td>
              <td>${element.name}</td>
              <td>${element.priority}</td>
              <td> ${element.status}</td>
              </tr>`;
  });
  output += `</table>`;
  $("#showAllTaskData").html(output);
}
function saveDataToLocalStorage(data) {
  monthly = JSON.parse(localStorage.getItem("data")) || [];
   monthly.push(data);
   localStorage.setItem("data", JSON.stringify(monthly));
 }
 function Delete(item){
  monthly.splice(item,1);
  localStorage.setItem("data",JSON.stringify(monthly));
  getAllDataFromLocalStorage();
  getPresentDataFromLocalStorage();
  eventscalculator();
}
function update(item){
  $("#taskInput").val(monthly[item].name);
  $("#priorityInput").val(monthly[item].priority);
  $("#statusInput").val(monthly[item].status);
  $("#planDayDate").val(monthly[item].startdate);
  Delete(item);
}
function getDate() {
  var today = new Date();
   return(
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2)
   )
}
