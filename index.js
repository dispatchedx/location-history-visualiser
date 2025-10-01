( function ( $, L, prettySize ) {

	function status(message) {
		$('#currentStatus').text(message);
	}

	// Start at the beginning
	$('#apply').click(function () {
		//alert("click");
		let month = $('#month').children("option:selected").val();
		let toMonth = $('#to-month').children("option:selected").val();
		let year = $('#year').children("option:selected").val();
		let toYear = $('#to-year').children("option:selected").val();
		let day = $('#day').children("option:selected").val();
		let toDay = $('#to-day').children("option:selected").val();
		let hour = $('#hour').children("option:selected").val();
		let toHour = $('#to-hour').children("option:selected").val();

		let walking =  $('#walking:checked').val() ? 1:'';
		let running =  $('#running:checked').val() ?1:'';
		let in_vehicle =  $('#in-vehicle:checked').val() ? 1:'';
		let on_bicycle =  $('#on-bicycle:checked').val() ? 1:'';
		let still = $('#still:checked').val() ? 1:'';
		console.log(year, toYear);
		console.log(month, toMonth);
		//arr=[latitude,longitude,activity.type,activity.timestamp];
		$.ajax({
			url: "user/user_option_request_data.php",
			type: "post",
			dataType: 'json',
			data: {
				"month": month,
				"toMonth": toMonth,
				"year": year,
				"toYear": toYear,
				"day":day,
				"toDay":toDay,
				"hour":hour,
				"toHour":toHour,
				"running":running,
				"walking":walking,
				"on_bicycle":on_bicycle,
				"in_vehicle":in_vehicle,
				"still":still,
			},
			success: function (response) {
				var result = (response);
				console.log(response)
				//remove last table
				$('#dh-table').remove();
				let all_activities = Object.keys(result).length;
				let vehicle_activities = 0;
				let walking_activites = 0;
				let running_activites = 0;
				let bicycle_activites = 0;
				let still_activities = 0;
				let latlngs = [];

				let activityCounter = {
					WALKING: {},
					RUNNING: {},
					ON_BICYCLE: {},
					IN_VEHICLE: {},
					STILL:{}
				};
				for (i = 0; i < all_activities; i++) {
					let latitude = parseFloat(response[i][8]);
					let longitude = parseFloat(response[i][7]);
					let timestamp = response[i][3] * 1000;
					let type = response[i][1];
					latlngs.push([latitude, longitude])
					let date = new Date(timestamp);
					let day = date.toLocaleString("en-US", {weekday: "long"});

					if ((activityCounter[type]) === undefined) activityCounter[type] = day;
					if (isNaN(activityCounter[type][day])) activityCounter[type][day] = 0;
					activityCounter[type][day]++;


					let hour = date.toLocaleString("en-US", {hour: "numeric"})
					if ((activityCounter[type]) === undefined) activityCounter[type] = hour;
					if (isNaN(activityCounter[type][hour])) activityCounter[type][hour] = 0;
					activityCounter[type][hour]++;


					if (type === 'IN_VEHICLE') { //already done it this way so whatever
						vehicle_activities++;
					} else if (type === 'WALKING') {
						walking_activites++;
					} else if (type === 'RUNNING') {
						running_activites++;
					} else if (type === 'ON_BICYCLE') {
						bicycle_activites++;
					} else if (type==='STILL'){
						still_activities++;
					}
				}

				//console.log(activityCounter);

				days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
				let max_in_vehicle = ['In Vehicle', '', 0];
				let max_running = ['Running', '', 0];
				let max_walking = ['Walking', '', 0];
				let max_on_bicycle = ['Cycling', '', 0];
				let max_still= ['Still', '',0];
				let vars = [max_walking, max_running, max_on_bicycle, max_in_vehicle, max_still];
				for (i = 0; i < days.length; i++) {
					if (activityCounter['IN_VEHICLE'][days[i]] > max_in_vehicle[2]) {
						max_in_vehicle[2] = activityCounter['IN_VEHICLE'][days[i]];
						max_in_vehicle[1] = days[i];
					}
					if (activityCounter['WALKING'][days[i]] > max_walking[2]) {
						max_walking[2] = activityCounter['WALKING'][days[i]];
						max_walking[1] = days[i];
					}
					if (activityCounter['RUNNING'][days[i]] > max_running[2]) {
						max_running[2] = activityCounter['RUNNING'][days[i]];
						max_running[1] = days[i];
					}
					if (activityCounter['ON_BICYCLE'][days[i]] > max_on_bicycle[2]) {
						max_on_bicycle[2] = activityCounter['ON_BICYCLE'][days[i]];
						max_on_bicycle[1] = days[i];
					}
					if(activityCounter['STILL'][days[i]]> max_still[2]){
						max_still[2]=activityCounter['STILL'][days[i]];
						max_still[1]=days[i];
					}
				}

				hours = ["1 PM",
					"1 AM",
					"2 PM",
					"2 AM",
					"3 PM",
					"3 AM",
					"4 PM",
					"4 AM",
					"5 AM",
					"6 AM",
					"6 PM",
					"7 AM",
					"7 PM",
					"8 PM",
					"8 AM",
					"9 PM",
					"9 AM",
					"0 PM",
					"0 AM",
					"1 AM",
					"1 PM",
					"2 PM",
					"2 AM",]

				//makeTable($('#content-div'), vars, ['Activity', 'Most frequent day', 'Count'], "days-table")

				 hour_max_in_vehicle = ['', 0];
				 hour_max_running = ['', 0];
				 hour_max_walking = ['',0];
				 hour_max_on_bicycle = ['',0];
				 hour_max_still=['',0]
				 vars2 = [hour_max_walking, hour_max_running, max_on_bicycle, hour_max_in_vehicle,hour_max_still];

				for (i = 0; i < hours.length; i++) {
					if (activityCounter['IN_VEHICLE'][hours[i]] > hour_max_in_vehicle[1]) {
						hour_max_in_vehicle[1] = activityCounter['IN_VEHICLE'][hours[i]];
						hour_max_in_vehicle[0] = hours[i];
					}
					if (activityCounter['WALKING'][hours[i]] > hour_max_walking[1]) {
						hour_max_walking[1] = activityCounter['WALKING'][hours[i]];
						hour_max_walking[0] = hours[i];
					}
					if (activityCounter['RUNNING'][hours[i]] > hour_max_running[1]) {
						hour_max_running[1] = activityCounter['RUNNING'][hours[i]];
						hour_max_running[0] = hours[i];
					}
					if (activityCounter['ON_BICYCLE'][hours[i]] > hour_max_on_bicycle[1]) {
						hour_max_on_bicycle[1] = activityCounter['ON_BICYCLE'][hours[i]];
						hour_max_on_bicycle[0] = hours[i];
					}
					if (activityCounter['STILL'][hours[i]] > hour_max_still[1]) {
						hour_max_still[1] = activityCounter['STILL'][hours[i]];
						hour_max_still[0] = hours[i];
					}
				}
				Array.prototype.push.apply(max_in_vehicle,hour_max_in_vehicle);
				Array.prototype.push.apply(max_running,hour_max_running);
				Array.prototype.push.apply(max_walking,hour_max_walking);
				Array.prototype.push.apply(max_on_bicycle,hour_max_on_bicycle);
				Array.prototype.push.apply(max_still,hour_max_still);
				makeTable($('#flex1'), vars, ['Activity', 'Most frequent day', 'Count', 'Most frequent hour', 'Count'], "dh-table")
				//console.log(vars);
				vehicle_activities=(vehicle_activities/all_activities*100).toFixed(2);
				walking_activites=(walking_activites/all_activities*100).toFixed(2);
				running_activites=(running_activites/all_activities*100).toFixed(2);
				bicycle_activites=(bicycle_activites/all_activities*100).toFixed(2);
				still_activities=(still_activities/all_activities*100).toFixed(2);

				if (!(all_activities === 'undefined')) {

					//delete last chart
					$('#pie-container').remove();

					$('#graphs').append("<div id='pie-container' class=\"chart-container\">\n" +
						"<canvas id=\"pie-chart\" style=\"display: block; width: 733px; height: 321px;\" width=\"733\" height=\"321\"></canvas>\n" +
						"</div>");
					// make a new one
					var ctx = document.getElementById('pie-chart').getContext('2d');
					var myPieChart = new Chart(ctx, { //TODO leaderboard
						type: 'pie',
						data: {
							labels: [
								'In Vehicle',
								'Walking',
								'Running',
								'Cycling',
								'Still'
							],
							datasets: [{
								data: [vehicle_activities, walking_activites, running_activites, bicycle_activites,still_activities],
								backgroundColor: [
									'rgb(121, 130, 185)',
									'rgb(165, 193, 220)',
									'rgb(233, 246, 250)',
									'rgb(95, 158, 160)'
								],
							}],
						},
					});
					createMap();
					console.log(latlngs)
					// initialize heat layer and add it to map
					heat = L.heatLayer([]).addTo(map);
					heat._latlngs = latlngs;

					heat.redraw();
					// Give map rounded edges :)
					$('#map').css('border-radius', '8px');

				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});


	});
	stageOne();


	function stageOne() {

		$.ajax({
			url: "user/user_data_basic.php",
			type: "get",
			dataType: 'json',
			success: function (response) {
				var result = (response);
				$('#current-score').html(function () {
						return $(this).text() + "<strong> <span style=\"color: #7982B9; \">" + result[0] + "</span> </strong>";
					}
				);
				$('#yearly-score').html(function () {
						return $(this).text() + "<strong> <span style=\"color: #7982B9; \">" + result[1] + "</span> </strong>";
					}
				);
				//alert(result[1]);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
		let min_timestamp, max_timestamp;
		$.ajax({
			url: "user/user_year_score.php",
			type: "get",
			dataType: 'json',
			success: function (response) {
				//var result = (response);

				let months=[];
				let scores=[];
				for(i=0;i<Object.keys(response).length;i++) {
					scores.push(response[i][1]*100)
					months.push(response[i][0])
				}
				months = months.reverse();
				scores = scores.reverse();

				/*

				/*months = {
					"Jan": [["stuff", "morestuff"]],
					"Feb": [],
					"Mar": [],
					"Apr": [],
					"May": [],
					"Jun": [],
					"Jul": [],
					"Aug": [],
					"Sep": [],
					"Oct": [],
					"Nov": [],
					"Dec": []
				}
				var current_date = new Date();
				var current_month = current_date.getMonth();
				var last_year = new Date();
				last_year.setFullYear(current_date.getFullYear() - 1);
				monthsConvert = {
					0: "Jan",
					1: "Feb",
					2: "Mar",
					3: "Apr",
					4: "May",
					5: "Jun",
					6: "Jul",
					7: "Aug",
					8: "Sep",
					9: "Oct",
					10: "Nov",
					11: "Dec"
				}
				var months = { //TODO this could may be a simple array with strings?
					0: [],
					1: [],
					2: [],
					3: [],
					4: [],
					5: [],
					6: [],
					7: [],
					8: [],
					9: [],
					10: [],
					11: [],

				}
				let months_arr = [];
				let num = 0;
				for (i = 0; i < 12; i++) {
					if (current_month + num > 11) {
						current_month = 0;
						num = 0;
					}
					let month = monthsConvert[current_month + num];
					//console.log(current_month, num, month)
					months_arr.push(month);
					num++;
				}
				//console.log(months_arr)
				lol = [];
				for (i = 0; i < 12; i++) {
					//get last years timestamp, save each incrementing month timestamp to monthsTime
					timestamp = last_year.getTime();
					last_year.setMonth(last_year.getMonth() + 1)
					lol.push(timestamp)

				}
				//
				//alert(monthsTime["Sep"])
				let month0Foot = 0;
				let month0All = 0;

				let month1Foot = 0;
				let month1All = 0;

				let month2Foot = 0;
				let month2All = 0;

				let month3Foot = 0;
				let month3All = 0;

				let month4Foot = 0;
				let month4All = 0;

				let month5Foot = 0;
				let month5All = 0;

				let month6Foot = 0;
				let month6All = 0;

				let month7Foot = 0;
				let month7All = 0;

				let month8Foot = 0;
				let month8All = 0;

				let month9Foot = 0;
				let month9All = 0;

				let month10Foot = 0;
				let month10All = 0;

				let month11Foot = 0;
				let month11All = 0;
				max_timestamp = min_timestamp = result[i][1];
				for (i = 0; i < result.length; i++) {
					timestamp = result[i][1];
					if (timestamp > max_timestamp)
						max_timestamp = timestamp;
					if (timestamp < min_timestamp)
						min_timestamp = timestamp;
					if (timestamp > lol[0] && timestamp < lol[1]) {
						months["0"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month0Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month0All++;
					} else if (timestamp > lol[1] && timestamp < lol[2]) {
						months["1"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month1Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month1All++;
					} else if (timestamp > lol[2] && timestamp < lol[3]) {
						months["2"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month2Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month2All++;
					} else if (timestamp > lol[3] && timestamp < lol[4]) {
						months["3"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month3Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month3All++;
					} else if (timestamp > lol[4] && timestamp < lol[5]) {
						months["4"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month4Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month4All++;
					} else if (timestamp > lol[5] && timestamp < lol[6]) {
						months["5"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month5Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month5All++;
					} else if (timestamp > lol[6] && timestamp < lol[7]) {
						months["6"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month6Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month6All++;
					} else if (timestamp > lol[7] && timestamp < lol[8]) {
						months["7"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month7Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month7All++;
					} else if (timestamp > lol[8] && timestamp < lol[9]) {
						months["8"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month8Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month8All++;
					} else if (timestamp > lol[9] && timestamp < lol[10]) {
						months["9"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month9Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month9All++;
					} else if (timestamp > lol[10] && timestamp < lol[11]) {
						months["10"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') month10Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month10All++;
					} else if (timestamp > lol[11] && timestamp < lol[12]) {
						months["11"].push(result[i][0]);
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE') onth11Foot++;
						if (result[i][0] === 'RUNNING' || result[i][0] === 'WALKING' || result[i][0] === 'ON_BICYCLE' || result[i][0] === 'IN_VEHICLE') month11All++;
					}
				}
				month0score = Math.round(month0Foot / month0All * 100);
				month1score = Math.round(month1Foot / month1All * 100);
				month2score = Math.round(month2Foot / month2All * 100);
				month3score = Math.round(month3Foot / month3All * 100);
				month4score = Math.round(month4Foot / month4All * 100);
				month5score = Math.round(month5Foot / month5All * 100);
				month6score = Math.round(month6Foot / month6All * 100);
				month7score = Math.round(month7Foot / month7All * 100);
				month8score = Math.round(month8Foot / month8All * 100);
				month9score = Math.round(month9Foot / month9All * 100);
				month10score = Math.round(month10Foot / month10All * 100);
				month11score = Math.round(month11Foot / month11All * 100);
*/
				var ctx = document.getElementById('chart').getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: months,
						datasets: [{
							label: '% Score <--past - present-->',
							data: scores,
							backgroundColor: 'rgb(233, 246, 250)',
								//'rgba(255, 99, 132, 0.2)',

							borderColor: 'rgb(165, 193, 220)',
								//'rgba(255, 99, 132, 1)',

							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									reverse:false,
									beginAtZero: true
								}
							}]
						}
					}
				});
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
		$.ajax({
			url: "user/user_period_data.php",
			type: "get",
			dataType: 'json',
			success: function (response) {
				var result = (response);


				console.log(result);
				min_timestamp = parseInt(response[0]); // 1;
				max_timestamp = parseInt(response[1]); // 1;
				min_time = new Date(min_timestamp);
				max_time = new Date(max_timestamp);
				min_time = min_time.toLocaleString()
				max_time = max_time.toLocaleString()
				$('#data-period').html("<p id=\"data-period\"> Data period ranges from <span style=\"color: #7982B9; \">" + min_time + "</span> to <span style=\"color: #7982B9; \">" + max_time + "</span>" + "</p>");
				//alert(result[1]);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
		$.ajax({
			url: "user/user_last_upload.php",
			type: "get",
			dataType: 'text',
			success: function (response) {
				var result = (response);
				$('#last-upload').html(function () {
						result = result * 1000;
						date = new Date(result)
						lastUpload = date.toLocaleString();
						return $(this).text() + "<strong> <span style=\"color: #7982B9; \">" + lastUpload + "</span> </strong>";
					}
				);
				//console.log(result);

				//alert(result[1]);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});



		$('#file').change(function () { //when file is uploaded changes 'open map'
			stageTwo(this.files[0]);
			$('#upload').removeClass('hidden');
		});
	}

	function stageTwo(file) {
		// Google Analytics event - heatmap upload file


		let map, heat,
			heatOptions = {
				tileOpacity: 1,
				heatOpacity: 1,
				radius: 25,
				blur: 25
			};
		// Initialize the map
		$("#map").html("");
		$("<div id=\"map\" \"></div>").appendTo("#content-div");

		map = createMap();

		// initialize heat layer and add it to map

		heat = L.heatLayer([], heatOptions).addTo(map);

		let editableLayers = new L.FeatureGroup();
		map.addLayer(editableLayers);

		// edit toolbar options
		let drawPluginOptions = {
			position: 'topright',
			draw: {
				polygon: false,
				// disable toolbar item by setting it to false
				polyline: false,
				circle: false,
				rectangle: {shapeOptions: {opacity: 0.8, fillOpacity: 0.4}},
				marker: false,
			},
			edit: {
				featureGroup: editableLayers,
				remove: true
			}
		};

		// add toolbar to map
		let drawControl = new L.Control.Draw(drawPluginOptions);
		map.addControl(drawControl);
		let excludedAreas = [];
		// Add created rectangle
		map.on('draw:created', function (e) {
			editableLayers.addLayer(e.layer);
			excludedAreas.push(e.layer.getLatLngs());
			//alert(excludedAreas); // wht is ther 4 objects in it
		});
		// Edit rectangle layer
		map.on("draw:edited", function (e) { // TODO fix latlngs array when edit
			let layers = e.layers;
			layers.eachLayer(function (layer) {
				excludedAreas = layer.getLatLngs();
				//excludedAreas); rectangle's 4 corners
				console.log(layer); // Need to take this and cut stuff from json
			});
		});
		map.on("draw:deleted", function (e) {
			let layers = e.layers;
			// Delete selected area from array
			layers.eachLayer(function (layer) {
				for (var i = excludedAreas.length - 1; i >= 0; i--) {
					if (excludedAreas[i] === layer.getLatLngs()) {
						excludedAreas.splice(i, 1);
					}
				}

				editableLayers.removeLayer(layer);
			})


		})

		let type;
		try {
			if (/\.kml$/i.test(file.name)) {
				type = 'kml';
			} else {
				type = 'json';
			}
		} catch (ex) {
			status( ' error: ' + ex.message );
			return;
		}


		let SCALAR_E7 = 0.0000001; // Since Google Takeout stores latlngs as integers
		let latlngs = [];

		let os = new oboe();
		let data = []

		os.node('locations.*', function (location) {
			// Convert to float
			let latitude = location.latitudeE7 * SCALAR_E7, // convert to float
				longitude = location.longitudeE7 * SCALAR_E7;
			timestampMs = location.timestampMs;
			accuracy = location.accuracy;
			velocity = location.velocity;
			heading = location.heading;
			altitude = location.altitude;
			verticalAccuracy = location.verticalAccuracy;
			test = location.activity;
			//console.log(location.activity);

			if (typeof test === 'undefined' || test[0].activity[0].type === 'UNKNOWN' || test[0].activity[0].type === 'TILTING') {
				activity_type = "";
				activity_confidence = "";
				activity_timestampMs = "";
			} else {
				if (test[0].activity[0].type === 'ON_FOOT') {
					activity_type = test[0].activity[1].type;
					activity_confidence = test[0].activity[1].confidence;
					activity_timestampMs = test[0].timestampMs;
				} else {
					activity_type = test[0].activity[0].type;
					activity_confidence = test[0].activity[0].confidence;
					activity_timestampMs = test[0].timestampMs;
				}
			}


			//long: 0<x<3
			//lat: 1<x<0

			// Handle negative latlngs due to google unsigned/signed integer bug.
			if (latitude > 180) latitude = latitude - (2 ** 32) * SCALAR_E7;
			if (longitude > 180) longitude = longitude - (2 ** 32) * SCALAR_E7;

			if (type === 'json') {
				latlngs.push([latitude, longitude]);
				//for (kek=0; kek<10; kek++){ TODO debug check big files
				data.push({
					"latitude": latitude, "longitude": longitude, "timestampMs": timestampMs, "accuracy": accuracy,
					"velocity": velocity, "heading": heading, "activity.type": activity_type,
					"activity.confidence": activity_confidence, "activity.timestampMs": activity_timestampMs,
					"altitude": altitude, "verticalAccuracy": verticalAccuracy
				});//}
			}
			return oboe.drop;
		}).done(function () {
			status('Generating map...');
			heat._latlngs = latlngs;

			heat.redraw();
			stageThree(  /* numberProcessed */ latlngs.length, excludedAreas, latlngs, data);

		});

		let fileSize = prettySize(file.size);

		status('Preparing to import file ( ' + fileSize + ' )...');

		// Now start working!
		if (type === 'json') parseJSONFile(file, os);
		if (type === 'kml') parseKMLFile(file);
	}

	function stageThree(numberProcessed, excludedAreas, latlngs, data) {

		// Give map rounded edges :)
		$('#map').css('border-radius', '8px');

		// Show upload button
		$('#upload').remove();
		$("<button id=\"upload\" class=\"btn button\">Upload</button>").appendTo("#intro-user");
		$('#upload').click(function (e) {

			let lls = JSON.stringify(excludeAreas(data, excludedAreas));
			$.ajax({
				url: "user/upload.php",
				type: "post",
				dataType: "text",
				data: {
					"locationData": lls

				},

				success: function (response) {
					alert(response);
					$('#upload').remove();
					$("#map").remove();
					$('#success').removeClass('hidden');
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		});


		// Update count
		$('#numberProcessed').text(numberProcessed.toLocaleString());


	}

	function createMap() {
		$("#map").remove();
		$("#map").remove();
		$("<div id=\"map\" \"></div>").appendTo("#content-div");
		map = L.map('map');
		// set map center to plateia vasileos gewrgiou
		map.setView([38.2462420, 21.7350847], 16)

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '<a href="https://openstreetmap.org">OpenStreetMap</a> contributors.',
			maxZoom: 18
		}).addTo(map);
		return map;
	}

	function excludeAreas(data, excludedAreas) { // removes latlings that are inside excluded areas
		center = {
			lat: 38.2462420,
			lng: 21.7350847
		}
		for (j = 0; j < data.length; j++) {

			point = {
				lat: data[j].latitude,
				lng: data[j].longitude
			};
			distance = calculateDistance(center, point);
			// if 10km out of patras remove from data
			/*if (distance > 10000) {
				data.splice(j, 1)
				if (j !== 0)
					j--;
			}*/
		}
		if (!excludedAreas.length) { // if no excluded areas
			//alert("no exclude");
			return data;
		} else {
			for (j = 0; j < data.length; j++) { //todo if excluded areas intersect we get an error
				//console.log(j)
				latlngs = [data[j].latitude, data[j].longitude];
				for (i = 0; i < excludedAreas.length; i++) {

					let xstart = excludedAreas[i][0].lng;
					xend = excludedAreas[i][2].lng;
					ystart = excludedAreas[i][0].lat;
					yend = excludedAreas[i][1].lat;

					if ((xstart <= latlngs[1] && latlngs[1] <= xend) &&// if in excluded regions
						ystart < latlngs[0] && latlngs[0] <= yend) {
						data.splice(j, 1);    //remove it from data
						j--;
					}
				}
			}
			//console.log(data)
			return data;
		}
	}
	function makeTable(container, data, head, id) {
		var table = $("<table id="+id+"/>").addClass('table');
		wtf=$("<thead>");
		for(i=0;i<(head).length;i++){
			wtf.append("<th>"+head[i]+"</th>");
		}
		table.append(wtf);
		$.each(data, function(rowIndex, r) {
			var row = $("<tr/>");
			$.each(r, function(colIndex, c) {
				row.append($("<td/>").text(c));
			});
			table.append(row);
		});
		return container.append(table);
	}
    function calculateDistance(center, point){
		const R = 6371e3; // metres
		const f1 = center.lat * Math.PI/180; // φ, λ in radians
		const f2 = point.lat * Math.PI/180;
		const Df = (point.lat-center.lat) * Math.PI/180;
		const Dl = (point.lng-center.lng) * Math.PI/180;

		const a = Math.sin(Df/2) * Math.sin(Df/2) +
			Math.cos(f1) * Math.cos(f2) *
			Math.sin(Dl/2) * Math.sin(Dl/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		const d = R * c;
		return d;
	}
	/*
	Break file into chunks and emit 'data' to oboe instance
	*/

	$("#CheckAll").click(function() {
		$("input[type=checkbox]").prop("checked", $(this).prop("checked"));
	});

	$("input[type=checkbox]").click(function() {
		if (!$(this).prop("checked")) {
			$("#selectAll").prop("checked", false);
		}
	});

	function parseJSONFile( file, oboeInstance ) {
		let fileSize = file.size;
		let prettyFileSize = prettySize(fileSize);
		let chunkSize = 512 * 1024; // bytes
		let offset = 0;
		let self = this; // we need a reference to the current object
		let chunkReaderBlock = null;
		let readEventHandler = function ( evt ) {
			if ( evt.target.error == null ) {
				offset += evt.target.result.length;
				let chunk = evt.target.result;
				let percentLoaded = ( 100 * offset / fileSize ).toFixed( 0 );
				status( percentLoaded + '% of ' + prettyFileSize + ' loaded...' );
				oboeInstance.emit( 'data', chunk ); // callback for handling read chunk
			} else {
				return;
			}
			if ( offset >= fileSize ) {
				oboeInstance.emit( 'done' );
				return;
			}

			// of to the next chunk
			chunkReaderBlock( offset, chunkSize, file );
		}

		chunkReaderBlock = function ( _offset, length, _file ) {
			let r = new FileReader();
			let blob = _file.slice( _offset, length + _offset );
			r.onload = readEventHandler;
			r.readAsText( blob );
		}

		// now let's start the read with the first block
		chunkReaderBlock( offset, chunkSize, file );
	}

	/*
        Default behavior for file upload (no chunking)	
	*/


	function parseKMLFile( file ) {
		let fileSize = prettySize( file.size );
		let reader = new FileReader();
		reader.onprogress = function ( e ) {
			let percentLoaded = Math.round( ( e.loaded / e.total ) * 100 );
			status( percentLoaded + '% of ' + fileSize + ' loaded...' );
		};

		reader.onload = function ( e ) {
			let latlngs;
			status( 'Generating map...' );
			latlngs = getLocationDataFromKml( e.target.result );
			heat._latlngs = latlngs;
			heat.redraw();
			stageThree( latlngs.length );
		}
		reader.onerror = function () {
			status( 'Something went wrong reading your JSON file. Ensure you\'re uploading a "direct-from-Google" JSON file and try again, or create an issue on GitHub if the problem persists. ( error: ' + reader.error + ' )' );
		}
		reader.readAsText( file );
	}

	function getLocationDataFromKml( data ) {
		let KML_DATA_REGEXP = /<when>( .*? )<\/when>\s*<gx:coord>( \S* )\s( \S* )\s( \S* )<\/gx:coord>/g,
			locations = [],
			match = KML_DATA_REGEXP.exec( data );

		// match
		//  [ 1 ] ISO 8601 timestamp
		//  [ 2 ] longitude
		//  [ 3 ] latitude
		//  [ 4 ] altitude
		while ( match !== null ) {
			locations.push( [ Number( match[ 3 ] ), Number( match[ 2 ] ) ] );
			match = KML_DATA_REGEXP.exec( data );
		}

		return locations;
	}

}( jQuery, L, prettySize ) );
