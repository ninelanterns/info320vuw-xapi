Meteor.methods({
  // validates user xapi statements and then submits them to LL LRS.
  'post'(data) {
    //Validates statements
    //

    //submits to LRS
    HTTP.post('https://v2.learninglocker.net/v1/data/xAPI/statements', {
      auth: 'f5cf6b34662d4a46b80e288f7650387e89a8ed72:e136c18f8d1e3c5a36fc3ffbfae6a2fdfabfae4c',
      headers: {
        'X-Experience-API-Version': '1.0.1',
      },
      data: data,
    });
  }
});
