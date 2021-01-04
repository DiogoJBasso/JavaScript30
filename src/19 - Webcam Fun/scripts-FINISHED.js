var video = document.querySelector('.player');
var canvas = document.querySelector('.photo');
var ctx = canvas.getContext('2d');
var strip = document.querySelector('.strip');
var snap = document.querySelector('.snap');
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (localMediaStream) {
        console.log(localMediaStream);
        //  DEPRECIATION : 
        //       The following has been depreceated by major browsers as of Chrome and Firefox.
        //       video.src = window.URL.createObjectURL(localMediaStream);
        //       Please refer to these:
        //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
        video.srcObject = localMediaStream;
        video.play();
    })
        .catch(function (err) {
        console.error("OH NO!!!", err);
    });
}
function paintToCanvas() {
    var width = video.videoWidth;
    var height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return setInterval(function () {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        var pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
        // pixels = greenScreen(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}
function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();
    // take the data out of the canvas
    var data = canvas.toDataURL('image/jpeg');
    var link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = "<img src=\"" + data + "\" alt=\"Handsome Man\" />";
    strip.insertBefore(link, strip.firstChild);
}
function redEffect(pixels) {
    for (var i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}
function rgbSplit(pixels) {
    for (var i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}
function greenScreen(pixels) {
    var levels = {};
    document.querySelectorAll('.rgb input').forEach(function (input) {
        levels[input.name] = input.value;
    });
    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}
getVideo();
video.addEventListener('canplay', paintToCanvas);
//# sourceMappingURL=scripts-FINISHED.js.map