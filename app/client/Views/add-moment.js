Template.addmoment.onCreated(function (){
  //code runs once template is loaded

});
Template.addmoment.events({
  'change #activities': function(a,b) {
    var selected = $('#activities').val();
  }
});
