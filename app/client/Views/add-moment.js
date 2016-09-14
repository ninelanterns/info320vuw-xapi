Session.set('verb', false);
Session.set('circumstance', false);
Session.set('activityText', '...');
Session.set('verbText', '...');

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
    Session.set('activityText', selected);

    //Sets verb session variable to an array of verbs relating to the activity selected
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
    Session.set('verbText', selected);

    //Sets circumstance session variable to an array of contexts relating to the activity / verb selected
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
  activityText: function() {
    return Session.get('activityText');
  },
  verbText: function() {
    return Session.get('verbText');
  },
  //returns the array of possible verbs for the selected activity to the html page so that it can display them
  verbOptions: function() {
    return Session.get('verb');
  },
  //returns the array of possible circumstances for the selected activity / verb to the html page so that it can display them
  circumstanceOptions: function() {
    return Session.get('circumstance');
  }

});
