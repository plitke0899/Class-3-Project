

mapboxgl.accessToken = 'pk.eyJ1IjoicGNsODgxMCIsImEiOiJjbHVsdTR6ejcxNXZmMmlwNXdyeTd0M3BtIn0.Wfxq0XUmk0Ua2GsUNlQPSg';

var mapOptions = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // streets base map to ease navigation
    center: [-73.9857, 40.7577], // starting position (Times Square)
    zoom: 10.4,
}

// create the map
const map = new mapboxgl.Map(mapOptions);

// add a navigation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// loop on ewasteData to create markers
ewasteData.forEach(function (ewasteRecord) {

    var color

    if (ewasteRecord.Type === 'Business') {
        color = '#223cea' //dark blue
    }
    if (ewasteRecord.Type === 'Nonprofit') {
        color = '#dd2588' //magenta
    }
    if (ewasteRecord.Type === 'Public Facility') {
        color = '#096543' //DSNY green
    }


    // pop-ups to provide information on each site
    const popup = new mapboxgl.Popup({
        offset: 24,
        anchor: 'bottom'
    }).setText(
        `${ewasteRecord.SiteName}, located at ${ewasteRecord.SiteAddress}, is a ${ewasteRecord.Type}`
    );

    // create a marker, set the coordinates, add the popup, add it to the map
    new mapboxgl.Marker({
        scale: 0.65,
        color: color
    })
        .setLngLat([ewasteRecord.Longitude, ewasteRecord.Latitude])
        .setPopup(popup)
        .addTo(map);
})