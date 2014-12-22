ionicApp.controller('gpsControler', function($scope,$cordovaDialogs,$rootScope ,$state,geoLocationService) {
	//alert("yes");
	var sDate = localStorage.getItem("startDate");
	var eDate = localStorage.getItem("endDate");
	$scope.startDate = sDate;
	$scope.endDate = eDate;
    //alert(gg);


$scope.colors = [
      {name:'5 Minute', value:  300000},
      {name:'10 Minute', shade: 600000},
      {name:'15 Minute', shade: 900000},
      {name:'20 Minute', shade: 1200000},
      {name:'25 Minute', shade: 1500000}
    ];


 $scope.saveDates = function ( sD ,eD){

 	      var timeInterVal  =  $('#timeInterVal').val();

 	      localStorage.setItem("timeInterVal" , timeInterVal);

	      if(  angular.isDefined(sD)){
			   
			   localStorage.setItem("startDate" , sD);
			   
			  
			  } else {
				  localStorage.setItem("startDate" , false);
				  
				  };
		  if(  angular.isDefined(eD) ){			
			localStorage.setItem("endDate" , eD);
			}else {
				
				localStorage.setItem("endDate" , false);
		  }
				
	var savedDates = {};
	     savedDates['endDate'] = 	eD ;
	     savedDates['startDate'] = sD ;
		//alert("22");
	   $rootScope.$broadcast("gpsSettingsChanged", savedDates);
	    geoLocationService.stop();
	 }
   
});


