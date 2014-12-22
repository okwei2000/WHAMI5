
var flagNetwork = 0 ;

ionicApp.controller('createTickitCtrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs,$cordovaCamera,friendlist,geoLocationService,$cordovaSocialSharing,$cordovaNetwork,backGeoLocationService) {
 checkNetwork();
 
 $scope.statussucess = false;
 $scope.stausFail = false;

function statusTimeDisplay(){
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
    var tickittime1 = currentHours1+":"+currentMin1+":"+currentSec1;

    $scope.statusTime = tickittime1;
}

$scope.backToHome = function(){
  $state.transitionTo('tabs.home'); 
}


 var whamiAuto = localStorage.getItem("whamiAuto");
 //alert("whamiAuto = " + whamiAuto);
 if(whamiAuto == null || whamiAuto == "true") {
  localStorage.removeItem("whamiAuto");
  localStorage.setItem("whamiAuto", true);
  //alert("inside if");
  autoWhami();
 }
 
 function autoWhami(){
  // alert("inside autoWhami");
    $scope.main.pushNotification = { checked: true };
    geoLocationService.start();
     backGeoLocationService.startTracking();
   // alert("inside autoWhami after");
  }  



  $scope.main.pushNotificationChange = function(){

    
    var whamiAuto = localStorage.getItem("whamiAuto");
   // alert("changed " + whamiAuto);
    if(whamiAuto == "true") {
     
      geoLocationService.stop();
       backGeoLocationService.stopTracking();
      //alert("inside if")
      localStorage.removeItem("whamiAuto");
      localStorage.setItem("whamiAuto", false);
      //localStorage.setItem("whamiAuto", true);
    } else {
     // alert("inside else");
       geoLocationService.start();
       backGeoLocationService.startTracking();
      localStorage.setItem("whamiAuto", true);
    }
    
  } 
 
 $scope.$on('deviceReady', function(event, args) {
   //alert('deviceReady');
           $scope.wifiAvailable = false; 
           $scope.noNetwork = false;
           $scope.twoG = false; 
           $scope.threeG = false;
           $scope.fourG = false;
           $scope.ethernet = false;
           $scope.unknown = false;    
        var type = $cordovaNetwork.getNetwork();

        var isOnline = $cordovaNetwork.isOnline();
          
        var isOffline = $cordovaNetwork.isOffline();
        
        var states = {};
        states[Connection.UNKNOWN]  = 'unknown';
        states[Connection.ETHERNET] = 'ethernet';
        states[Connection.WIFI]     = 'wiFi';
        states[Connection.CELL_2G]  = 'twoG';
        states[Connection.CELL_3G]  = 'threeG';
        states[Connection.CELL_4G]  = 'fourG';
        states[Connection.NONE]     = 'noNetwork';
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, true);
        var networkType = states[type];
        //alert(type);
        if(networkType == "wiFi"){
          $scope.wifiAvailable = true;  
        }
         if(networkType == "noNetwork"){
          $scope.noNetwork = true;  
        }

        if(networkType == "twoG"){
          $scope.twoG = true;  
        }
        if(networkType == "threeG"){
          $scope.threeG = true;  
        }
        if(networkType == "fourG"){
          $scope.fourG = true;  
        }
        if(networkType == "ethernet"){
          $scope.ethernet = true;  
        }
        if(networkType == "unknown"){
          $scope.unknown = true;  
        }
        function onOffline() {
         
          flagNetwork = 1;
       $state.go($state.$current, null, { reload: true });  
        }

        function onOnline() {
           flagNetwork = 2;
           $state.go($state.$current, null, { reload: true });  
         }


      
});


 function checkNetwork(){
  var networkSet = localStorage.getItem("networkSet"); 
 //alert(networkSet);
      if(networkSet == "true"){ 
           $scope.wifiAvailable = false; 
           $scope.noNetwork = false;
           $scope.twoG = false; 
           $scope.threeG = false;
           $scope.fourG = false;
           $scope.ethernet = false;
           $scope.unknown = false;    
        var type = $cordovaNetwork.getNetwork();

        var isOnline = $cordovaNetwork.isOnline();
          
        var isOffline = $cordovaNetwork.isOffline();
        
        var states = {};
        states[Connection.UNKNOWN]  = 'unknown';
        states[Connection.ETHERNET] = 'ethernet';
        states[Connection.WIFI]     = 'wiFi';
        states[Connection.CELL_2G]  = 'twoG';
        states[Connection.CELL_3G]  = 'threeG';
        states[Connection.CELL_4G]  = 'fourG';
        states[Connection.NONE]     = 'noNetwork';
        var networkType = states[type];
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, true);
        if(networkType == "wiFi"){
          $scope.wifiAvailable = true;  
        }
         if(networkType == "noNetwork"){
          $scope.noNetwork = true;  
        }

        if(networkType == "twoG"){
          $scope.twoG = true;  
        }
        if(networkType == "threeG"){
          $scope.threeG = true;  
        }
        if(networkType == "fourG"){
          $scope.fourG = true;  
        }
        if(networkType == "ethernet"){
          $scope.ethernet = true;  
        }
        if(networkType == "unknown"){
          $scope.unknown = true;  
        }

        function onOffline() {
         
          flagNetwork = 1;
       $state.go($state.$current, null, { reload: true });  
        }

        function onOnline() {
           flagNetwork = 2;
           $state.go($state.$current, null, { reload: true });  
         }
}
localStorage.removeItem("networkSet");
}        

if(flagNetwork == 1){
   $scope.wifiAvailable = false; 
   $scope.noNetwork = true;
   $scope.twoG = false; 
   $scope.threeG = false;
   $scope.fourG = false;
   $scope.ethernet = false;
   $scope.unknown = false; 
}

if(flagNetwork == 2){
           $scope.wifiAvailable = false; 
           $scope.noNetwork = false;
           $scope.twoG = false; 
           $scope.threeG = false;
           $scope.fourG = false;
           $scope.ethernet = false;
           $scope.unknown = false;   
        var type1 = $cordovaNetwork.getNetwork();
        var states1 = {};
        states1[Connection.UNKNOWN]  = 'unknown';
        states1[Connection.ETHERNET] = 'ethernet';
        states1[Connection.WIFI]     = 'wiFi';
        states1[Connection.CELL_2G]  = 'twoG';
        states1[Connection.CELL_3G]  = 'threeG';
        states1[Connection.CELL_4G]  = 'fourG';
        states1[Connection.NONE]     = 'noNetwork';
        //document.addEventListener("offline", onOffline, false);
        //document.addEventListener("online", onOnline, true);
        var networkType1 = states1[type1];
        
        if(networkType1 == "wiFi"){
          $scope.wifiAvailable = true;  
        }
         if(networkType1 == "noNetwork"){
          $scope.noNetwork = true;  
        }

        if(networkType1 == "twoG"){
          $scope.twoG = true;  
        }
        if(networkType1 == "threeG"){
          $scope.threeG = true;  
        }
        if(networkType1 == "fourG"){
          $scope.fourG = true;  
        }
        if(networkType1 == "ethernet"){
          $scope.ethernet = true;  
        }
        if(networkType1 == "unknown"){
          $scope.unknown = true;  
        }

}



 var sendMobileDataUrl = _baseUrl + "userService/" + "333234567" +"/saveDeviceAppId";
 var deviceAppId;
 if(localStorage.getItem("deviceAppId")){
  deviceAppId = localStorage.getItem("deviceAppId");
  
 }; 

 var userId = JSON.parse(localStorage.getItem("user")).userId; 
        var mobileData = {};
            mobileData['userId'] = userId;
            mobileData['deviceAppId'] = deviceAppId;
            mobileData['deviceType'] = "iphone";
            console.log(JSON.stringify(mobileData));

  var  responsePromise = $http.post(sendMobileDataUrl,mobileData, { cache: false });

        responsePromise.success(function(data, status, headers, config) {
          console.log(JSON.stringify(data));

       })
       
       responsePromise.error(function(data, status, headers, config) {
        console.log(JSON.stringify(data)); 

       })
    
$scope.profileData = JSON.parse(localStorage.getItem("user"));
$scope.imageAvailable = false;
$scope.takePicture = function() {
//	alert("take it");
    var options = { 
        quality : 100, 
        destinationType : Camera.DestinationType.FILE_URI, 
        sourceType : Camera.PictureSourceType.CAMERA, 
        encodingType: Camera.EncodingType.JPEG,
        //targetWidth: 100,
        //targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
    };
   var imagep;
    $cordovaCamera.getPicture(options).then(function(imageData) {
       var image = document.getElementById('imagetaken');
        image.src = imageData;
       $scope.imageAvailable = true;
       imagep = imageData;

       $scope.shareImage = function(){

          $cordovaSocialSharing.shareViaTwitter("message", imageData, null).then(function(result) {

                console.log(result);
              // Success! 
          }, function(err) {
            console.log(err);
              // An error occured. Show a message to the user
          });


       }
       
					
      $scope.sendImage = function(tickitNumber){
      var type = $cordovaNetwork.getNetwork();
      if(type == "none" ){
          alert("No Network Connection");
      }else{
      var tickitStatus = tickitNumber;
      var subject = document.getElementById("subject").value;
      var msgBody = document.getElementById("msgbody").value;
      var userName = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
      var dd = new Date();
      var currentHours = dd.getHours();
      var currentMin = dd.getMinutes();
      var currentSec = dd.getSeconds();

      if (currentHours < 10) {
                currentHours = "0" + currentHours;
            }
      if (currentMin < 10) {
                currentMin = "0" + currentMin;
            }
      if (currentSec < 10) {
                currentSec = "0" + currentSec;
            }      
    var tickittime = currentHours+":"+currentMin+":"+currentSec;
    
      if(subject == ""){
        subject = tickittime;
         }
          
         if(msgBody == ""){
        msgBody = userName;
        } 


        $cordovaGeolocation.getCurrentPosition({maximumAge: 7000, timeout: 15000, enableHighAccuracy: true}).then(function(position) {
                         console.log("Your Locations ");
                             console.log("Your latitude is " + position.coords.latitude);
                             var locationCord = position.coords.latitude + ";" + position.coords.longitude;
                             var options = new FileUploadOptions();
                                  options.fileKey="tickitFile";
                                  options.fileName=imageData.substr(imageData.lastIndexOf('/')+1);
                                 // options.fileName="Ashish";
                                  //options.mimeType = "multipart/form-data";
                                  options.contentType = "multipart/form-data";
                                  options.chunkedMode = false;
                                  options.mimeType="image/jpeg";
                                  options.httpMethod="POST";
                                  
                                  options.headers = {
                                            Connection: "close"
                                       };

                                  var userId = JSON.parse(localStorage.getItem("user")).userId;            
                                  
                                  var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
                                  
                                  
                                  var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
              
                                  console.log(manualTickitUrl);

                                   var params = new Object();
                                                  params.ownerId = userId;
                                                  params.tickitStatus = tickitStatus;
                                                  params.tickitType = 20;
                                                  params.recipient = "chris@abc.com";
                                                  params.subject = subject;
                                                  params.ip = "192.168.1.217";
                                                  //params.tickitCustomId = "55555";
                                                  //params.parentId = "null";
                                                  params.msgBody = msgBody;
                                                  params.gps =  locationCord;
                                                  
                                                  //params.startDate = null;
                                                  //params.endDate = null;
                                                  
                              
                                   options.params =  params;


                                    console.log(JSON.stringify(options));

                                    var ft = new FileTransfer();
                                    $scope.$parent.showLoader();
                                    ft.upload(imageData, manualTickitUrl, win, fail, options);
                                   
                                        
                                        }, function(err) {
                                          console.log(err);
                                        });
      }
	                   }
	                   
            }, function(err) {
            // An error occured. Show a message to the user
          });
  }
  
  $scope.deleteImage = function(){
	      $scope.imageAvailable = false;  
	}
	
	
	$scope.ticketupload = function(tickitNumber){

      var type = $cordovaNetwork.getNetwork();
      if(type == "none" ){
          alert("No Network Connection");
      }else{
         // alert("else");
          var tickitStatus = tickitNumber;
    var subject = document.getElementById("subject").value;
      var msgBody = document.getElementById("msgbody").value;
      var userName = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
     var dd = new Date();
      var currentHours = dd.getHours();
      var currentMin = dd.getMinutes();
      var currentSec = dd.getSeconds();

      if (currentHours < 10) {
                currentHours = "0" + currentHours;
            }
      if (currentMin < 10) {
                currentMin = "0" + currentMin;
            }
      if (currentSec < 10) {
                currentSec = "0" + currentSec;
            }      
    var tickittime = currentHours+":"+currentMin+":"+currentSec;
      var flag = 0;
      
      if(subject == ""){
        subject = tickittime;
         }
       
         if(msgBody == ""){
        msgBody = userName;
        } 
     
    
      $cordovaGeolocation.getCurrentPosition({desiredAccuracy:10, maxWait:15000, enableHighAccuracy: true}).then(function(position) {
                   console.log("Your latitude is " + position.coords.latitude);
                   console.log("Your latitude is " + position.coords.longitude);
                    var latitudeManual = position.coords.latitude;
                    var longitudeManual = position.coords.longitude;
                  // Position here: position.coords.latitude, position.coords.longitude
    var userId = JSON.parse(localStorage.getItem("user")).userId;           
    var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
    var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
    
    var form = new FormData();
    
           form.append('ownerId' , userId);
           form.append('tickitStatus' , tickitStatus);
           form.append('msgBody' , msgBody);
           form.append('tickitType' , "20");
           form.append('recipient' , "chris@abc.com");
           form.append('subject' , subject);
           form.append('ip' , "192.168.1.217");
           form.append('gps' , latitudeManual + ";" + longitudeManual);
           $scope.$parent.showLoader();
             $.ajax({
            url: manualTickitUrl,
            data: form,
            dataType: 'text',
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
              statusTimeDisplay();
              $scope.$parent.hideLoader();
            $scope.statussucess = true;
            $scope.imageAvailable = false;  
            $scope.main.sub = "";
            $scope.main.msg = "";
            //$state.transitionTo('tabs.ticket');    
            console.log(JSON.stringify(data));
            },
            error:function(data){
              $scope.$parent.hideLoader();
              $scope.stausFail = true;
              console.log(JSON.stringify(data));
              }
            });
      }, function(err) {
        console.log(err);
      });
      
      }

		
		}
	
	
	
	
  function win(r) {
				    statusTimeDisplay();
	          $scope.statussucess = true;
            $scope.$parent.hideLoader();
            $scope.imageAvailable = false;  
            $scope.main.sub = "";
            $scope.main.msg = "";
	          //$state.transitionTo('tabs.ticket');    
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            console.log(r.response);
          //  getUploadedImage();
        }

        function fail(error) {
            $scope.$parent.hideLoader();
            $scope.stausFail = true;
            alert("An error has occurred: Code = " + error.code);
            console.log(JSON.stringify(error));
        }
      

});
 
