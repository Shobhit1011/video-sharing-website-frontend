var videoElement = document.querySelector('.video-container');
if (videoElement) {
    var btnBackward = document.querySelector('.btn-backward');
    var btnExpand = document.querySelector('.btn-expand');
    var btnPictureInPicture = document.querySelector('.btn-picture-in-picture');
    var videoContainer = document.querySelector('.video-container-1');
    var videoControls = document.querySelector('.video-controls');
    var btnMute = document.querySelector('.btn-mute');
    var btnMuteIcon = btnMute.querySelector('.fa');
    var btnPlay = document.querySelector('.btn-pause');
    var btnPlayIcon = btnPlay.querySelector('.fa');
    var btnFullScreenIcon = btnExpand.querySelector('.fa');
    var btnForward = document.querySelector('.btn-forward');
    var btnReset = document.querySelector('.btn-reset');
    var btnStop = document.querySelector('.btn-stop');
    var progressBarFill = document.getElementById('progress-bar-fill');
    var bufferedBar = document.getElementById("buffered-amount");
    var defaultBar = document.getElementById("default-bar");
    var videoNameContainer = document.getElementById("expansion-panel");
    var timeBar = document.getElementById("time-bar");
    var bufferedAmount = document.getElementById("buffered-amount");
    var fullScreenFlag = 0;
    var timeout;
    var default_bar_width = 97;
    let root = document.documentElement
    root.style.setProperty('--top-y', 22 + "%");
    root.style.setProperty('--top-x', 47 + "%");
    root.style.setProperty('--top-y-mobile', 15 + "%");
    root.style.setProperty('--top-x-mobile', 42 + "%");

    window.onload = function () {
        videoElement.addEventListener('timeupdate', updateProgress, false);
    };

    // Toggle full-screen mode
    var video_div = document.getElementById('video-div');
    var expandVideo = () => {
        if (!fullScreenFlag) {
            if (videoElement.requestFullscreen) {
                videoElement.style.width = "100%";
                videoElement.style.height = "100%";
                video_div.style.height = "100%";
                video_div.style.width = "100%";
                videoContainer.requestFullscreen().catch((ex) => { console.log("Cannot do fullscreen") });
                fullScreenFlag = 1;
                btnFullScreenIcon.classList.remove('fa-expand');
                btnFullScreenIcon.classList.add('fa-compress');
            } else if (videoElement.mozRequestFullScreen) {
                // Version for Firefox
                videoElement.style.width = "100%";
                videoElement.style.height = "100%";
                video_div.style.height = "100%";
                video_div.style.width = "100%";
                videoContainer.mozRequestFullScreen()
                fullScreenFlag = 1;
                btnFullScreenIcon.classList.remove('fa-expand');
                btnFullScreenIcon.classList.add('fa-compress');
            } else if (videoElement.webkitRequestFullscreen) {
                // Version for Chrome and Safari
                videoElement.style.width = "100%";
                videoElement.style.height = "100%";
                video_div.style.height = "100%";
                video_div.style.width = "100%";
                videoContainer.webkitRequestFullscreen();
                fullScreenFlag = 1;
                btnFullScreenIcon.classList.remove('fa-expand');
                btnFullScreenIcon.classList.add('fa-compress');
            }
            root.style.setProperty('--top-y', 24 + "%");
            root.style.setProperty('--top-x', 48 + "%");
            root.style.setProperty('--top-y-mobile', 100 + "%");
            root.style.setProperty('--top-x-mobile', 42 + "%");
        }
        else {
            fullScreenFlag = 0;
            clearTimeout(timeout);
            videoControls.style.display = "block";
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
            root.style.setProperty('--top-y', 22 + "%");
            root.style.setProperty('--top-x', 47 + "%");
            root.style.setProperty('--top-y-mobile', 15 + "%");
            root.style.setProperty('--top-x-mobile', 42 + "%");
            btnFullScreenIcon.classList.remove('fa-compress');
            btnFullScreenIcon.classList.add('fa-expand');
            videoControls.style.display = "block";
            videoContainer.removeEventListener('mousemove', disableControls)
        }
    }

    // Move the video backward for 5 seconds
    var moveBackward = () => {
        videoElement.currentTime -= 5;
    }

    // Move the video forward for 5 seconds
    var moveForward = () => {
        videoElement.currentTime += 5;
    }

    // Mute the video
    var muteVideo = () => {
        if (videoElement.muted) {
            videoElement.muted = false;
            btnMuteIcon.classList.remove('fa-volume-up');
            btnMuteIcon.classList.add('fa-volume-off');
        } else {
            videoElement.muted = true;
            btnMuteIcon.classList.remove('fa-volume-off');
            btnMuteIcon.classList.add('fa-volume-up');
        }
    }

    // Play / Pause the video
    var playPauseVideo = () => {
        if (videoElement.paused) {
            videoElement.play();
            btnPlayIcon.classList.remove('fa-play');
            btnPlayIcon.classList.add('fa-pause');
        } else {
            videoElement.pause();

            btnPlayIcon.classList.remove('fa-pause');
            btnPlayIcon.classList.add('fa-play');
        }
    }

    // Restart the video
    var restartVideo = () => {
        videoElement.currentTime = 0;
        btnPlay.removeAttribute('hidden');
        btnReset.setAttribute('hidden', 'true');
        videoElement.play();
        btnPlayIcon.classList.add('fa-pause');
    }

    // Stop the video
    var stopVideo = () => {
        videoElement.pause();
        videoElement.currentTime = 0;
        btnPlayIcon.classList.remove('fa-pause');
        btnPlayIcon.classList.add('fa-play');
    }

    // Update progress bar as the video plays
    var updateProgress = () => {
        let currentWidth = (default_bar_width / videoElement.duration) * videoElement.currentTime;
        progressBarFill.style.width = currentWidth + "%";
        if (videoElement.duration) {
            if (videoElement.duration / 3600 >= 1) {
                let totalTimeInHours = Math.floor(videoElement.duration / 3600);
                let totalModTimeInHours = totalTimeInHours > 9 ? totalTimeInHours : '0' + totalTimeInHours;
                let totalTime = totalTimeInHours % 3600;
                let totalTimeInMinutes = Math.floor(totalTime / 60);
                let totalModTimeInMinutes = totalTimeInMinutes > 9 ? totalTimeInMinutes : '0' + totalTimeInMinutes;
                let totalTime2 = totalTimeInMinutes % 60;
                let totalTimeInSeconds = totalTime2;
                let totalModTimeInSeconds = totalTimeInSeconds > 9 ? totalTimeInSeconds : '0' + totalTimeInSeconds;
                let totalDuration = totalModTimeInHours + ":" + totalModTimeInMinutes + ":" + totalModTimeInSeconds;

                let timeInHours = Math.floor(videoElement.currentTime / 3600);
                let modTimeInHours = timeInHours > 9 ? timeInHours : '0' + timeInHours;
                let time = timeInHours % 3600;
                let timeInMinutes = Math.floor(time / 60);
                let modTimeInMinutes = timeInMinutes > 9 ? timeInMinutes : '0' + timeInMinutes;
                let time2 = timeInMinutes % 60;
                let timeInSeconds = time2;
                let modTimeInSeconds = timeInSeconds > 9 ? timeInSeconds : '0' + timeInSeconds;
                let timeElapsed = modTimeInHours + ":" + modTimeInMinutes + ":" + modTimeInSeconds;

                timeBar.innerHTML = timeElapsed + "/" + totalDuration;
            }
            else if (videoElement.duration / 60 >= 1) {
                let totalTimeInMinutes = Math.floor(videoElement.duration / 60);
                let totalModTimeInMinutes = totalTimeInMinutes > 9 ? totalTimeInMinutes : '0' + totalTimeInMinutes;
                let totalTimeInSeconds = Math.floor(videoElement.duration % 60);
                let totalModTimeInSeconds = totalTimeInSeconds > 9 ? totalTimeInSeconds : '0' + totalTimeInSeconds;
                let totalDuration = totalModTimeInMinutes + ":" + totalModTimeInSeconds;

                let timeInMinutes = Math.floor(videoElement.currentTime / 60);
                let modTimeInMinutes = timeInMinutes > 9 ? timeInMinutes : '0' + timeInMinutes;
                let timeInSeconds = Math.floor(videoElement.currentTime % 60);
                let modTimeInSeconds = timeInSeconds > 9 ? timeInSeconds : '0' + timeInSeconds;
                let timeElapsed = modTimeInMinutes + ":" + modTimeInSeconds;

                timeBar.innerHTML = timeElapsed + "/" + totalDuration;

            }
            else {
                let totalTimeInSeconds = Math.floor(videoElement.duration % 60);
                let totalModTimeInSeconds = totalTimeInSeconds > 9 ? totalTimeInSeconds : '0' + totalTimeInSeconds;
                let totalDuration = "00" + ":" + totalModTimeInSeconds;

                let timeInSeconds = Math.floor(videoElement.currentTime % 60);
                let modTimeInSeconds = timeInSeconds > 9 ? timeInSeconds : '0' + timeInSeconds;
                let timeElapsed = "00" + ":" + modTimeInSeconds;

                timeBar.innerHTML = timeElapsed + "/" + totalDuration;
            }
        }
    }

    function seek(e) {
        var percent = e.offsetX / defaultBar.offsetWidth;
        e.target.value = Math.floor(percent / default_bar_width);
        let currentWidth = (100 / videoElement.duration) * percent * videoElement.duration;
        progressBarFill.style.width = currentWidth + "%";
        videoElement.currentTime = percent * videoElement.duration;
    }

    function changeHeight() {
        progressBarFill.style.height = "6px";
        defaultBar.style.height = "6px";
        bufferedBar.style.height = "6px";
    }

    function defaultHeight() {
        progressBarFill.style.height = "4px";
        defaultBar.style.height = "4px";
        bufferedBar.style.height = "4px";
    }

    function pictureInPicture() {
        if (!('pictureInPictureEnabled' in document)) {
            console.log('The Picture-in-Picture Web API is not available.');
        }
        else if (!document.pictureInPictureEnabled) {
            console.log('The Picture-in-Picture Web API is disabled.');
        }
        else {
            videoElement.requestPictureInPicture();
        }
    }

    function disableControls() {
        videoControls.style.display = "block";
        clearTimeout(timeout);
        if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
            timeout = setTimeout(() => {
                videoControls.style.display = "none"
            }, 3000);
        }

    }

    function inactivityTimer() {
        if (document) {
            if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                setTimeout(() => {
                    if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                        videoControls.style.display = "none"
                    }
                }, 3000);
                videoContainer.addEventListener('mousemove', disableControls);
                videoNameContainer.style.display = "none";
            }
            else {
                videoNameContainer.style.display = "block";
                root.style.setProperty('--top-y', 22 + "%");
                root.style.setProperty('--top-x', 47 + "%");
                root.style.setProperty('--top-y-mobile', 15 + "%");
                root.style.setProperty('--top-x-mobile', 42 + "%");
                btnFullScreenIcon.classList.remove('fa-compress');
                btnFullScreenIcon.classList.add('fa-expand');
                enableControls();
            }
        }
    }

    function test() {
        if (videoElement) {
            if (document && !document.fullScreen && !document.mozFullScreen && !document.webkitIsFullScreen) {
                clearTimeout(timeout)
                videoNameContainer.style.display = "block";
                root.style.setProperty('--top-y', 22 + "%");
                root.style.setProperty('--top-x', 47 + "%");
                root.style.setProperty('--top-y-mobile', 15 + "%");
                root.style.setProperty('--top-x-mobile', 42 + "%");
                btnFullScreenIcon.classList.remove('fa-compress');
                btnFullScreenIcon.classList.add('fa-expand');
                fullScreenFlag = 0;
                enableControls();
            }
            else {
                root.style.setProperty('--top-y', 24 + "%");
                root.style.setProperty('--top-x', 48 + "%");
                root.style.setProperty('--top-y-mobile', 100 + "%");
                root.style.setProperty('--top-x-mobile', 42 + "%");
            }
        }
    }

    function enableControls() {
        videoControls.style.display = "block";
        videoContainer.removeEventListener('mousemove', disableControls)
    }

    // Event listeners
    btnBackward.addEventListener('click', moveBackward, false);
    btnExpand.addEventListener('click', expandVideo, false);
    btnMute.addEventListener('click', muteVideo, false);
    btnPlay.addEventListener('click', playPauseVideo, false);
    btnForward.addEventListener('click', moveForward, false);
    btnReset.addEventListener('click', restartVideo, false);
    btnStop.addEventListener('click', stopVideo, false);
    bufferedBar.addEventListener('click', seek);
    progressBarFill.addEventListener('click', seek);
    defaultBar.addEventListener('click', seek);
    btnPictureInPicture.addEventListener('click', pictureInPicture, false);

    progressBarFill.addEventListener('mouseover', changeHeight);
    progressBarFill.addEventListener('mouseleave', defaultHeight);

    bufferedBar.addEventListener('mouseover', changeHeight);
    bufferedBar.addEventListener('mouseleave', defaultHeight);

    defaultBar.addEventListener('mouseover', changeHeight);
    defaultBar.addEventListener('mouseleave', defaultHeight);

    document.addEventListener("fullscreenchange", inactivityTimer);

    /* Firefox */
    document.addEventListener("mozfullscreenchange", inactivityTimer);

    /* Chrome, Safari and Opera */
    document.addEventListener("webkitfullscreenchange", inactivityTimer);

    /* IE / Edge */
    document.addEventListener("msfullscreenchange", inactivityTimer);

    setInterval(test, 100);

    videoElement.addEventListener('ended', () => {
        btnPlayIcon.classList.remove('fa-pause');
        btnPlayIcon.classList.add('fa-play');
        btnReset.removeAttribute('hidden');
    }, false);

    function showLoader() {
        videoElement.classList.add('loading');
        document.getElementById('cover-spin').style.display = "block";
    }

    function hideLoader() {
        videoElement.classList.remove('loading');
        document.getElementById('cover-spin').style.display = "none";
    }

    videoElement.addEventListener('loadstart', showLoader, false);

    videoElement.addEventListener('canplay', hideLoader, false);

    videoElement.addEventListener('timeupdate', updateProgress, false);

    videoElement.addEventListener('progress', function () {
        if (videoElement) {
            var duration = videoElement.duration;
            if (duration > 0) {
                for (var i = 0; i < videoElement.buffered.length; i++) {
                    if (videoElement.buffered.start(videoElement.buffered.length - 1 - i) < videoElement.currentTime 
                        && videoElement && bufferedAmount && videoElement.buffered) {
                        document.getElementById("buffered-amount").style.width = (videoElement.buffered.end(videoElement.buffered.length - 1 - i) / duration) * default_bar_width + "%";
                        break;
                    }
                }
            }
        }
    });
}