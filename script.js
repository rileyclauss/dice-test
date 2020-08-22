
var rolls = [0]; //Array of which numbers are rolled, rolls[0] is 1 and [19] is 20
var dieSelected = 0; //initialized variable for which die is selected
var myChart; //object for chart/manipulation
var totRolls; //counter for total rolls thrown
var totRollVal; //total value of all rolls, used for calculating average
var avgRoll;
var perfectAvg = 0.5;
var ctx; //initialize chart

function init(){

  dieSelected = 3; //defaults to d4

  document.getElementById("rollBox") //get input box
    .addEventListener("keyup", function(event) { //add event for enter key
    event.preventDefault();
    if (event.keyCode === 13) { //verify enter key pressed
        document.getElementById("rollButton").click(); //execute submission
    }
  });
  ctx = document.getElementById("myChart").getContext('2d');
  totRolls = 0;
  updateChart(ctx);
  generateMenu();
}

/*function updateChart(chrt){
  myChart = new Chart(chrt, {
    type: 'pie', //bar graph
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
      //labels along the x axis
    datasets: [{
      label: '# of Rolls', //label at the top of the chart
      data: rolls, //input the rolls array as data
      backgroundColor: [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      ],
      borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true //minimum of 0 per roll
          }
        }]
      }
    }
  });
}
*/

function updateChart(chrt){
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: rolls,
    options: null
});
}

function generateMenu(){ //executed when #begin is pressed
    document.getElementById("begin").innerHTML="Restart"; //change to Restart
    rolls=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //initialize rolls, as we are restarting
    dieSelected = document.getElementById("dieDD")
      .options[document.getElementById("dieDD")
      .selectedIndex].value.substring(1,3); //find selected die, substring 1,3 to cut out "d" at the beginning

    dieSelected = Number(dieSelected); //convert to number
    dieSelected -= 1;
    totRolls = 0; //reset total number of rolls
    totRollVal = 0;
    avgRoll = 0;
    perfectAvg = (((dieSelected + 1)/2)+(1/2))
    document.getElementById('perfectAvg').innerHTML=perfectAvg;

    document.getElementById("buttonMenuL").innerHTML=""; //clear left half of buttons
    document.getElementById("buttonMenuR").innerHTML=""; //clear right half of buttons

    if (dieSelected>10){ //if there's more than 10 buttons,
      document.getElementById("buttonMenuL").setAttribute('class', 'sbs'); //make the left div float, allow SBS/Side by Side
    }
    var cell = [];
    var row;
    var table = document.getElementById("trackTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
    trackTable.deleteTHead();
    var header = trackTable.createTHead();
    var headRow = header.insertRow(0);

    headRow.insertCell(0).innerHTML="Roll";
    headRow.insertCell(1).innerHTML="Num";

    if (dieSelected >= 10){
      headRow.insertCell(0).innerHTML="Roll";
      headRow.insertCell(1).innerHTML="Num";
    }
    for (var i = 0; i <= dieSelected; i++){ //for loop to create the buttons

      let div = document.createElement('div'); //new div as container of button and label
        div.id = `roll${i}`; //id iterated
        div.setAttribute('class', 'rollNum'); //rollNum class for spacing

        let lb = document.createElement('label'); //new label
        lb.for="btn"; //assign label to button
        lb.textContent = `Rolled a ${i+1}: `;
        if (i+1 === 8 || i+1 === 11 || i+1 === 18){
          lb.textContent = `Rolled an ${i+1}: `;
        }

        if (i<9){ //if it is a roll betwwen 1 and 9,
          lb.setAttribute('class', 'spacedLb'); //add a medium space after the label
        }
        else{
          lb.setAttribute('class', 'spacedSLb'); //add a small space after the label
        }

        let rollBtn = document.createElement('button'); //new button
        rollBtn.setAttribute('onClick', `add(${i})`); //add click event, i is number rolled
        rollBtn.type = "button"; //type to button
        rollBtn.textContent = "+1"; //add text
        rollBtn.setAttribute('class', 'floatright');
        div.appendChild(lb); //add lable to container
        div.appendChild(rollBtn); //add button to container

      if (i<10) { //if container is for rolls 1-10
        document.getElementById("buttonMenuL").appendChild(div); //add to the left box
      }
      if (i>=10){ //if container is for rolls 11-20
        document.getElementById("buttonMenuR").appendChild(div);  //add to right box
      } //leaving it as two ifs for if I want to add a d100, and it works well enough like this
    }

    if (dieSelected < 10){
      for (i = 0; i <= dieSelected; i++){
        row = table.insertRow(i+1);
        cell[0] = row.insertCell(0);
        cell[1] = row.insertCell(1);
        cell[0].innerHTML = (i+1).toString();
        cell[1].innerHTML= '0';
        cell[1].setAttribute('id', `cell${i}`);
      }
      row = table.insertRow(dieSelected+2);
      cell[0] = row.insertCell(0);
      cell[1] = row.insertCell(1);
      cell[0].innerHTML = "tot";
      cell[1].innerHTML = "0";
      cell[1].setAttribute('id', 'cellTotal');
    }
    else if (dieSelected == 11){
      for(i = 0; i < 2; i++){
        row = table.insertRow(i+1);
        cell[0] = row.insertCell(0); // label for first column
        cell[1] = row.insertCell(1); //value for first column
        cell[2] = row.insertCell(2);//label for second column
        cell[3] = row.insertCell(3);//value for second column
        cell[0].innerHTML = (i+1).toString();
        cell[2].innerHTML = (i+11).toString();
        cell[1].innerHTML = '0';
        cell[3].innerHTML = '0';
        cell[1].setAttribute('id', `cell${i}`);
        cell[3].setAttribute('id', `cell${i+10}`);
      }
      for (i = 2; i <= dieSelected - 2; i++){
        row = table.insertRow(i+1);
        cell[0] = row.insertCell(0);
        cell[1] = row.insertCell(1);
        cell[0].innerHTML = (i+1).toString();
        cell[1].innerHTML= '0';
        cell[1].setAttribute('id', `cell${i}`);
      }
      row = table.insertRow(dieSelected);
      cell[0] = row.insertCell(0);
      cell[1] = row.insertCell(1);
      cell[0].innerHTML = "tot";
      cell[1].innerHTML = "0";
      cell[1].setAttribute('id', 'cellTotal');
    }
    else if (dieSelected == 19){
      for(i = 0; i <= dieSelected - 10; i++){
        row = table.insertRow(i+1);
        cell[0] = row.insertCell(0); // label for first column
        cell[1] = row.insertCell(1); //value for first column
        cell[2] = row.insertCell(2);//label for second column
        cell[3] = row.insertCell(3);//value for second column
        cell[0].innerHTML = (i+1).toString();
        cell[2].innerHTML = (i+11).toString();
        cell[1].innerHTML = '0';
        cell[3].innerHTML = '0';
        cell[1].setAttribute('id', `cell${i}`);
        cell[3].setAttribute('id', `cell${i+10}`);
      }
      row = table.insertRow(dieSelected-8);
      cell[0] = row.insertCell(0);
      cell[1] = row.insertCell(1);
      cell[0].innerHTML = "tot";
      cell[1].innerHTML = "0";
      cell[1].setAttribute('id', 'cellTotal');
    }

    update();
}

function boxAdd(){ //called when enter is hit while rollBox is focused
  var inp = document.getElementById("rollBox").value; //get value of textbox

  inp = Number(inp) -1;
  if (typeof(inp)==="number"){
    if(inp <= dieSelected && inp >=0){
      document.getElementById("rollBox").value="";
      add(inp);

    }
    else{
      alert("Please enter a number in the appropriate range.");
    }
  }
  else{
    alert("Please enter a number.");
  }
}

function add(i){ //called when button is clicked or textbox has enter hit
  rolls[i] += 1; //add 1 to corresponding roll
  totRolls += 1; //add 1 to total rolls
  totRollVal += (i+1);
  avgRoll = totRollVal/totRolls;
  update(); //called to update chart and table
}

function update(){
  for(var i=0;i<=dieSelected;i++){
    document.getElementById(`cell${i}`).innerHTML = rolls[i];
  }
  document.getElementById('cellTotal').innerHTML = totRolls;
  document.getElementById('totRollsStat').innerHTML = totRolls;
  document.getElementById('totRollsCalcStat').innerHTML = totRolls;
  document.getElementById('totRollValStat').innerHTML = totRollVal;
  document.getElementById('avgRollStat').innerHTML = avgRoll;
  updateChart(ctx);
}
