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

  var	database = firebase.database();
  var ref = database.ref();
  ref.on("value", gotData);

  function clearTraining(){
    $("#name, #destination, #hours, #minutes, #frequency").val("");
  };

function gotData(data){
    var trainTable = $("td");
    for (var i = 0; i < trainTable.length; i++){
      trainTable[i].remove();
      console.log(trainTable);
    };
  

  console.log(data.val());
  var trains = data.val();
  var keytrain = Object.keys(trains);
  console.log(keytrain);
  



    // var name = "";
    // var destination = "";
    // var arrivalTime = "";
    // var hours = "";
    // var minutes = "";
    // var frequency = "";

		$("#submit-button").on("click",function(event){
      event.preventDefault();

      
		var	name = $("#train-name").val().trim();
		var	destination = $("#destination").val().trim();
    var arrivalTime = hours + minutes;
    var hours = $("#train-hours").val();
    var minutes = $("#train-minutes").val();
    var frequency = $("#frequency").val().trim();

      var trainMaze = {
        name: name,
        destination: destination,
        startingTime: arrivalTime,
        frequency: frequency
      };
      clearTraining();
      ref.push(trainMaze);
      console.log(firebase);

      // $("#train-name").val("");
      // $("#destination").val("");
      // $("#time-departed").val("");
      // $("#train-hours").val("");
      // $("#train-minutes").val("");
      // $("#frequency").val("");
  
    });
      



  function CalcNextArrival(x, y){

    var frequency = x;
    var firstTime = y;
    

		var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % frequency;
    
    tMinutesTillTrain = frequency - tRemainder;

    nextTrain = moment().add(remaining, "minutes");
    result = moment(nextTrain).format("hh:mm A");

    return [result, tMinutesTillTrain];
    
  };
  
    ref.on("child_added", function(snapshot){
      
      $(".tbod").append(`
      <tr>
        <td>${snapshot.val().name}</td>
        <td>${snapshot.val().destination}</td>
        <td>${snapshot.val().frequency}</td>
        <td>${CalcNextArrival(snapshot.val().frequency,snapshot.val().arrivalTime)[0]}</td>
        <td>${CalcNextArrival(snapshot.val().frequency.snapshot.val().arrivalTime)[1]}</td>   
      </tr>
      `);
      console.log(snapshot.val());
    });
  };

});
  
      // console.log(snapshot.val());
      // console.log(snapshot.val().name);
      // console.log(snapshot.val().destination);
      // console.log(snapshot.val().arrivalTime);
      // console.log(snapshot.val().frequency);

     
      // $("#nameT").text(snapshot.val().name),
      // $("#destinationT").text(snapshot.val().destination),
      // $("#frequencyT").text(snapshot.val().frequency),
      // $("#arrivalT").text(snapshot.val().arrivalTime)
