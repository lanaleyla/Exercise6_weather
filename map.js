let map;

function initMap() {
    
    let uluru = {lat: 44.5452, lng: -78.5389};
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: uluru
  });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(map,'click',function (event)
    {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());

    let data1=fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + event.latLng.lat() + '&lon=' +event.latLng.lng() + '&units=metric&appid=c894fa26f98d61a6892f65d827493bef')
        .then((response) => { 
            return response.json();
        })
        .then(function(myJson) {

            infowindow.setContent(setWeather(myJson));    
            infowindow.setPosition(event.latLng);
            infowindow.open(map);
        })
        .catch((err) => { //in case of error
            console.log("Error: " + err);
        });
    }); 
    

//set the string of the weather information
    function setWeather(result)
    {
        const name=JSON.stringify(result["name"])
        const locationName=name.substring(1,name.length-1);
        const temperatue=JSON.stringify(result["main"]["temp"]);
        const Description=JSON.stringify(result["weather"][0][ "description"]);
        const description=Description.substring(1,Description.length-1);
        const wind=JSON.stringify(result["wind"]["speed"]);
        const humidity=JSON.stringify(result["main"]["humidity"]);
        if(locationName!=="")
        {
            return (locationName+":<br>"+description+"<br>"+"Temperatue: "+temperatue+" &#8451, "+"<br>"+" Wind: "+wind+"m/s"+"<br>"+" Humidity: "+humidity+ "%");
        }
        else return ("Weather:<br>"+description+"<br>"+"Temperatue: "+temperatue+" &#8451, "+"<br>"+" Wind: "+wind+"m/s"+"<br>"+" Humidity: "+humidity+ "%");
    }
}








