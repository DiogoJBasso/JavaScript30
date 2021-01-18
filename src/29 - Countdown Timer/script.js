let countDown;
function timer(seconds) {
  //setInterval(..., 1000) doesn't quite "work" in IOS
  const now = Date.now;
  const then = now + seconds * 1000;
  setInterval(() => {
    let secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}
function displayTimeLeft(seconds) {
  const minutes = seconds / 60;
  console.log(seconds);
}
