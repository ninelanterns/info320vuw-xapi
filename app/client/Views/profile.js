Template.profile.helpers({
  'name': function() {
    var user = Users.find({}).fetch();
    var fullname = user[0].fname + ' ' + user[0].lname;
    return fullname;
  },
  'fname': function() {
    var user = Users.find({}).fetch();
    return user[0].fname;
  },
  'lname': function() {
    var user = Users.find({}).fetch();
    return user[0].lname;
  },
  'email': function() {
    var user = Users.find({}).fetch();
    return user[0].email;
  }

});
