// JavaScript Document
$(document).ready(function() {
	document.addEventListener('click',function(e){
		// Hamburger menu
		if(e.target.classList.contains('hamburger-toggle')){
		  e.target.children[0].classList.toggle('active');
		}
	});

	/* navigation */
	$(".navbar-toggler").click(function(){
		$("html").toggleClass("overflow-hidden nav-menu-open");
	});
	$(".navbar-nav .nav-item .nav-link, .navbar .common-social-icons ul li a").click(function(){
		$("html").toggleClass("overflow-hidden nav-menu-open");
		$(".navbar-toggler").addClass("collapsed");
		$(".navbar .navbar-collapse").removeClass("show");
	});
	/* navigation */

  /* audio-player-expand */
  $(".common-audion-player .common-audion-player-detail .audio-icon").click(function(){
    $(".common-audion-player .common-audion-player-detail").toggleClass("active");
  });
  /* audio-player-expand */

	/* audio-player */
	var playerTrack = $("#player-track"),
    bgArtwork = $("#bg-artwork"),
    bgArtworkUrl,
    albumName = $("#album-name"),
    trackName = $("#track-name"),
    albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    playIcon = $("#play-pause-button .fa-play"),
    pauseIcon = $("#play-pause-button .fa-pause"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    albums = [
      "paint",
      "paint",
      "paint",
      "paint",
      "paint",
	    // "Me & You",
      // "Electro Boy",
      // "Home",
      // "Proxy (Original Mix)"
    ],
    trackNames = [
      "i dont like MONDAYS",
      "i dont like MONDAYS",
      "i dont like MONDAYS",
      "i dont like MONDAYS",
      "i dont like MONDAYS",
	    // "Alex Skrindo - Me & You",
      // "Kaaze - Electro Boy",
      // "Jordan Schor - Home",
      // "Martin Garrix - Proxy"
    ],
    albumArtworks = ["_1", "_2", "_3", "_4", "_5"],
    trackUrl = [
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3"
      "audio/audio-1.mp3",
      "audio/audio-2.mp3",
      "audio/audio-3.mp3",
      "audio/audio-4.mp3",
      "audio/audio-5.mp3"
    ],
    playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = -1;

    // playPauseButton.on("click",function(){
    //   if(albumArt.hasClass("active")) {
    //     playIcon.removeClass("d-none");
    //     pauseIcon.addClass("d-none");
    //     alert("video play");
    //   } else {
    //     playIcon.addClass("d-none");
    //     pauseIcon.removeClass("d-none");
    //     alert("video pause");
    //   }
    // });

function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        // playIcon.addClass("d-none");
        // pauseIcon.removeClass("d-none");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        // playIcon.removeClass("d-none");
        // pauseIcon.addClass("d-none");
        audio.pause();
      }
    }, 300);
    $("#play-pause-button .fa-play").toggleClass("d-none");
    $("#play-pause-button .fa-pause").toggleClass("d-none");
}

function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
    else insTime.text(ctMinutes + ":" + ctSeconds);

    insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
}

function hideHover() {
    sHover.width(0);
    insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
}

function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
}

function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
}

function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
}

function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < albumArtworks.length) {
      if (flag == 0) {
        i.attr("class", "fa fa-play");
      }
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = albums[currIndex];
      currTrackName = trackNames[currIndex];
      currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);
      // albumArt.find("img.active").removeClass("active");
      albumArt.find(".image.active").removeClass("active");
      $("#" + currArtwork).addClass("active");

      bgArtworkUrl = $("#" + currArtwork).attr("src");

      bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
}

function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
      $("#play-pause-button .fa-play").addClass("d-none");
      $("#play-pause-button .fa-pause").removeClass("d-none");
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
      $("#play-pause-button .fa-play").addClass("d-none");
      $("#play-pause-button .fa-pause").removeClass("d-none");
    });
}

initPlayer();
	/* audio-player */

	// OFI Browser
	objectFitImages();
});
