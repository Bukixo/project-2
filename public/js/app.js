'use strict';

$(function () {

  var apiKey = 'AIzaSyDc7hNgWybvVmyFoxffU6oAKwOBif-cJIo';
  var $map = $('#map');
  var cityLatLng = null;
  var infowindow = null;
  var map = null;
  var location = null;

  var cities = $('#map').data('cities');
  console.log(cities);
  cities.forEach(function (city) {
    location = city.name;
    console.log(location);
    return location;
  });

  if ($map.length) getCityLocation();

  function getCityLocation() {
    var name = $map.data('cities');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + name + '&key=' + apiKey).done(function (response) {
      var cityLocation = response.results[0].geometry.location;
      cityLatLng = { lat: cityLocation.lat, lng: cityLocation.lng };
      initMap();
      console.log(name);
    });
  }

  function initMap() {
    var london = { lat: 51.5074, lng: 0.1278 };
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: london
    });
    new google.maps.Marker({
      postion: london,
      map: map
    });

    //Functions go here
  }

  // function addMarker(city) {
  //
  // }

});