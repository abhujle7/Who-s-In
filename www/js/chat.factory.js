app.factory('ChatFactory', function($firebase, RoomsFactory, $firebaseArray, $firebaseObject, AuthFactory) {

  var selectedRoomId;
  var chats;
  var ref = new Firebase('https://boiling-fire-3161.firebaseio.com/')
  var user = AuthFactory.getCurrentUser().uid
  var userRef = new Firebase('https://boiling-fire-3161.firebaseio.com/users/' + user)
  var userObj = $firebaseObject(userRef)

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.$remove(chat)
      .then(function (ref) {
        ref.key() === chat.$id;
      });
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    getRoomId: function () {
      return selectedRoomId;
    },
    getSelectedRoomName: function () {
      var selectedRoom;
      if (selectedRoomId && selectedRoomId != null) {
          selectedRoom = RoomsFactory.get(selectedRoomId);
          if (selectedRoom)
              return selectedRoom.name;
          else
              return null;
      } else
          return null;
    },
    selectRoom: function (roomId) {
        selectedRoomId = roomId;
        chats = $firebaseArray(ref.child('messages').child(selectedRoomId));

        chats.$loaded(function(chatsList) {
          for (var i = 0; i < chatsList.length; i++) {
            var date = new Date(chatsList[i].timestamp);
            var minutes = String(date.getMinutes());
            if (minutes.length < 2) {
              minutes += "0";
            }
            chatsList[i].userFriendlyTime = date.getHours() + ":" + minutes;
          }
        })
    },
    send: function (message) {
        if (message) {
            var chatMessage = {
                user: user,
                from: userObj.name,
                message: message,
                timestamp: Firebase.ServerValue.TIMESTAMP
            };
            chats.$add(chatMessage).then(function (data) {
 

              chats.$loaded(function(chatsList) {
                  var i = chatsList.length - 1;
                  var date = new Date(chatsList[i].timestamp);
                  var minutes = String(date.getMinutes());
                  if (minutes.length < 2) {
                    minutes += "0";
                  }
                  chatsList[i].userFriendlyTime = date.getHours() + ":" + minutes;
              })
              // var date = new Date(data.timestamp);
              // var minutes = String(date.getMinutes());
              // if (minutes.length < 2) {
              //   minutes += "0";
              // }
              // data.userFriendlyTime = date.getHours() + ":" + minutes;
            })
            .catch(function(error) {
              console.error("Error:", error);
            })
        }
    },
    getMembers: function() {
      return $firebaseArray(ref.child('messages').child(selectedRoomId).child('members'))
    }
  };
});