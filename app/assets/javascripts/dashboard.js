//= require jquery
//= require jquery_ujs
//= require angular

var app = angular.module("myApp", []);

app.controller("setup",function($rootScope,$http,$compile){

  $rootScope.logged_in_user = document.getElementById("pname").textContent;

  
  $http.get(url="http://localhost:3000/api/v1/users?name=" + $rootScope.logged_in_user)
  .then(function(response){

  
    $rootScope.id   = response.data["data"]["id"];


    var other_users = response.data["data"]["other_users"];

    var ul = document.getElementsByClassName("contacts")[0];



    for(var i = 0 ; i < other_users.length ; i++ )
    {

      var div1 = document.createElement("div");

      var div2 = document.createElement("div");

      var div3 = document.createElement("div");

      div1.className = "container";
      div2.className = "contacts-pic"
      div3.className = "name"

      div3.textContent = other_users[i].name;

      div1.appendChild(div2);

      div1.appendChild(div3);

      div1.setAttribute("ng-click","fetchConversations('"+other_users[i].name+"',"+other_users[i].id+")");

      $compile(div1)($rootScope);

      ul.appendChild(div1);
    }

  });

});




app.controller("user", function($scope,$rootScope,$http,$interval) {


  var len;

  function fetchMessages(id)
  {
    
    $http.get(url="http://localhost:3000/api/v1/messages?conv_id=" + $scope.conv_id)
    .then(function(response) {


       if(len != response.data["data"].length)
       {
              
          var diff = response.data["data"].length - len;

          len = response.data["data"].length;

          var messages = response.data["data"].slice(-diff);

          var ul = document.getElementsByClassName("chat-space")[0];


          for(var i = 0 ; i < messages.length ; i++)
          {

            var div1 = document.createElement("div");
            var p = document.createElement("p");

            p.textContent = messages[i]["body"];


            if($rootScope.id == messages[i]["user"])

              div1.className = "sender-text";

            else

              div1.className = "received-text";


            div1.appendChild(p);

            ul.appendChild(div1);

          }

          var objDiv = document.getElementsByClassName("chat-space")[0];

          objDiv.scrollTop = objDiv.scrollHeight;

        }

      });

  }


  $scope.sendMsg = function(){

    if($scope.conv_id != undefined)
    {
      var message = {
        "user": $rootScope.id,
        "conversation": $scope.conv_id,
        "body": $scope.body,
      }

      document.getElementById("name").value = "";
      // console.log(message);

      $http.post(url="http://localhost:3000/api/v1/messages",data=message);
  
    }

  }


  function deleteMessages()
  {

      var myNode = document.getElementsByClassName("chat-space");
      
      while (myNode.firstChild)
        
        myNode.removeChild(myNode.firstChild);
  }


  var stop = null;

  
  $rootScope.fetchConversations = function(name,id){

    $interval.cancel(stop);

    deleteMessages();

    document.getElementById("selected_user").textContent = name;

    len = 0;

    $http.get("http://localhost:3000/api/v1/conversations?id1="+$rootScope.id + "&id2="+id)
    .then(function(response){

      console.log(response.data["data"]);

      $scope.conv_id = response.data["data"];


      var len = 0;

      stop = $interval(fetchMessages,1000,0,true,$scope.conv_id);

    });

  }


});



  

// app.controller("login", function($scope){

// });