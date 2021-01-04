const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
  if (video.paused) {
    video.play()
  }
  else{
    video.pause()
  }
}
function skip(){
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
  video[this.name] = this.value
}
function updateButton(){
  const icon = this.paused ? '>' : '||'
  toggle.textContent = icon
}

function handleProgress(){
  const percent = (video.currentTime/video.duration)*100
  progressBar.style.flexbasis = `${percent}%`
}

function scrub(event){
  const scrubTime = (event.offsetX/progress.offsetWidth)*video.duration
  video.currentTime = scrubTime
}
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e)=>mousedown && scrub(e))
progress.addEventListener('mousemove', ()=>mousedown = true)
progress.addEventListener('mousemove', ()=> mousedown= false)


skipButtons.forEach(button => button.addEventListener('click', skip))
toggle.addEventListener('click', togglePlay)
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate))

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

