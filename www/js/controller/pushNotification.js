var friendList = new Array ();

ionicApp.controller('sendPushNotificationCtrl', function($scope,friendlist,$state,$http,$cordovaDialogs) {
//$scope.friend.selected = {selected: true};
$scope.friends = friendlist.getList();
 

  $scope.selectedfrnd = function() {
    friendList = [];
$('#frndselect input[type=checkbox]:checked').each(function() {
        //$(this).val();
        friendList.push( Number ( $(this).val()  ) );
       });
  	 console.log(JSON.stringify(friendList));
	$state.transitionTo('tabs.sendPushNotification');
	  }	  


$scope.sendPushNotification = function(pushMsg){

var sendPushaUrl = _baseUrl + "userService/" + "333234567" +"/sendPushNotification";
 
  var userId = JSON.parse(localStorage.getItem("user")).userId; 
  var sendTo = JSON.stringify(friendList);
  console.log(sendTo);
        var pushNotificationData = {};
            pushNotificationData['senderId'] = userId;
            pushNotificationData['message'] = pushMsg;
            pushNotificationData['userId'] = friendList;
            console.log(JSON.stringify(pushNotificationData));
              $scope.$parent.showLoader();
  var  responsePromise = $http.post(sendPushaUrl,pushNotificationData, { cache: false });

        responsePromise.success(function(data, status, headers, config) {
        	friendList = [];
          console.log(JSON.stringify(data));
          if(status == 'OK' ){
            $scope.$parent.hideLoader();
          		function alertDismissed() {
				 $state.transitionTo('tabs.ticket');
					}

					navigator.notification.alert(
					    data.message,  // message
					    alertDismissed,         // callback
					    'Message',            // title
					    'Done'                  // buttonName
					);

          }else{
              $scope.$parent.hideLoader();
          	navigator.notification.alert(
					    data.message,  // message
					    alertDismissed,         // callback
					    'Message',            // title
					    'Done'                  // buttonName
					);
          }
         

       })
       
       responsePromise.error(function(data, status, headers, config) {
        console.log(JSON.stringify(data)); 
        $scope.$parent.hideLoader();
       });

       }
});
