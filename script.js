
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let masterPlay = document.getElementById("masterplay");
let progressBar = document.getElementById("myprogresssbar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songitem"));
let masterSongName = document.getElementById("mastersongname");

let songs = [
    {songName:"Pink VenomBLACKPINK.", filePath:"songs/1.mp3", coverPath:"covers/1.jpg",duration:"4:39"},
    {songName:"I Like You (A Happier Song)", filePath:"songs/2.mp3", coverPath:"covers/2.jpg",duration:"4:17"},
    {songName:"As It WasHarry Styles.", filePath:"songs/3.mp3", coverPath:"covers/3.jpg",duration:"3:26"},
    {songName:"I Ain't WorriedOneRepublic.", filePath:"songs/4.mp3", coverPath:"covers/4.jpg",duration:"3:56"},
    {songName:"About Damn TimeLizzo.", filePath:"songs/5.mp3", coverPath:"covers/5.jpg",duration:"2:51"},
    {songName:"Running Up That Hill", filePath:"songs/6.mp3", coverPath:"covers/6.jpg",duration:"3:36"},
]

songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerHTML=songs[i].duration;
});

var playicon = document.querySelector("fa-circle-play");

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterSongName.innerHTML=songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }else{
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }
});
audioElement.addEventListener("timeupdate",()=> {
    progress = parseInt ((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
});

progressBar.addEventListener("change",()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
        gif.style.opacity=1;
    })
}
Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        audioElement.src = "songs/"+(songIndex+1)+".mp3";
        masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
    })
})


nextButton.addEventListener("click",()=>{
    if(songIndex>=5){
      songIndex=0;
      console.log(songIndex);
    }else{
        songIndex +=1;
        console.log(songIndex);
    }
    audioElement.src = "songs/"+(songIndex+1)+".mp3";
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

});


prevButton.addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex -=1;
    }
    audioElement.src = "songs/"+(songIndex+1)+".mp3";
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

});
