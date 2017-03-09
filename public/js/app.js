'use strict';

/* global google */

$(function () {
  var $map = $('#map');
  var cityLatLng = null;
  var infowindow = null;
  var map = null;
  var location = null;

  var cities = $map.data('cities');

  if (cities) {
    cities.forEach(function (city) {
      location = city.name;
      console.log(location);
      return location;
    });
  }

  if ($map.length) getCityLocation();

  function getCityLocation() {
    initMap();
    var cities = $map.data('cities');
    var geocoder = new google.maps.Geocoder();
    cities.forEach(function (city) {
      geocoder.geocode({ address: city.name + ', ' + city.location }, function (results) {
        addMarker(results[0].geometry.location, city._id);
      });
    });
  }

  function initMap() {
    map = new google.maps.Map($map.get(0), {
      zoom: 2,
      center: { lat: 25, lng: 0 }
    });
  }

  function addMarker(latLng, id) {
    console.log('adding marker', latLng, map);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      id: id
    });

    marker.addListener('click', function () {
      window.location.replace('/cities/' + this.id);
    });
  }

  $(document).ready(function () {

    $('.toggle-btn').click(function () {
      $('.toggle').toggle(50);
    });
  });
});