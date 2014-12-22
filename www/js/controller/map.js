ionicApp.controller("mapctrl", [ '$stateParams','$scope',"leafletEvents","$http","$state", function($stateParams,$scope, leafletEvents,$http,$state) {
 var counter = 5;

$scope.homePage = function(){
$state.transitionTo('tabs.ticket');  
}

function showMapLocation(){
 var showLocationUrl = _baseUrl + "userService/" + "333234567" +"/fetchUserLatLng?userId="+$stateParams.contactId+"&lastNLatLng="+counter;
 var  responsePromise = $http.get(showLocationUrl,{ cache: false });

        responsePromise.success(function(data, status, headers, config) {
          console.log(JSON.stringify(data));

              var latLonglist = data.geolocationList;
             // console.log(latLonglist[0]);
              $scope.markers = new Array();
              for (var i = 0; i < latLonglist.length; i++) {
                // console.log( geolocationList[i]);
                 //var latLong = latLonglist[i].split(","); 
                 console.log(latLonglist[i].latitude);
                 console.log(latLonglist[i].longitude);
                 var tickitStatus = latLonglist[i].tickitStatusModel.label;
                 console.log(tickitStatus);

                      if (tickitStatus == 'Completed') {
                      
                               var coloredicon = {
                                iconUrl: 'img/pin_blue.png',
                                iconSize: [38, 45], // size of the icon
                                shadowSize: [50, 64], // size of the shadow
                                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                                shadowAnchor: [4, 62], // the same for the shadow
                                popupAnchor: [-3, -76]
                               }
                             }
                      if(tickitStatus == 'rejected'){
                        
                          var coloredicon = {
                                iconUrl: 'img/pin_red.png',
                                iconSize: [38, 45], // size of the icon
                                shadowSize: [50, 64], // size of the shadow
                                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                                shadowAnchor: [4, 62], // the same for the shadow
                                popupAnchor: [-3, -76]
                               }

                      } 
                      if(tickitStatus == 'Unassigned'){
                            var coloredicon = {
                                iconUrl: 'img/pin_yellow.png',
                                iconSize: [38, 45], // size of the icon
                                shadowSize: [50, 64], // size of the shadow
                                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                                shadowAnchor: [4, 62], // the same for the shadow
                                popupAnchor: [-3, -76]
                               }
                       
                      }   
                      if(tickitStatus == 'Verified'){
                        var coloredicon = {
                                iconUrl: 'img/pin_green.png',
                                iconSize: [38, 45], // size of the icon
                                shadowSize: [50, 64], // size of the shadow
                                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                                shadowAnchor: [4, 62], // the same for the shadow
                                popupAnchor: [-3, -76]
                               }
                          
                        
                      } 
                           
                       $scope.markers.push({
                       
                            lat:Number(latLonglist[i].latitude) ,
                            lng:Number(latLonglist[i].longitude) ,
                            icon:coloredicon,
                             /*{
                                iconUrl: 'img/pin_red.png',
                                iconSize: [35, 35],
                              },*/
                            focus: true,
                            message:latLonglist[i].tickitSubject
                            /*label: {
                            message: "Hey",
                            options: {
                                noHide: true
                                }
                           }*/
                       });
                    

              };
    var mapCenter = latLonglist.length / 2;
    mapCenter = parseInt(mapCenter);
    console.log(mapCenter);          
    $scope.berlin = {
      lat:Number(latLonglist[mapCenter].latitude) ,
      lng:Number(latLonglist[mapCenter].longitude) ,
      zoom:12

    }          
   //console.log(JSON.stringify($scope.markers));
          
       })
       
       responsePromise.error(function(data, status, headers, config) {
        console.log(JSON.stringify(data)); 

       })

};

showMapLocation();
$scope.showMoreLocation = function(){
counter+=5;
showMapLocation ();
}


 angular.extend($scope, {

        berlin: {

          },
        markers: {
                    
        },
        layers: {
        baselayers: {
        osm: {
        name: 'OpenStreetMap',
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        type: 'xyz'
        },
        }
        },
        defaults: {
            scrollWheelZoom: false
        }
    });    


}]);

/*googleTerrain: {
        name: 'Google Terrain',
        layerType: 'TERRAIN',
        type: 'google'
        },
        googleHybrid: {
        name: 'Google Hybrid',
        layerType: 'HYBRID',
        type: 'google'
        },*/

//{"status":"OK","message":"LAT/LNG list fetched","latLngList":["65.0,23.0","65.215,-58.12","98.0,98.0","123.456,456.789"]}

 /*$scope.events = {
markers: {
enable: leafletEvents.getAvailableMarkerEvents(),
}
};
$scope.eventDetected = "No events yet...";
var markerEvents = leafletEvents.getAvailableMarkerEvents();
for (var k in markerEvents){
var eventName = 'leafletDirectiveMarker.' + markerEvents[k];
$scope.$on(eventName, function(event, args){
console.log(event.name);
});
}*/
/*layers: {
        baselayers: {
        googleTerrain: {
        name: 'Google Terrain',
        layerType: 'TERRAIN',
        type: 'google'
        },
        googleHybrid: {
        name: 'Google Hybrid',
        layerType: 'HYBRID',
        type: 'google'
        },
        googleRoadmap: {
        name: 'Google Streets',
        layerType: 'ROADMAP',
        type: 'google'
        }
        }
        },*/