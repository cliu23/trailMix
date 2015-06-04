var marker;

	function initialize() {
		if (document.getElementById("latlon") != null) {
		lat = document.getElementById("latlon").getAttribute("lat");
		lon = document.getElementById("latlon").getAttribute("lon");
		console.log(lat);
		console.log(lon);
		var center = new google.maps.LatLng(lat, lon);

		// setting the mapOptions and how it looks
	  	var mapOptions = {
		    zoom: 5,
		    center: center,
			streetViewControl: true,
			overviewMapControl: true,
  		};

  		// initialize the map on to the page
	 	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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

