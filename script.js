
var rolls = []

function init(){
  document.getElementById("rollBox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("rollButton").click();
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
