var class_Fri = 0;
var class_Sat = "A1";
var classes_txt = "";
var class_demo = ["语", "数", "英", "物", "历", "化", "政", "生", "地", "体", "测", "试", "测试", "语自", "数自", "英自", "物自", "历自", "化自",
	"政自", "生自", "地自", "班会"
];

function change_one_class(span_this) {
	var text = span_this.innerText;
	if (class_demo.indexOf(text) == class_demo.length - 1) {
		span_this.innerHTML = class_demo[0]
	} else {
		span_this.innerHTML = class_demo[class_demo.indexOf(text) + 1]
	}
}

window.onload = function() {
	function formaData(timer) {
		const year = timer.getFullYear()
		const month = timer.getMonth() + 1
		const day = timer.getDate()
		const hour = timer.getHours()
		const minute = timer.getMinutes()
		const second = timer.getSeconds()
		return `${pad(year, 4)}年${pad(month)}月${pad(day)}日  ${pad(hour)}:${pad(minute)}:${pad(second)}`
	}

	function pad(timeEl, total = 2, str = '0') {
		return timeEl.toString().padStart(total, str)
	}

	var HttpClient = function() {
		this.get = function(aUrl, aCallback) {
			var anHttpRequest = new XMLHttpRequest();
			anHttpRequest.onreadystatechange = function() {
				if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
					aCallback(anHttpRequest.responseText);
			}

			anHttpRequest.open("GET", aUrl, true);
			anHttpRequest.send(null);
		}
	}


	//userDefinded
	
	//TODO
	function get_tasks() {
		var client = new HttpClient();
		client.get("./music/logs_tasks.txt", function(response) {
			var tasks_txt = response.split("\n");
			var task_number_in_html = 1;
			var Timer_html = '';
			var oTime_container = document.createElement("div")
			
			for (task_number in tasks_txt) {
				
				if (task_number_in_html > 2) {
					break;
				}
				
				var task = tasks_txt[task_number].split(" ");
				var task_date = Math.floor((new Date(task[1]) - new Date()) / 1000 / 60 / 60 / 24) + 1;
				if (task_date >= 0) {

					oTime_container.className = "tasks";

					if (task_number_in_html = 1) {
						Timer_html += '距离<span style="color:#ed5b5b;text-align:center" id="project1">' +
							task[0] +
							'</span>还有<span id="time1" style="color:#ed5b5b; text-align: right;">' +
							task_date + '</span>天';
					} else {
						Timer_html += '距离<span style="color: deepskyblue;text-align:center" id="project1">' +
							task[0] +
							'</span>还有<span id="time1" style="color: deepskyblue; text-align: right;">' +
							task_date + '</span>天';
					}

				} else {
					continue
				}
			}
			document.getElementById("Countdown").appendChild(oTime_container);
			console.log(Timer_html)

			// var NowDate = new Date();
			// if (NowDate.getMonth() >= 5 && NowDate.getDate() >= 7) {
			// 	var EndDate = new Date((NowDate.getFullYear() + 1), 7, 6, 0, 0, 0, 0);
			// } else {
			// 	var EndDate = new Date(NowDate.getFullYear(), 5, 7, 0, 0, 0, 0);
			// }
			// var tDate = EndDate.getTime() - NowDate.getTime();
			// var HowDate = Math.floor(tDate / 1000 / 60 / 60 / 24) + 1;
			// document.getElementById("time_NCEE").innerHTML = HowDate.toString();

		});
	}

	function get_weather(city = null, longitude = null, Latitude = null, key = null) {
		var client = new HttpClient();
		client.get(
			"https://devapi.qweather.com/v7/weather/now?location=" + city + "&key=" + key,
			function(response) {
				var weather_info = JSON.parse(response);
				if (weather_info.code == "200") {
					document.getElementById("weather").innerHTML = "实时天气：" + weather_info.now.text + "，温度" +
						weather_info.now.temp + "℃，湿度：" + weather_info.now.humidity + "°";
				}
			});

		var client = new HttpClient();
		client.get(
			"https://devapi.qweather.com/v7/minutely/5m?location=" + "113.41" + "," + "22.92" + "&key=" + key,
			function(response) {
				var weather_info = JSON.parse(response);
				if (weather_info.code == "200") {
					document.getElementById("weather_rain").innerHTML = weather_info.summary;
				}
			});
	}

	function get_class() {
		var client = new HttpClient();
		client.get("./music/logs_class.txt", function(response) {
			window['classes_txt'] = response.split("\n");
			var classes = window['classes_txt'][new Date().getDay()].split(" ");
			for (class_number in classes) {
				document.getElementById("class_" + class_number.toString()).innerHTML = classes[
					class_number];
			}
		});
	}

	// function get_hitoko() {
	// 	var client = new HttpClient();
	// 	client.get("https://v1.hitokoto.cn/?c=f&encode=text", function(response) {
	// 		document.getElementById("hitoko").innerHTML = response;
	// 	});
	// }

	function change_cls_color() {
		var time = new Date().getHours() * 100 + new Date().getMinutes();

		if (time >= 745) { //1
			document.getElementById("class_2").style.color = "green";
		}
		if (time >= 835) { //2
			document.getElementById("class_3").style.color = "green";
		}
		if (time >= 945) { //3
			document.getElementById("class_4").style.color = "green";
		}
		if (time >= 1035) { //4
			document.getElementById("class_5").style.color = "green";
		}
		if (time >= 1125) { //5
			document.getElementById("class_6").style.color = "green";
		}
		if (time >= 1420) { //6
			document.getElementById("class_7").style.color = "green";
		}
		if (time >= 1510) { //7
			document.getElementById("class_8").style.color = "green";
		}
		if (time >= 1605) { //8
			document.getElementById("class_9").style.color = "green";
		}
		if (time >= 1655) { //9
			document.getElementById("class_10").style.color = "green";
		}
	}

	function clear_class() {
		for (i = 1; i <= 10; i++) {
			document.getElementById("class_" + i).innerHTML = "";
		}
	}

	function change_fucking_class(day, class_num) {
		class_Fri = day;
		class_Sat = day;
		clear_class();
		var classes = (window['classes_txt'][class_num]).split(" ");
		for (class_number in classes) {
			document.getElementById("class_" + class_number.toString()).innerHTML = classes[class_number];
		}
	}

	function crazy_Friday_class() {
		if (new Date().getDay() == 5 && class_Fri == 0) {
			change_fucking_class(1, 7)
		} else if (new Date().getDay() == 5 && class_Fri == 1) {
			change_fucking_class(0, 4)
		} else if (new Date().getDay() == 6 && class_Sat == "A1") { //6 A2
			change_fucking_class("A2", 8)
		} else if (new Date().getDay() == 6 && class_Sat == "A2") {
			change_fucking_class("B1", 9)
		} else if (new Date().getDay() == 6 && class_Sat == "B1") {
			change_fucking_class("B2", 10)
		} else if (new Date().getDay() == 6 && class_Sat == "B2") {
			change_fucking_class("C1", 11)
		} else if (new Date().getDay() == 6 && class_Sat == "C1") {
			change_fucking_class("C2", 12)
		} else if (new Date().getDay() == 6 && class_Sat == "C2") {
			change_fucking_class("A1", 5)
		}
	}

	get_tasks();
	get_class()
	change_cls_color()
	// get_hitoko()
	get_weather()

	document.getElementById("class_0").onclick = function() {
		crazy_Friday_class()
	};

	// document.getElementById("hitoko").onclick = function() {
	// 	get_hitoko()
	// }

	let timer = setInterval(function() {
		document.getElementById("time_now").innerHTML = formaData(new Date());
	}, 1000)

	let timer_cls_col = setInterval(function() {
		change_cls_color()
	}, 30000);

	let timer_hitoko = setInterval(function() {
		// get_hitoko()
		get_weather()
	}, 900000);

}