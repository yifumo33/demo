function getMusicList(callback){

		var xhr = new XMLHttpRequest()
		xhr.open('GET','/music.json',true)
		xhr.onload = function(){
			if(xhr.status >= 200 && xhr.status <300 || xhr.status === 304){
				callback(JSON.parse(this.responseText)) //此时获得的responseText是字符串形式，要改为JSON形式
														//当数据到来时，将数据传入callback这个函数
			}else{
				console.log('获取数据失败')
			}
		}
		xhr.onerror = function(){
			console.log('网络异常')
		} 
		xhr.send()
}

function $(selector){
	return document.querySelector(selector)
}

var musicList = []
var currentIndex = 0
var audio = new Audio() //一旦有音乐的数据代入，则会自动播放
audio.autoplay = true

getMusicList(function(list){
	musicList = list
	loadMusic(list[currentIndex]) //通过list[0]获取JSON对象中的数据
	//var audioObject = new Audio(song.src) 获取对象中的属性
	
}) //这里的function对应的是上面的callback函数。
	//list对应的是JSON.parse(this.responseText)

	function loadMusic(musicObj){
		audio.src = musicObj.src //当有src传入时，音乐开始自动播放
        $('.music .title').innerText = musicObj.title
        $('.music .author').innerText = musicObj.author
  }

  audio.ontimeupdate = function(){
  	$('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%' //注意，设置CSS时，只能采用字符串的形式，所以要加%。
  	var min = Math.floor(this.currentTime/60)
  	var sec = Math.floor(this.currentTime)%60 + ''
  	sec = sec.length === 2?sec:'0' + sec
  	$('.musicbox .time').innerText = min + ':' + sec
  }//因为这个onetimeupdata触发的频率不确定，可以用setInterval

  audio.onplay = function(){
	  	clock = setInterval(function(){
	  	$('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%' //注意，设置CSS时，只能采用字符串的形式，所以要加%。
	  	var min = Math.floor(this.currentTime/60)
	  	var sec = Math.floor(this.currentTime)%60 + ''
	  	sec = sec.length === 2?sec:'0' + sec
	  	$('.musicbox .time').innerText = min + ':' + sec	
	  },1000)
  }

  audio.onpause = function(){
  	clearInterval(clock)
  }

	  $('.musicbox .paly').onclick = function(){
	  	if(audio.pasued){
	  		audio.play()
	  		this.querySelector('.fa').classList.remove('fa-play')
	  		this.querySelector('.fa').classList.add('.fa-pause')
	  	}else{
		  	audio.pause()
		  	this.querySelector('.fa').classList.remove('fa-pause')
		  	this.querySelector('.fa').classList.add('.fa-play')
	    }
	}
	    $('.musicbox .forward').onclick = function(){
		  currentIndex = (++currentIndex)%musicList.length
		  console.log(currentIndex)
		  loadMusic(musicList[currentIndex])
		}
		$('.musicbox .back').onclick = function(){
		  currentIndex = (musicList.length + (--currentIndex)) % musicList.length
		  console.log(currentIndex)
		  loadMusic(musicList[currentIndex])
		}
     //拖动进度条//
       $('.music .bar').onclick = function(e){
       	var percent = e.offsetX / parseInt(getComputedStyle(this).width)
       	audio.currentTime = audio.duration * percent
       }
       audio.ended=function(){
       	
       } 







