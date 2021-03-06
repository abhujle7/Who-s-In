app.factory("AuthFactory", function($firebaseAuth) {
    var ref = new Firebase('https://boiling-fire-3161.firebaseio.com/')
    var auth = $firebaseAuth(ref);
    var users = ref.child('users')
    var emails = []
    var phoneNums = []
    var phoneToUserHash = {};
    users.once("value", function(allUsers) {
      for (var uid in allUsers.val()) {
        phoneToUserHash[allUsers.val()[uid].phone] = uid
      }
      allUsers.forEach(function(oneUser) {
        var phone = oneUser.child('phone').val();
        var email = oneUser.child('email').val();
        phoneNums.push(phone)
        emails.push(email)
      })
    })
    return {
      signUp: function(credentials) {
        console.log('this is cred in fac', credentials)
        return auth.$createUser({email: credentials.email, password: credentials.password})
        .then(function(user) {
          console.log('this is user in fac', user)
          user.name = credentials.name;
          user.phone = credentials.phone;
          user.email = credentials.email;
          console.log('this is user in fac post mods', user)
          users.child(user.uid).set({
            name: user.name,
            phone: user.phone,
            email: user.email,
            photo: 'https://stampaspot.com/Pics/default.jpeg'
          })
          console.log('is it failing before here')
          emails.push(credentials.email)
          phoneNums.push(credentials.phone)
          phoneToUserHash[credentials.phone.replace(/\D/, "")] = user.uid
          return user
        })
        .then(function(user) {
          var email = credentials.email;
          var password = credentials.password;
          return auth.$authWithPassword({
            email: email,
            password: password
          })
        })
        .catch(console.error) 
      },
      getCurrentUser: function() {
        return ref.getAuth()
      },
      signIn: function(credentials) {
        var email = credentials.email;
        var password = credentials.password;
        if (!auth.$authWithPassword({
          email: email,
          password: password
        })) {
          return "Invalid login"
        }
        else {
          return auth.$authWithPassword({
            email: email,
            password: password
          })   
        }
      },
      existingPhones: function() {
        return phoneNums
      },
      existingEmails: function() {
        return emails
      },
      phoneToUser: function() {
        return phoneToUserHash
      }
    }
  });