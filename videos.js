const mp4Carousel = document.getElementById('mp4Carousel');
const mp4Slides = document.querySelectorAll('.mp4-slide');
const mp4Videos = document.querySelectorAll('video');
let mp4CurrentIndex = 0;

function updateMp4Carousel() {
  mp4Carousel.style.transform = `translateX(-${mp4CurrentIndex * 100}%)`;
  pauseMp4Videos();
}

function mp4Next() {
  if (mp4CurrentIndex < mp4Slides.length - 1) {
    mp4CurrentIndex++;
    updateMp4Carousel();
  }
}

function mp4Prev() {
  if (mp4CurrentIndex > 0) {
    mp4CurrentIndex--;
    updateMp4Carousel();
  }
}

function pauseMp4Videos() {
  mp4Videos.forEach(video => {
    video.pause();
    video.currentTime = 0; // opcional: reinicia o vídeo
  });
}
