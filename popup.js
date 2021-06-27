var confettiCanvas = document.getElementById("confettiDiv");
confettiCanvas.style.display = "none";
var running;
var celebrationSound = new Audio('Party_Horn_Sound_Effect.mp3');

const textarea = document.getElementById("textarea");
const dismiss = document.getElementById("dismissButton");

var bgPage = chrome.extension.getBackgroundPage();

const textareasubmitted = document.getElementById("submittedText");
const submitText = document.getElementById("submitText");
const checkbox = document.getElementById("checkbox");

// Might need an onload thing since it always reset to false everytime it boots

window.onload = function() {
  bgPage.closed = false;
}

chrome.runtime.connect({ name: "popup" });

var countDownDate;
let countdownTimeStart = document.getElementById("countdownTimeStart");

dismiss.addEventListener("click", () => {
  confettiCanvas.style.display = "none";
})

// Button pressed run this
countdownTimeStart.addEventListener("click", () => {

  var e = document.getElementById("timeSelect");
  var strUser = e.options[e.selectedIndex].text;
  var timerMinutes = strUser.split(" ");
  var a = timerMinutes[0];

  var timeSelect = document.getElementById("timeSelect");
  var countdownTimeStart  = document.getElementById("countdownTimeStart")
var demo  = document.getElementById("demo")
  chrome.runtime.getBackgroundPage(function () {
      bgPage.running= true;
      bgPage.testFunction(a,timeSelect,countdownTimeStart,demo,confettiCanvas,celebrationSound); // Displays "mooh".
  });
  //
  // var distance;
  // var e = document.getElementById("timeSelect");
  // var strUser = e.options[e.selectedIndex].text;
  // var timerMinutes = strUser.split(" ");
  //
  // countDownDate = new Date().getTime() + (timerMinutes[0] * 1000); //Change 1000 - 60000 if you want to proper conversion
  // document.getElementById('timeSelect').style.visibility = 'hidden';
  // document.getElementById('countdownTimeStart').style.visibility = 'hidden';
  //
  // //60000
  // started = true
  // // Update the count down every 1 second
  // var x = setInterval(function () {
  //
  //   console.log("g");
  //
  //   // First time run  might need an onload thing since it always reset to false everytime it boots
  //
  //
  //   var now = new Date().getTime();
  //
  //   // Find the distance between now an the count down date
  //   distance = countDownDate - now;
  //   // Time calculations for days, hours, minutes and seconds
  //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //
  //   // Output the result in an element with id="demo"
  //   document.getElementById("demo").innerHTML = hours + "h "
  //     + minutes + "m " + seconds + "s ";
  //
  //   // If the count down is over, write some text
  //   if (distance <= 0) {
  //     document.getElementById('timeSelect').style.visibility = 'visible';
  //     document.getElementById('countdownTimeStart').style.visibility = 'visible';
  //     document.getElementById("demo").innerHTML = "EXPIRED";
  //
  //     // Show confetti and play song
  //     confettiCanvas.style.display = "block";
  //     celebrationSound.play();
  //     clearInterval(x);
  //   }
  // }, 1000);

});

submitText.addEventListener("click", () => {
  const blocked = textareasubmitted.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });
  textareasubmitted.value = "";

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      //  checkbox.checked = enabled;
    }
  });
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
