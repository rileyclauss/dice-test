
var rolls = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]

function init(){
  document.getElementById("rollBox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("rollButton").click();
    }
  });
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
    datasets: [{
      label: '# of Rolls',
      data: rolls,
      backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function generateMenu(){
    document.getElementById("begin").innerHTML="Restart";
    rolls=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    update();
    var selected = document.getElementById("dieDD").options[document.getElementById("dieDD").selectedIndex].value.substring(1,3);

    selected = Number(selected);

    document.getElementById("buttonMenuL").innerHTML="";
    document.getElementById("buttonMenuR").innerHTML="";
    if (selected>10){
      document.getElementById("buttonMenuL").setAttribute('class', 'sbs');
    }
    for (i = 0; i<selected; i++){

      let div = document.createElement('div');
        div.id = `roll${i+1}`;
        div.setAttribute('class', 'rollNum');
        let lb = document.createElement('label');
        lb.for="btn";
        lb.textContent = `Rolled a ${i+1}: `;
        if (i<9){
          lb.setAttribute('class', 'spacedLb');

        }
        let rollBtn = document.createElement('button');
        rollBtn.setAttribute('onClick', `add(${i})`);
        rollBtn.type = "button";
        rollBtn.textContent = "+1";
        div.appendChild(lb);
        div.appendChild(rollBtn);
      if (i<10) {
        document.getElementById("buttonMenuL").appendChild(div);
      }
      if (i>=10){
        document.getElementById("buttonMenuR").appendChild(div);
      }
    }
}

function add(i){
  rolls[i] += 1;

  update();
}

function boxAdd(){
  var inp = document.getElementById("rollBox").value;
  var selected = document.getElementById("dieDD")
    .options[document.getElementById("dieDD").selectedIndex]
    .value.substring(1,3);
  selected = Number(selected);
  inp = Number(inp) -1;
  if (typeof(inp)==="number"){
    if(inp <selected && inp >=0){
      document.getElementById("rollBox").value="";
      add(inp);

    }
    else{
      alert("Please enter a number in the appropriate range.")
    }
  }
  else{
    alert("Please enter a number.")
  }
}

function update(){
  for(var i=0;i<20;i++){
    document.getElementById(`chart${i+1}`).innerHTML = rolls[i];
  }

}
