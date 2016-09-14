Session.set('verb', false);
Session.set('circumstance', false);

Template.addmoment.onCreated(function (){
  //code runs once template is loaded

});
Template.addmoment.events({
  //this function occurs whenever the user selects an activity
  'change #activities': function() {
    //Arrays of verbs for the activities
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
  },
  //this function occurs whenever the user selects a verb
  'change #verb': function() {
    //Arrays of circumstances for the verbs
    var delivered = ['C-Section','Ventouse', 'Forceps', 'Vaginal','Emergency'];
    var attended = ['TypeOfMeeting1', 'TypeOfMeeting2'];
    var Attempted = [];
    var error = ['Please select only a valid use case'];

    //gets the verb the user selected
    var selected = $('#verb').val();
    console.log(selected);
    if (selected === 'delivered') {
      Session.set('circumstance', delivered);
    }
    else if (selected === 'attended') {
      Session.set('circumstance', attended);
    }
    else if (selected === 'Attempted') {
      Session.set('circumstance', Attempted);
    }
    else {
      Session.set('circumstance', error);
    }
  }
});
Template.addmoment.helpers({
  verbOptions: function() {
    return Session.get('verb');
  },
  circumstanceOptions: function() {
    return Session.get('circumstance');
  }

});
