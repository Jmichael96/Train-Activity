$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_36DLiH8BqDa5UPTzmz5KiVozQNLzoXg",
    authDomain: "train-activity-5ada6.firebaseapp.com",
    databaseURL: "https://train-activity-5ada6.firebaseio.com",
    projectId: "train-activity-5ada6",
    storageBucket: "train-activity-5ada6.appspot.com",
    messagingSenderId: "1035987292640"
  };
  firebase.initializeApp(config);

  var nextTrain = 0;
  var remaining = 0;

  //sound for submit button 
  var trainSound = new Audio("./assets/sounds/train.mp3");

  var	database = firebase.database();
  // declaring values to snapshot and gotData
  var ref = database.ref();
  ref.on("value",(function(snapshot){
    gotData(snapshot);
  }));

  function clearTraining(){
    $("#name, #destination, #hours, #minutes, #frequency").val("");
  };
//gotData function with for loop
function gotData(data){
    var trainTable = $("td");
    for (var i = 0; i < trainTable.length; i++){
      trainTable[i].remove();
      console.log(trainTable);
    };

    //submit button for all the inputs 
$("#submit-button").on("click",function(event){

      event.preventDefault();
    trainSound.play();
      //creating variables for inputs
		var	name = $("#train-name").val().trim();
		var	destination = $("#destination").val().trim();
    var hours = $("#hours").val();
    var minutes = $("#minutes").val();
    var frequency = $("#frequency").val().trim();
    var arrivalTime = hours + minutes;

      var trainMaze = {
        arrivalTime: arrivalTime,
        destination: destination,
        frequency: frequency,
        name: name
      };
      //if an event is blank stop and alert
      if(name === '' || destination === '' || arrivalTime === ''
      || frequency === '')
    {
     alert("Please fill out every option in the field below.");
    }else{
      clearTraining();
      ref.push(trainMaze);
    };
    console.log(trainMaze);
});

//calculation for the next arrival
  function calcNextArrival(x, y){

    var frequency = x;
    var firstTime = y;
    

		var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var remaining = diffTime % frequency;
    
    tMinutesTillTrain = frequency - remaining;

    nextTrain = moment().add(remaining, "minutes");
    result = moment(nextTrain).format("hh:mm A");

    return [result, tMinutesTillTrain];
    
  };
  //appending everything on the table
    ref.on("child_added", function(snapshot){
      $(".tBod").append(`
      <tr>
        <td>${snapshot.val().name}</td>
        <td>${snapshot.val().destination}</td>
        <td>${snapshot.val().frequency}</td>
        <td>${calcNextArrival(snapshot.val().frequency,snapshot.val().arrivalTime)[0]}</td>}
        <td>${calcNextArrival(snapshot.val().frequency,snapshot.val().arrivalTime)[1]}</td>}
      </tr>
      `);
      console.log(snapshot.val());
    });
  };
});
