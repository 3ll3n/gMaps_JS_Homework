var MapWrapper = function(container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
};

MapWrapper.prototype = {
  addMarker: function(coords) {
    var marker = new google.maps.Marker({
      position: coords, 
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    var contentString = "<div id='content'>" + "<p>Latitude:" + coords.lat + "</p><p>" + "Longitude:" + coords.lng + "</p></div>";

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener("click", function() {
      infoWindow.open(this.googleMap, marker);
    }.bind(this));
  },
  addClickEvent: function() {
   google.maps.event.addListener(this.googleMap, "click", function(event) {
    // console.log(event);
    // console.log("Latitude: ", event.latLng.lat());
    // console.log("Longitude: ", event.latLng.lng());

    this.addMarker({ lat: event.latLng.lat(), lng: event.latLng.lng()});
   }.bind(this)); 
  }
};

var app = function() {
  var container = document.getElementById("main-map");
  var center = {lat:48.8566, lng:2.3522}
  var zoom = 10;
  var mainMap = new MapWrapper(container, center, zoom);
  mainMap.addMarker(center);
  mainMap.addClickEvent();
};

window.onload = app;