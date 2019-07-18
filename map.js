let map;

function initMap() {
    
    let uluru = {lat: 28, lng: 37};
    map = new google.maps.Map(document.getElementById('map'),  //get map
    {
    zoom: 3,
    center: uluru
  });

    let infowindow = new google.maps.InfoWindow(); //create info window

    google.maps.event.addListener(map,'click',function (event) //subscribe to "click" event
    {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + event.latLng.lat() + '&lon=' +event.latLng.lng() + '&units=metric&appid=c894fa26f98d61a6892f65d827493bef')
        .then((response) => { 
            return response.json();
        })
        .then(function(myJson){

            infowindow.setContent(setWeather(myJson)); //call setWeather() to set the content in the infowindow
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
        const name=JSON.stringify(result["name"]); //location name
        const locationName=name.substring(1,name.length-1);
        const Country=JSON.stringify(result["sys"]["country"]); //country
        if(Country!==undefined){country=Country.substring(1,Country.length-1);}
        const temperatue=JSON.stringify(result["main"]["temp"]); //temperature
        const Description=JSON.stringify(result["weather"][0][ "description"]); //weather description 
        const description=Description.substring(1,Description.length-1);
        const Icon=JSON.stringify(result["weather"][0]["icon"]); //icon
        if(Icon!==""){iconUrl = "<img src='http://openweathermap.org/img/wn/"+Icon.substring(1,Icon.length-1)+"@2x.png'>";}
        const wind=JSON.stringify(result["wind"]["speed"]);  //wind
        const humidity=JSON.stringify(result["main"]["humidity"]); //humidity
        if(locationName!=="")
        {//return string of content to set in infoWindow 
            return (locationName+" ,"+country+"<br>"+description+"<br>"+iconUrl+"<br>"+temperatue+" &#8451, "+"<br>"+" Wind: "+wind+" MPH"+"<br>"+" Humidity: "+humidity+ "%");
        }
        else return ("Weather, "+country+"<br>"+description+"<br>"+iconUrl+"<br>Temperatue: "+temperatue+" &#8451, "+"<br>"+" Wind: "+wind+" MPH"+"<br>"+" Humidity: "+humidity+ "%");
    }
}








