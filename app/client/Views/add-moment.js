Template.addmoment.onCreated(function (){
  //code runs once template is loaded

});
Template.addmoment.events({
  //this function occurs whenever the user selects an activity
  'change #activities': function(a,b) {
    var selected = $('#activities').val();
  }
});
