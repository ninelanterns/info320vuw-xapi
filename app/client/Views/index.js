Template.index.events({
  'click #test': function() {
    var data = Meteor.call('getData');
    console.log(data);
  }
})
