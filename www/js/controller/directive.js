ionicApp.service('geoLocationService', ['$interval', '$cordovaDialogs', '$cordovaGeolocation', '$http', function ($interval,$cordovaDialogs,$cordovaGeolocation,$http) {
	    
	    var watchId;
		var locationFlag;
	    return {
	      start: function ( ) {
	      	console.log("started");
	        watchId = $interval(function () {
	          //alert(TimeInterval);
	          $cordovaGeolocation.getCurrentPosition({maximumAge: 7000, timeout: 15000, enableHighAccuracy: true}).then(function(position) {
									 console.log("Your latitude is " + position.coords.latitude);
									 console.log("Your latitude is " + position.coords.longitude);
									// Position here: position.coords.latitude, position.coords.longitude
									var latitude =  position.coords.latitude;
									var longitude = position.coords.longitude;
									var userId = JSON.parse(localStorage.getItem("user")).userId;						
									var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
									var userName = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
									var dd1 = new Date();
								      var currentHours1 = dd1.getHours();
								      var currentMin1 = dd1.getMinutes();
								      var currentSec1 = dd1.getSeconds();

								      if (currentHours1 < 10) {
								                currentHours1 = "0" + currentHours1;
								            }
								      if (currentMin1 < 10) {
								                currentMin1 = "0" + currentMin1;
								            }
								      if (currentSec1 < 10) {
								                currentSec1 = "0" + currentSec1;
								            }      
								    var time = currentHours1+":"+currentMin1+":"+currentSec1;
									console.log(time);
									var compareLat = localStorage.getItem("lat");
							         var compareLong = localStorage.getItem("long");
							         var threePlacedLat = parseFloat(latitude).toFixed(3);
							         var threePlacedLong = parseFloat(longitude).toFixed(3);
							         var threePlacedcompareLat = parseFloat(compareLat).toFixed(3);
							         var threePlacedcompareLong = parseFloat(compareLong).toFixed(3);
							         if(threePlacedLat == threePlacedcompareLat && threePlacedLong == threePlacedcompareLong){
							          locationFlag = 0;
							         }else{
							          locationFlag = 1;
							         }

							         var watch = $cordovaGeolocation.watchPosition({ frequency: 10000 });
							           watch.promise.then(function() {}, 
							             function(err) {
							               // An error occurred.
							             }, 
							             function(position) {
							               // Active updates of the position here
							               // position.coords.[ latitude / longitude]
							           });
							          if(locationFlag == 1){ 
							           localStorage.setItem("lat", latitude);
							           localStorage.setItem("long", longitude);
									var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
									
									var form = new FormData();
									
							           form.append('ownerId' , userId);
							           form.append('tickitStatus' , "7");
							           form.append('msgBody' ,userName);
							           form.append('tickitType' , "20");
							           form.append('recipient' , "chris@abc.com");
							           form.append('subject' , time);
							           form.append('ip' , "192.168.1.217");
							           form.append('gps' , latitude + ";" + longitude);
							             $.ajax({
													url: manualTickitUrl,
													data: form,
													dataType: 'text',
													processData: false,
													contentType: false,
													type: 'POST',
													success: function(data){
													//console.log(JSON.stringify(form));	
													console.log(JSON.stringify(data));
													},
													error:function(data){
														console.log(JSON.stringify(data));
														}
												  });
							             	}	
								
								}, function(err) {
								  console.log(err);
								});  

	        },15000);
	      },
	      stop: function () {
	      	console.log("stoped");
	        if (watchId) {
	          $interval.cancel(watchId);
	        }
	      }
	    };
	  }]);

ionicApp.factory('friendlist', function ($http,$state,$ionicLoading) {

    var current = {}; 
       var factory = {            
           query: function () {
			  var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
			  var URL =  _baseUrl + "userService/" + 333234567 + "/fetchUsers";
			  var getFriendListData = {};
			  $ionicLoading.show({
							     content: '<h1><i class="icon ion-refreshing"></i></h1>',
							      animation: 'fade-in',
							      showBackdrop: true,
							      maxWidth: 200,
							      showDelay: 50
							    });
              var  data = $http.get(URL,getFriendListData,{ cache: false }).then(function (result) {
                         //console.log(JSON.stringify(result));
                            current = result.data.userList; 
                             $state.transitionTo('tabs.friendlist');                           
                             $ionicLoading.hide();
                        }, function (result) {
                        	$ionicLoading.hide();
                            alert("Error: No data returned");
                            console.log(JSON.stringify(result));
                           
                        })

            },
            getList: function () {
                       
               return current;
            }
       }       
        return factory; 
  });


ionicApp.service('backGeoLocationService', ['$cordovaGeolocation', '$http', function ($cordovaGeolocation,$http) {
	    'use strict';
	    var watchId;
	
	    return {		
	    configureBackgroundGeoLocation: function() {
	    	console.log("configureBackgroundGeoLocation");
		// Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
		// in order to prompt the user for Location permission.
		window.navigator.geolocation.getCurrentPosition(function(location) {
		console.log('Location from Phonegap');
		});
		var bgGeo = window.plugins.backgroundGeoLocation;
		/**
		* This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
		*/
		var yourAjaxCallback = function(response) {
		////
		// IMPORTANT: You must execute the #finish method here to inform the native plugin that you're finished,
		// and the background-task may be completed. You must do this regardless if your HTTP request is successful or not.
		// IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
		//
		bgGeo.finish();
		//document.getElementById('app').innerHTML += "yourAjaxCallback is called <br>";
		};
		/**
		* This callback will be executed every time a geolocation is recorded in the background.
		*/
		var callbackFn = function(location) {
		console.log('[js] BackgroundGeoLocation callback: ' + location.latitude + ',' + location.longitude);
		//create tickit
		var manualTickitUrl = _baseUrl + "tickitService/" + "333234567" +"/createTickit" ;
		var userId = JSON.parse(localStorage.getItem("user")).userId;						
		var userName = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
		  var dd1 = new Date();
	      var currentHours1 = dd1.getHours();
	      var currentMin1 = dd1.getMinutes();
	      var currentSec1 = dd1.getSeconds();

	      if (currentHours1 < 10) {
	                currentHours1 = "0" + currentHours1;
	            }
	      if (currentMin1 < 10) {
	                currentMin1 = "0" + currentMin1;
	            }
	      if (currentSec1 < 10) {
	                currentSec1 = "0" + currentSec1;
	            }      
	    var time = currentHours1+":"+currentMin1+":"+currentSec1;
	console.log(time);
		//var manualTickitUrl = 'http://dev.tickittaskit.com/flippadoo/mobile/tickitService/111234567/createTickit';
		var form = new FormData();
		form.append('ownerId' , userId);
		form.append('tickitStatus' , "8");
		form.append('msgBody' , userName);
		form.append('tickitType' , "20");
		form.append('recipient' , "chris@abc.com");
		form.append('subject' , time);
		form.append('ip' , "192.168.1.217");
		form.append('gps' , location.latitude + ";" + location.longitude);
		$.ajax({
		url: manualTickitUrl,
		data: form,
		dataType: 'text',
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
		},
		error:function(data){
		}
		});
		// Log to my server
		$.ajax({
		url: 'http://qdevinc.com/test/requestDump',
		type: "POST",
		dataType: 'text',
		cache: false,
		processData: false,
		contentType: false,
		data: form,
		success: function( data, textStatus, jqXHR ){
		//alert('registration id = '+e.regid);
		},
		error: function(jqXHR, textStatus, errorThrown){
		},
		complete: function(){
		}
		});	
		
		yourAjaxCallback.call(this);
		};
		var failureFn = function(error) {
		console.log('BackgroundGeoLocation error');
		}
		// BackgroundGeoLocation is highly configurable.
		bgGeo.configure(callbackFn, failureFn, {
		url: 'http://qdevinc.com/test/requestDump', // <-- only required for Android; ios allows javascript callbacks for your http
		params: {
            auth_token: 'user_secret_auth_token',    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
            foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
        },
        headers: {                                   // <-- Android ONLY:  Optional HTTP headers sent to your configured #url when persisting locations
            "X-Foo": "BAR"
        },
		desiredAccuracy: 50,
		stationaryRadius: 20,
		distanceFilter: 30,
		notificationTitle: 'WHAMI Tracking', // <-- android only, customize the title of the notification
		notificationText: 'Enabled', // <-- android only, customize the text of the notification
		activityType: "AutomotiveNavigation", // <-- iOS-only
		debug: true // <-- enable this hear sounds for background-geolocation life-cycle.
		});
		},
		startTracking: function(){
			console.log("startTracking");
		// Turn ON the background-geolocation system. The user will be tracked whenever they suspend the app.
		var bgGeo = window.plugins.backgroundGeoLocation;
		bgGeo.start();
		},
		stopTracking: function(){
		console.log("stopTracking");
		var bgGeo = window.plugins.backgroundGeoLocation;
		bgGeo.stop();
		}
			
	      
	    };
	  }]);
