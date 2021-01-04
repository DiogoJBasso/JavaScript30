var player = document.querySelector('.player');
var video = player.querySelector('.viewer');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress__filled');
var toggle = player.querySelector('.toggle');
var skipButtons = player.querySelectorAll('[data-skip]');
var ranges = player.querySelectorAll('.player__slider');
function togglePlay() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function updateButton() {
    var icon = this.paused ? '>' : '||';
    toggle.textContent = icon;
}
function handleProgress() {
    var percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexbasis = percent + "%";
}
function scrub(event) {
    var scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function (e) { return mousedown && scrub(e); });
progress.addEventListener('mousemove', function () { return mousedown = true; });
progress.addEventListener('mousemove', function () { return mousedown = false; });
skipButtons.forEach(function (button) { return button.addEventListener('click', skip); });
toggle.addEventListener('click', togglePlay);
ranges.forEach(function (range) { return range.addEventListener('click', handleRangeUpdate); });
ranges.forEach(function (range) { return range.addEventListener('mousemove', handleRangeUpdate); });
//# sourceMappingURL=scripts.js.map