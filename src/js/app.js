/* global google */

$(() => {
  const $map = $('#map');
  let cityLatLng = null;
  let infowindow = null;
  let map = null;
  let location = null

  const cities = $('#map').data('cities');
  console.log(cities);
  cities.forEach((city) => {
    location = city.name;
    console.log(location);
    return location;

  });

  if ($map.length) getCityLocation();

  function getCityLocation() {
    initMap();
    const cities = $map.data('cities');
    const geocoder = new google.maps.Geocoder();
    cities.forEach((city) => {
      geocoder.geocode({ address: `${city.name}, ${city.location}` }, (results) => {
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
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      id
    });

    marker.addListener('click', function() {
      window.location.replace(`/cities/${this.id}`);
    });
  }


});
