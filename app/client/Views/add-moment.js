Session.set('verb', false);

Template.addmoment.onCreated(function (){
  //code runs once template is loaded

});
Template.addmoment.events({
  //this function occurs whenever the user selects an activity
  'change #activities': function(a,b) {
    //Arrays of verbs for the app
    var Babybirth = ['select a verb','delivered','fed','bathed'];
    var Meeting = ['select a verb','attended','participated'];
    var Venepuncture = ['select a verb','Attempted','Completed','Failed'];

    //gets the activity the user selected
    var selected = $('#activities').val();

    //Sets verb session equal to selected activity
    if (selected === 'Babybirth') {
      Session.set('verb',Babybirth);
    }
    else if (selected === 'Meeting') {
      Session.set('verb',Meeting);
    }
    else if (selected === 'Venepuncture') {
      Session.set('verb',Venepuncture);
    }
    else {
      Session.set('verb', false);
    }
  }
});
Template.addmoment.helpers({
  verbOptions: function() {
    return Session.get('verb');
  },

});
