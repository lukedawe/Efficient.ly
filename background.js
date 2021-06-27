let color = '#3aa757';
    var distance;
var cow = "mooh";
var closed;
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
           closed = true;
        });
    }
});

function testFunction (e,timeSelect,countdownTimeStart,demo,confettiCanvas,celebrationSound) {
  var countDownDate;




    if(running == true){
    countDownDate = new Date().getTime() + (e * 1000); //Change 1000 - 60000 if you want to proper conversion
    timeSelect.style.visibility = 'hidden';
    countdownTimeStart.style.visibility = 'hidden';
     }
    //60000
    started = true
    // Update the count down every 1 second
    var x = setInterval(function () {


      // First time run  might need an onload thing since it always reset to false everytime it boots


      var now = new Date().getTime();

      // Find the distance between now an the count down date
      distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      if(closed == false){
      demo.innerHTML = hours + "h "+ minutes + "m " + seconds + "s ";
    }


      // If the count down is over, write some text
      if (distance <= 0) {
          if(closed == false){
            alert("YES");
    timeSelect.style.visibility = 'visible';
      countdownTimeStart.style.visibility = 'visible';
      demo.innerHTML = "EXPIRED";
        }

        // Show confetti and play song
        confettiCanvas.style.display = "block";
        celebrationSound.play();
        clearInterval(x);
      }
    }, 1000);
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// from https://dev.to/penge/learn-the-most-useful-chrome-apis-by-creating-block-site-chrome-extension-2de8
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
      chrome.tabs.remove(tabId);
    }
  });
});
