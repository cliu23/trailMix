	var marker;
	var directionsDisplay;
	var directionsService;
	var map;

	function initialize() {
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		var styles = [{"featureType":"all","elementType":"all","stylers":[{"color":"#d4b78f"},{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#0d0000"},{"visibility":"on"},{"weight":1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#98290e"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#98290e"},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#d4b78f"},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#c4b17e"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#0d0000"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#d9be94"},{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#0d0000"},{"visibility":"off"},{"weight":2}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a8ac91"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#98290e"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}];
		var styledMap = new google.maps.StyledMapType(styles,
			{name: "Pirate Map"});
		if (document.getElementById("latlon") != null) {
			var lat = document.getElementById("latlon").getAttribute("lat");
			var lon = document.getElementById("latlon").getAttribute("lon");
			console.log(lat);
			console.log(lon);
			var center = new google.maps.LatLng(lat, lon);

			// setting the mapOptions and how it looks
			var mapOptions = {
				zoom: 5,
				center: center,
				streetViewControl: true,
				overviewMapControl: true,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};

	  		// initialize the map on to the page
	  		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	  		map.mapTypes.set('map_style', styledMap);
	  		map.setMapTypeId('map_style');
	  		directionsDisplay.setMap(map);

		 	// setting up content for the infowindow
		 	var contentString = '<div id="content">'+
		 	'<div id="siteNotice">'+
		 	'</div>'+
		 	'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
		 	'<div id="bodyContent">'+
		 	'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
		 	'sandstone rock formation in the southern part of the '+
		 	'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
		 	'south west of the nearest large town, Alice Springs; 450&#160;km '+
		 	'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
		 	'features of the Uluru - Kata Tjuta National Park. Uluru is '+
		 	'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
		 	'Aboriginal people of the area. It has many springs, waterholes, '+
		 	'rock caves and ancient paintings. Uluru is listed as a World '+
		 	'Heritage Site.</p>'+
		 	'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
		 	'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
		 	'(last visited June 22, 2009).</p>'+
		 	'</div>'+
		 	'</div>';

			      // creatine a object for inforwindow and the content inside.
			      var infowindow = new google.maps.InfoWindow({
			      	content: contentString,
			      	maxWidth: 400
			      });

		 	// setting up the marker on the map
		 	marker = new google.maps.Marker({
		 		position: center,
		 		map: map,
		 		title: "Center of the WORLD!",
		 		draggable:true,
		 		animation: google.maps.Animation.DROP

		 	});
		     // when the marker is clicked an info window will pop up
		     google.maps.event.addListener(marker, 'click', function() {
		     	infowindow.open(map,marker);
		     });

		    // when a marker is clicked  it will bounce up an
		    google.maps.event.addListener(marker, 'click', toggleBounce);

		    if (navigator.geolocation) {
		    	navigator.geolocation.getCurrentPosition(success);

		    	function success(position) {
		    		var mylat = position.coords.latitude;
		    		var mylon = position.coords.longitude;
		    		
		    		var myLatlng = new google.maps.LatLng(mylat, mylon);
		    		
		    		var mymarker = new google.maps.Marker({
		    			position: myLatlng,
		    			title: "My Current Location"
		    		});
		    		
		    		mymarker.setMap(map);
		    		var request = {
		    			origin: myLatlng,
		    			destination: center,
		    			travelMode: google.maps.TravelMode.DRIVING
		    		};

		    		directionsService.route(request, function(response, status) {
		    			if (status == google.maps.DirectionsStatus.OK) {
		    				directionsDisplay.setDirections(response);
		    			}
		    		});

		    	}
		    } 
		    else {
		    	alert("Geo Location is not supported on your current browser!");
		    }
		  }
		  else {}

		  	
		}

			// makeing the marker bounce up and down
			function toggleBounce() {

				if (marker.getAnimation() != null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}


			function loadScript() {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAd1KC9Oo39e7sLm0kKpoimB6lWQIguArk&callback=initialize';
				document.body.appendChild(script);

			}







	// window.onload = loadScript;






		// Loads in Google maps on windows
		// google.maps.event.addDomListener(window, 'load', create, loadscript);

