ionicApp.controller('friendlistctrl', function($scope,friendlist,$state,$cordovaContacts,$timeout) {

	$scope.sendMail = function(personEmailId,personName){
		
		$scope.personName = personName;
        window.plugin.email.isServiceAvailable(
            function (isAvailable) {
            	var emailId = JSON.parse(localStorage.getItem("user")).emailId;
            	var bodytext = "<p>Hi  " + personName + ",</p><p>I am using Whami - a fun and free app that enables you to find me on a map.</p><p>If you want to know where I am, use this map link:</p><p><a href='http://dev.tickittaskit.com/flippadoo/app/findMe/ " + emailId + "'>http://dev.tickittaskit.com/flippadoo/app/findMe/" + emailId + "</a></p><p>Thanks for following me</p>";
		       
                // alert('Service is not available') unless isAvailable;
                if(isAvailable){
 
                 window.plugin.email.open({
                     to:      [personEmailId],
                     cc:      [''],
                     bcc:     [''],
                     subject: 'Greetings',
                     body:    bodytext,
                     isHtml:  true
                 });

                }else{
                 alert("do not support");
                }
            }
        );
 }
	userDetail();
	var deviceContactEmail = [];
	var whamiUser = [];
	var nonWhamiUser = [];
	
	$scope.friends = friendlist.getList();
		function userDetail(){
		var whamiUserdetail = [];
		$scope.friends = friendlist.getList();	
	     var friendcheck = $scope.friends;
		 
		 var emailId = JSON.parse(localStorage.getItem("user")).emailId; 
		 		
		   angular.forEach(friendcheck, function(userValue) {
		   	var emailId = JSON.parse(localStorage.getItem("user")).emailId;
		   	console.log(userValue.emailId);
		   		if(emailId === userValue.emailId){
		   			whamiUserdetail.push(userValue);
		   		}
		   		$scope.whamiUserdetail = whamiUserdetail;
		   })
		   }
	$scope.showLocation = function(userId){
	alert(userId);
	$scope.$broadcast('map:userId',userId );
	$state.transitionTo('tabs.map'); 
	}
	var deviceContact;
	var options = { "fields":["emails", "phoneNumbers", "name"],"multiple":true};
				$cordovaContacts.find(options).then(function(result) {
					console.log(JSON.stringify(result));
				      $scope.phoneContact = result;
				      deviceContact = $scope.phoneContact;
				         emailCompare();
				       
				       
				    }, function(err) {
				      // Contact error
				      console.log(err);
				    });
				    
	
  function emailCompare(){
	  	var friendemail = $scope.friends;
	    var deviceContactEmail =  deviceContact;
	    //console.log(JSON.stringify(deviceContactEmail));
	    angular.forEach(deviceContactEmail, function(phonevalue) {
                    angular.forEach(friendemail, function(value) {
                        if (phonevalue.emails) {
                        	var phoneLowerCase = (phonevalue.emails[0].value).toLowerCase(); 
                          	var friendLowerCase = (value.emailId).toLowerCase();
                            if (phoneLowerCase === friendLowerCase) {
                                console.log(phonevalue.emails[0].value);
                                value.firstName = phonevalue.name.givenName;
                                value.lastName = phonevalue.name.familyName;
                                whamiUser.push(value);
                                deviceContactEmail = jQuery.grep(deviceContactEmail, function(value) {
							           return value != phonevalue;
							         });

                            }
                        }

                    })
                })

	    //$scope.noFriends = false;
	    $scope.nonWhamiUser = deviceContactEmail;
	    $scope.whamiUser = whamiUser;
	    
		}	

		$scope.doRefresh = function() {
      
      console.log('Refreshing!');
      $timeout( function() {
        //simulate async response
       
      $state.go($state.$current, null, { reload: true });  
      
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
		
		$scope.selectFriend = function() {
        $state.transitionTo('tabs.selectFriend');
         }      
	   $scope.settingPage = function() {
	     $state.transitionTo('tabs.setting');
	   }     

	   $scope.inviteFrnd = function() {
   
     $state.transitionTo('tabs.inviteFriend');
   }
	  $scope.backTofriend = function() {
   
     $state.transitionTo('tabs.friendlist');
   } 
   $scope.toHome = function() {
   
     $state.transitionTo('tabs.home');
   }  
			    
});

