const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch((err) => alert("Please, enable for us to create the video."));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    const pixels = ctx.
  }, 16);
  console.log(width, height);
}
function rgbSplit(pixels){
  for (let i=0;pixels.data.length; i++){
    pixels.data[i-150] = pixels.data[i]
    pixels.data[i-500] = pixels.data[i+1]
        pixels.data[i+550] = pixels.data[i+2]

  }
  return pixels
}

function greenScreen(pixels){
  const levels = {}
  [...document]
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  const data = data.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome folk">`;
  strip.insertBefore(link, strip.firstChild);
}
video.addEventListener("canplay", paintToCanvas);
