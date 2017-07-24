var map;
var infowindow;
var location;
var resultsList;
//Initialize map to display parks within a 
//1 mile (1609.34 meter) radius of Center City Charlotte
function initMap() {
    $("#current-zip").html("Current Zip: 28202");
    var charlotte = { lat: 35.2295948, lng: -80.8359465 };
    var location =
        map = new google.maps.Map(document.getElementById('map'), {
            center: charlotte,
            zoom: 14
        });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: charlotte,
        radius: 1609.34,
        type: ['park']
    }, callback);
}

function callback(results, status) {
    if ((status === google.maps.places.PlacesServiceStatus.OK) && (location != { lat: 35.2295948, lng: -80.8359465 })) {
        $(".results-list").empty(); //empty out current values
        var length;
        if (results.length <= 10) { //since there is no param to limit api results, we must do something like this
            length = results.length;
        } else {
            length = 10;
        }
        for (var i = 0; i < length; i++) { //that way if we have fewer than 10 results, we won't loop too many times and create errors
            $(".results-list").append($('<div class="col m12 test" id="result-' + (i + 1) + '">' + (i + 1) + '. ' + results[i].name + '</div>'));
            createPhotoMarker(results[i]);
        }
    } else {
        $(".results-list").empty(); //what if the status does not come back as ok, maybe it has zero results?
        $(".results-list").html($('<h5> No parks in your area</h5>'));
    }
}

function createPhotoMarker(place) {
    var photos = place.photos;
    if (!photos) {
      return;
    }

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}



//The functions below are for obtaining lat/long coordinates
///////////////////////////////////////////////////
function showResult(result) {
    var lat = result.geometry.location.lat();
    var long = result.geometry.location.lng();
    var address = {
        lat: lat,
        lng: long
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: address,
        zoom: 14 //adjusted zoom to show all results
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: address,
        radius: 1609.34,
        type: ['park']
    }, callback);

}

function getLatitudeLongitude(callback, address) {
    // If address is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

//Submit Search button functionality
//////////////////////////////////////////////

$("#submit-search").on("click", function() { //no need to hide the current values
    var address = document.getElementById('zip-code').value.trim();
    getLatitudeLongitude(showResult, address);
    $("#current-zip").empty();
    $("#current-zip").html("Current Zip: " + address);
});