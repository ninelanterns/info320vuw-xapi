Meteor.methods({
  'post'(data) {
    HTTP.post('https://v2.learninglocker.net/v1/data/xAPI/statements', {
      auth: 'f5cf6b34662d4a46b80e288f7650387e89a8ed72:e136c18f8d1e3c5a36fc3ffbfae6a2fdfabfae4c',
      headers: {
        'X-Experience-API-Version': '1.0.1',
      },
      data: data,

    }, function(err, result, status) {
      if (result) {
        console.log(result)
        return result
      }
      else {
        console.log(err + ' : ' + status + 'wubwbu');
      }
    });
  }
});
