
const textarea = document.getElementById("textarea");

var bgpage = chrome.extension.getBackgroundPage();


// Might need an onload thing since it always reset to false everytime it boots



var countDownDate;
let countdownTimeStart = document.getElementById("countdownTimeStart");


// Button pressed run this
countdownTimeStart.addEventListener("click",() => {
var distance;
var e = document.getElementById("timeSelect");
var strUser = e.options[e.selectedIndex].text;
var timerMinutes = strUser.split(" ");

// Why is this in here i don't know
const textareasubmitted = document.getElementById("submittedText");
const submitText = document.getElementById("submitText");
const checkbox = document.getElementById("checkbox");

  countDownDate = new Date().getTime() + (timerMinutes[0] * 1000); //Change 1000 - 60000 if you want to proper conversion
  document.getElementById('timeSelect').style.visibility = 'hidden';
  document.getElementById('countdownTimeStart').style.visibility = 'hidden';

//60000
started = true
// Update the count down every 1 second
var x = setInterval(function() {

console.log("g");

    // First time run  might need an onload thing since it always reset to false everytime it boots


    var now = new Date().getTime();

    // Find the distance between now an the count down date
    distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance <= 0) {
      document.getElementById('timeSelect').style.visibility = 'visible';
        document.getElementById('countdownTimeStart').style.visibility = 'visible';
    document.getElementById("demo").innerHTML = "EXPIRED";
        clearInterval(x);

    }
}, 1000);

  });


  submitText.addEventListener("click", () => {
    textareasubmitted.value = "";
    const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
    chrome.storage.local.set({ blocked });
  });

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
    //  checkbox.checked = enabled;
    }
  });
});
