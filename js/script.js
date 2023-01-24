// JavaScript Document
$(document).ready(function() {
	document.addEventListener('click',function(e){
		// Hamburger menu
		if(e.target.classList.contains('hamburger-toggle')){
		  e.target.children[0].classList.toggle('active');
		}
	});

// video player




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

  /* picture-gallery-carousel */
  $(".picture-gallery-carousel").slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.picture-gallery-thumbnail-carousel',
  });
  /* picture-gallery-carousel */

  /* picture-gallery-thumbnail-carousel */
  $(".picture-gallery-thumbnail-carousel").slick({
    dots: false,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    // fade: true,
    focusOnSelect: true,
    vertical: true,
    // verticalSwiping: true,
    asNavFor: '.picture-gallery-carousel',
    prevArrow: '<div class="slick-prev slick-arrow"><svg preserveAspectRatio="none" width="44" height="20" viewBox="0 0 44 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.977388 4.45085C-0.898554 3.01725 0.106506 0 2.45999 0H41.54C43.8843 0 44.8951 2.9979 43.037 4.43979L23.6461 19.4864C22.7689 20.1671 21.5487 20.1716 20.6666 19.4975L0.977388 4.45085Z" fill="#D9D9D9"/></svg></div>',
    nextArrow: '<div class="slick-next slick-arrow"><svg preserveAspectRatio="none" width="44" height="20" viewBox="0 0 44 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.977388 4.45085C-0.898554 3.01725 0.106506 0 2.45999 0H41.54C43.8843 0 44.8951 2.9979 43.037 4.43979L23.6461 19.4864C22.7689 20.1671 21.5487 20.1716 20.6666 19.4975L0.977388 4.45085Z" fill="#D9D9D9"/></svg></div>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          vertical: false,
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  /* picture-gallery-thumbnail-carousel */

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
      "DJ Snake",
      "Astrid",
      "Lemay",
      "Rick Ross",
      "DJ Snake",
      "DJ Snake",
	    // "Me & You",
      // "Electro Boy",
      // "Home",
      // "Proxy (Original Mix)"
    ],
    trackNames = [
      "Run It",
      "The Encounter",
      "Lemay",
      "Get Low",
      "Purple Lamborghini",
      "Let Me Love You",
      "Run It",
	    // "Alex Skrindo - Me & You",
      // "Kaaze - Electro Boy",
      // "Jordan Schor - Home",
      // "Martin Garrix - Proxy"
    ],
    albumArtworks = ["_1", "_2", "_3", "_4", "_5", "_6"],
    trackUrl = [
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
      // "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3"
      "audio/DJ-Snake-Run-It.mp3",
      "audio/The Encounter.mp3",
      "audio/Lemay - Digital Disaster.mp3",
      "audio/DJ-Snake-Get-Low.mp3",
      "audio/Rick-Ross-Purple-Lamborghini.mp3",
      "audio/RickRoss-Money-In-The-Grave.mp3",
      "audio/DJ-Snake-Run-It.mp3",
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

  var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');


		var stgw = 1280;
		var stgh = 720;


		var loffset = 0;
		var toffset = 0;

		function _pexresize() {
			var cw = window.innerWidth;
			var ch = window.innerHeight;
			if (cw<=ch*stgw/stgh) {
				loffset = 0;
				toffset = Math.floor(ch-(cw*stgh/stgw))/2;
				canvas.style.width = cw + "px";
				canvas.style.height = Math.floor(cw*stgh/stgw) + "px";
			} else {
				loffset = Math.floor(cw-(ch*stgw/stgh))/2;
				toffset = 0;
				canvas.style.height = ch + "px";
				canvas.style.width = Math.floor(ch*stgw/stgh) + "px";
			}
			canvas.style.marginLeft = loffset +"px";
			canvas.style.marginTop = toffset +"px";
		}
		_pexresize();

		var count = 100;
		var lcount = 6;

		var layer = [];
		var layery = [];

		ctx.fillStyle = "rgba(255,255,255,0.5)";
		for (var l=0;l<lcount;l++) {
			ctx.clearRect(0,0,stgw,stgh);
			for (var i=0;i<count*(lcount-l)/1.5;i++) {
				var myx = Math.floor(Math.random()*stgw);
				var myy = Math.floor(Math.random()*stgh);
				var myh = l*6+8;
				var myw = myh/10;
				ctx.beginPath();
				ctx.moveTo(myx,myy);
				ctx.lineTo(myx+myw,myy+myh);
				ctx.arc(myx, myy+myh, myw, 0, 1 * Math.PI);
				ctx.lineTo(myx-myw,myy+myh);
				ctx.closePath();
				ctx.fill();
			}
			layer[l] = new Image();
			layer[l].src = canvas.toDataURL("image/png");
			layery[l] = 0;
		}



		var stt = 0;
		var str = Date.now()+Math.random()*4000;
		var stact = false;

		function animate() {
			ctx.clearRect(0,0,stgw,stgh);

			for (var l=0;l<lcount;l++) {
				layery[l] += (l+1.5)*5;
				if (layery[l]>stgh) {

					layery[l] =layery[l]-stgh;
				}
				ctx.drawImage(layer[l],0,layery[l]);
				ctx.drawImage(layer[l],0,layery[l]-stgh);
			}
			if (Date.now()>str) {
				stact = true;
			}
			if (stact) {
				stt++;
				if (stt<5+Math.random()*10) {
					var ex = stt/30;
				} else {
					var ex = (stt-10)/30;
				}
				if (stt>20) {
					stt = 0;
					stact = false;
					str = Date.now()+Math.random()*8000+2000;
				}

				ctx.fillStyle = "rgba(255,255,255,"+ex+")";
				ctx.fillRect(0,0,stgw,stgh);
			}
			window.requestAnimationFrame(animate);
		}


		animate();

  /* fancybox */
  Fancybox.bind("[data-fancybox]", {
    Thumbs: {
      autoStart: false,
    },
		Toolbar: {
		  display: [
			"close",
		  ],
		},
	});
  /* fancybox */

	// OFI Browser
	objectFitImages();
});
// VIDEO PLAYER CONTROL
var video = document.getElementsByClassName("video-fluid")[0];
video.controls = false;

var video = document.getElementById("video");
var videoContainer = document.getElementById("video-container");

videoContainer.addEventListener("click", function(){
  video.play();
});
