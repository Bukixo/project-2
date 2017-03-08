$(() => {

  const apiKey = 'AIzaSyDc7hNgWybvVmyFoxffU6oAKwOBif-cJIo';
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
    const name = $map.data('cities');
    $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${apiKey}`)
      .done((response) => {
        const cityLocation = response.results[0].geometry.location;
        cityLatLng = { lat: cityLocation.lat, lng: cityLocation.lng };
        initMap();
        console.log(name);
      });
  }


  function initMap() {
    const london = { lat: 51.5074, lng: 0.1278 }
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: london
    });
    new google.maps.Marker({
      postion: london,
      map
    });

    //Functions go here
  }

  // function addMarker(city) {
  //
  // }


});
