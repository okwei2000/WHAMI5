var _baseUrl = "http://dev.tickittaskit.com/flippadoo/mobile/"
//var _baseUrl = "http://192.168.1.217:8080/flippadoo/mobile/"

ionicApp.controller('MainCtrl', function($scope,$rootScope ,$ionicLoading,geoLocationService) {
$scope.showLoader = function (){
								$ionicLoading.show({
							     content: '<h1><i class="icon ion-refreshing"></i></h1>',
							      animation: 'fade-in',
							      showBackdrop: true,
							      maxWidth: 200,
							      showDelay: 50
							    });
 							}
 $scope.hideLoader = function (){
							$ionicLoading.hide();
						}

});    


ionicApp.controller('HomeTabCtrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs ,geoLocationService,friendlist,$cordovaSocialSharing,$cordovaCamera,$cordovaNetwork){
	//$scope.$parent.turnOnAuto();
    //$scope.$parent.showLoader();
    //$scope.$parent.hideLoader();

    var buttonShow = localStorage.getItem("buttonShow",true); 
    
    if(buttonShow == null){
    	$scope.showFrndDisable = true;
    	$scope.showFrndButton = false;
    }else{
    	$scope.showFrndButton = true;
    	$scope.showFrndDisable = false;
    }
    
  
	$scope.hideback = true;
 
  $scope.putAsafeApply = function(fn) {
		var status = this.$root.$$phase;
		if(status == '$apply' || status == '$digest') {
		   if(fn && (typeof(fn) === 'function')) {
		    fn();
		 }
		 } else {
		this.$apply(fn);
		}
 };

    $scope.login = function() {
		var deviceId =  device.uuid ;
   	 var flag = 0;
     var emailId = document.getElementById("validateEmail").value;
	
   	 if(emailId == ""){
   	 alert("Please Enter Email Id");
   	 flag = 1;	
      }else{
        flag =0;
       }
      
   	 if(flag == 0){
   	 	var type = $cordovaNetwork.getNetwork();
      if(type == "none" ){
          alert("No Network Connection");
      }else{
	   var loginUrl = _baseUrl + "userService/" + "333234567" +"/login" ;
	   var logindata =  {};
	       logindata['emailId'] = emailId;
	       logindata['deviceId'] = deviceId;
	       logindata['deviceType'] = "iPhone";
	       
	   	   console.log(JSON.stringify(logindata));


	   	   	$scope.$parent.showLoader();
	        var  responsePromise = $http.post(loginUrl ,logindata,{ cache: false });
          responsePromise.success(function(data, status, headers, config) {
          console.log(JSON.stringify(data));
          var logindata = (JSON.stringify(data.user));
          if(data.status=='OK'){
   			localStorage.setItem("buttonShow",true);
   			localStorage.setItem("networkSet",true);  
			localStorage.setItem("user",logindata); 
            $state.transitionTo('tabs.ticket');  
            $scope.$parent.hideLoader();          
	      }else{
	      alert(data.error);
	      $scope.$parent.hideLoader();
		     }
	   })
	   
	   responsePromise.error(function(data, status, headers, config) {
	   	console.log(JSON.stringify(data));
	   	  alert("Server Error");
	        $scope.$parent.hideLoader();
	   })
	  }
	  } 
   }

	  $scope.showfriends = function(){
		friendlist.query();
		 }
  
 });

 

