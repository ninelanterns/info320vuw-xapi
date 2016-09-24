Meteor.startup(function() {
  if (Users.find({}).count() === 0) {
    Users.insert({
      fname: 'Liam',
      lname: 'Murphy',
      email: 'Liam@example.com'
    });
  }
});
