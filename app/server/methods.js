Meteor.methods({
  // validates user xapi statements and then submits them to LL LRS.
  'post'(stmt) {

    //Validates statements
    console.log(stmt.object.id);
    console.log(stmt.verb.ib);
    //Checks user entered an object
    if (stmt.object.id === 'https://www.LRS.xyz/objects/null-...') {
      throw new Meteor.Error("You have not entered an object");
    }
    //Checks user entered a verb
    if (stmt.verb.id === 'https://www.LRS.xyz/verb/undefined') {
      throw new Meteor.Error("You have not entered an object");
    }

    stmt.id = Math.uuid();
    // submits to LRS
    HTTP.post('https://v2.learninglocker.net/v1/data/xAPI/statements', {
      //TODO: put key and secret in settings.json file and configure gitignore
      auth: '5b695ccc3e4607824152ff7f20b379457ebdeed9:202587af2b2f39d8d4032ac33e0a167433c96e32',
      headers: {
        'X-Experience-API-Version': '1.0.1',
      },
      data: stmt,
    }, function(err, result) {
    });
  },
  'updateInfo'(data) {
    var id = Users.find({}).fetch();
    id = id[0]._id;

    Users.update(id, {
        $set: {
          'fname': data.fname,
          'lname': data.lname,
          'email': data.email,
        }
  });
  }
});
