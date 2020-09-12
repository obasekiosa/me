var HTMLheaderName = "<h1 id='name'>%data%</h1>";
var HTMLheaderRole = "<span class='white-text'>%data%</span><hr/>";

var HTMLcontactGeneric = "<li class='flex-item'><span class='orange-text'>%contact%</span><span class='white-text'>%data%</span></li>";
var HTMLmobile = "<li class='flex-item'><span class='orange-text icon-phone' title='mobile'></span><span class='white-text'>%data%</span></li>";
var HTMLemail = "<li class='flex-item'><span class='orange-text icon-mail' title='email'></span><span class='white-text'>%data%</span></li>";
var HTMLgithub = "<a class='white-text' style='margin-top: 0px;' href='https://www.github.com/%data%'><li class='flex-item'><span class='orange-text icon-github' title='GitHub'></span><span class='white-text'>%data%</span></li></a>";
var HTMLlinkedin = "<a class='white-text' style='margin-top: 0px;' href='https://www.linkedin.com/in/%data%'><li class='flex-item'><span class='orange-text icon-linkedin' title='LinkedIn'></span><span class='white-text'>%data%</span></li></a>";
var HTMLblog = "<li class='flex-item'><span class='orange-text icon-blogger' title='blog'></span><span class='white-text'>%data%</span></li>";
var HTMLlocation = "<li class='flex-item'><span class='orange-text icon-home' title='home'></span><span class='white-text'>%data%";
var HTMLmapPin = "<img src='http://maps.google.com/mapfiles/ms/icons/%color%-dot.png' class='pin' onClick='location.href=\"#mapDiv\"'></span></li>";

var HTMLbioPic = "<img src='%data%' class='biopic'>";
var HTMLWelcomeMsg = "<span class='welcome-message'>%data%</span>";

var HTMLskillsStart = "<h3 id='skillsH3'>Skills at a Glance:</h3><ul id='skills' class='flex-box'></ul>";
var HTMLskills = "<li class='flex-item'><span class='white-text'>%data%</span></li>";

var HTMLworkStart = "<div class='work-entry'></div>";
var HTMLworkEmployer = "<a href='#'>%data%";
var HTMLworkTitle = " - %data%</a>";
var HTMLworkDates = "<div class='date-text'>%data%</div>";
var HTMLworkLocation = "<div class='location-text'>%data%";
var HTMLworkMapPin = "<img src='http://maps.google.com/mapfiles/ms/icons/%color%-dot.png' class='pin' onClick='location.href=\"#mapDiv\"'></div>";
var HTMLworkDescription = "<p><br>%data%</p>";

var HTMLprojectStart = "<div class='project-entry'></div>";
var HTMLprojectTitle = "<a href='%url%' target='_blank'>%data%</a>";
var HTMLprojectDates = "<div class='date-text'>%data%</div>";
var HTMLprojectDescription = "<p><br>%data%</p>";
var HTMLprojectImage = "<img src='%data%'>";

var HTMLschoolStart = "<div class='education-entry'></div>";
var HTMLschoolName = "<a href='%url%' target='_blank'>%data%";
var HTMLschoolDegree = " -- %data%</a>";
var HTMLschoolDates = "<div class='date-text'>%data%</div>";
var HTMLschoolLocation = "<div class='location-text'>%data%";
var HTMLschoolMapPin = "<img src='http://maps.google.com/mapfiles/ms/icons/%color%-dot.png' class='pin' onClick='location.href=\"#mapDiv\"'></div>";
var HTMLschoolMajor = "<em><br>Major: %data%</em>"

var HTMLonlineClasses = "<h3 id='onlineH3'>Online Classes</h3>";
var HTMLonlineTitle = "<a href='#'>%data%";
var HTMLonlineSchool = " - %data%</a>";
var HTMLonlineDates = "<div class='date-text'>%data%</div>";
var HTMLonlineURL = "<br><a href='#' target='_blank'><!--%data%--></a>";

var internationalizeButton = "<button>Internationalize</button>";
var googleMap = "<div id='map'></div>";

// collecting click locations
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      "x": x,
      "y": y
    }
  );
  console.log("x location: " + x + "; y location: " + y);
}

$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks (x,y);
});

// toggle functions to show/hide sections
$(document).on('click', '#work-toggle', function() {
  $(".work-entry").toggle();
  $("#work-toggle").toggleClass('icon-arrow-up icon-arrow-down');
});

$(document).on('click', '#project-toggle', function() {
  $(".project-entry").toggle();
  $("#project-toggle").toggleClass('icon-arrow-up icon-arrow-down');
});

$(document).on('click', '#education-toggle', function() {
  $(".education-entry").toggle();
  $("#education-toggle").toggleClass('icon-arrow-up icon-arrow-down');
});

$(document).on('click', '#map-toggle', function() {
  $("#map").toggle();
  if($("#map").is(":hidden")){
    $("#mapDiv").height('0');
  }else{
    $("#mapDiv").height('400');
  }
  $("#map-toggle").toggleClass('icon-arrow-up icon-arrow-down');
});

// Google map functions
var map;

function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  function locationFinder() {
    var locations = [];

    var loc = bio.contacts.location;
    var loc_txt = "Home";
    var color = bio.contacts.pin;
    locations.push([loc,loc_txt,color]);

    for (var school in education.schools) {
      var loc = education.schools[school].location;
      var loc_txt = education.schools[school].name;
      var color = education.schools[school].pin;
      locations.push([loc,loc_txt,color]);
    }

    for (var job in work.jobs) {
      var loc = work.jobs[job].location;
      var loc_txt = work.jobs[job].employer;
      var color = work.jobs[job].pin;
      locations.push([loc,loc_txt,color]);
    }

    return locations;
  }

  function createMapMarker(placeData, note, pinColor) {
    var lat = placeData.geometry.location.lat();
    var lon = placeData.geometry.location.lng();
    var name = placeData.formatted_address;
    var bounds = window.mapBounds;

    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name,
      icon: "http://maps.google.com/mapfiles/ms/icons/" + pinColor + "-dot.png",
      animation: google.maps.Animation.DROP
    });

    var infoWindow = new google.maps.InfoWindow({
      content: note
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    bounds.extend(new google.maps.LatLng(lat, lon));
    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
  }

  function pinPoster(locations) {
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: locations[0]
    }
    service.textSearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMapMarker(results[0], locations[1], locations[2]);
      }
    });
  }

  window.mapBounds = new google.maps.LatLngBounds();

  locations = locationFinder();

  for (index in locations){
    pinPoster(locations[index]);
  }
};

window.addEventListener('load', initializeMap);

window.addEventListener('resize', function(e) {
  map.fitBounds(mapBounds);
});
