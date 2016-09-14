Session.set('verb', false);
Session.set('circumstance', false);
Session.set('location', false);
Session.set('activityText', '...');
Session.set('verbText', '...');
Session.set('role', false);

Template.addmoment.onCreated(function (){
  //code runs once template is loaded

});
Template.addmoment.events({

  //this function occurs whenever the user selects an activity
  'change #activities': function() {
    //Arrays of verbs for the activities
    var Baby = ['select a verb','delivered','fed','bathed'];
    var Meeting = ['select a verb','attended','participated'];
    var Venepuncture = ['select a verb','Attempted','Completed','Failed'];

    //resets session variables, required in case the user changes their activity halfway through the input process that all fields reset correctly
    Session.set('verb', false);
    Session.set('circumstance', false);
    Session.set('location', false);
    Session.set('role', false);
    Session.set('verbText', '...');

    //gets the activity the user selected
    var selected = $('#activities').val();
    Session.set('activityText', selected);

    //Sets verb session variable to an array of verbs relating to the activity selected
    if (selected === 'Baby') {
    Session.set('verb',Baby);

      //Unhides location and circumstances div if user previously selected venepuncture activity
      $('#locationDiv').show();
      $('#circumstanceDiv').show();
      $('#roleDiv').show();
    }
    else if (selected === 'Meeting') {
      Session.set('verb',Meeting);

      //Unhides location and circumstances div if user previously selected venepuncture activity
      $('#locationDiv').show();
      $('#circumstanceDiv').show();
      $('#roleDiv').show();
    }
    else if (selected === 'Venepuncture') {
      Session.set('verb',Venepuncture);

      //Hides location and circumstances div since Venepuncture can be assumed to always happen in a doctors office or similar location under always similar contexts
      $('#locationDiv').fadeOut();
      $('#circumstanceDiv').fadeOut();
      $('#roleDiv').fadeOut();
    }
    else {
      Session.set('verb', false);
    }
  },

  //this function occurs whenever the user selects a verb
  'change #verb': function() {
    //Arrays of circumstances for the verbs
    var deliveredCircumstances = ['C-Section','Ventouse', 'Forceps', 'Vaginal','Emergency'];
    var attendedCircumstances = ['Professional development', 'Monthly meeting'];
    var AttemptedCircumstances = [];
    var error = ['Please select only a valid use case'];

    //Arrays of locations for verb / activities
    var deliveredLocations = ['Hospital', 'Vehicle (car etc.)', 'Other'];
    var meetingLocations = ['Place of employment', 'Town Hall'];

    //Arrays of roles that assist actor in verb / activity
    var deliveredRoles = ["paed", "obs reg", "anaes"];
    var meetingRoles = ["Alone", "With colleagues"];

    //resets session variables, required in case user changes verb of their activity midway through the input process
    Session.set('circumstance', false);
    Session.set('location', false);
    Session.set('role', false);

    //gets the verb the user selected
    var selected = $('#verb').val();
    Session.set('verbText', selected);

    //Sets circumstance session variable to an array of contexts relating to the activity / verb selected
    if (selected === 'delivered') {
      Session.set('circumstance', deliveredCircumstances);
      Session.set('location', deliveredLocations);
      Session.set('role', deliveredRoles);
    }
    else if (selected === 'attended') {
      Session.set('circumstance', attendedCircumstances);
      Session.set('location', meetingLocations);
      Session.set('role', meetingRoles);
    }
    else if (selected === 'Attempted') {
      Session.set('circumstance', AttemptedCircumstances);
    }
    else {
      Session.set('circumstance', error);
    }

  },
  //This function is called when user clicks 'save moment' button at bottom of page
  'click #submit-lm': function() {
    var verb = $('#verb').val();
    var object = $('#activities').val();
    var statementTemplate = {};

    //Hardcoded actor set to Mary Jane
    statementTemplate.actor = {
      name : "Mary Jane",
      mbox : "mailto:liam@example.com"
    };

    statementTemplate.verb = {
      id : "https://www.LRS.xyz/verbs/" + verb,
      display : { "en-US" : verb }
    };

    statementTemplate.object = {
      id : "https://www.LRS.xyz/objects/" + verb + "-" + object,
      objectType : "Activity",
      definition : {
        name : { "en-US" : object },
        description : { "en-US" : object }
      }
    };

    statementTemplate.result = {
      score: {
        //TODO make result come from the star rating
        scaled: 0.80
      }
    };

    //Like actor authority is hardcoded into the statement
    statementTemplate.authority = {
      name : "Mary Jane",
      mbox : "mailto:liam@example.com"
    };

    //Fills out the context depending on which type of statement it is. (Baby delivery / Attending a meeting / Attempting venepuncture)
    if ( verb === 'delivered') {

      var timePressure = $('#emergency') === true ? 'Emergency' : 'Elective';
      var location = $('#location').val();
      var reflection = $('#reflection').val() !== "" ? $('#reflection').val() : false;

      //This gets simply gets all values from the role checkboxes and maps them into an array
      var roles = $('input[name="role"]:checked').map(function() {
        return this.value;
      }).get();
      //If the array is empty (nobody helped the person) then the result is converted into more human friendly format
      roles = roles[0] === undefined ? "Completed task alone" : roles;

      statementTemplate.context = {
        extensions : {
          "https://wwww.LRS.xyz/context/time-pressure" : timePressure,
          "https://www.LRS.xyz/context/location" : location,
          "https://www.LRS.xyz/context/sub-activity" : "c-section",
          "http://www.LRS.xyz/context/reflection" : reflection,
          "http://www.LRS.xyz/context/people": roles
        }
      };
    }
    if (verb === 'attended') {
      var location = $('#location').val();
      var reflection = $('#reflection').val() !== "" ? $('#reflection').val() : false;

      var meetingType = $('input[name="circumstances"]:checked').map(function() {
        return this.value;
      }).get();
      meetingType = meetingType[0];

      //This gets simply gets all values from the role checkboxes and maps them into an array
      var roles = $('input[name="role"]:checked').map(function() {
        return this.value;
      }).get();
      roles = roles[0];

      statementTemplate.context = {
        extensions : {
          "https://www.LRS.xyz/context/location" : location,
          "https://www.LRS.xyz/context/meetingtype" : meetingType,
          "http://www.LRS.xyz/context/reflection" : reflection,
          "http://www.LRS.xyz/context/people": roles
        }
      };
    }
  if (verb === 'Attempted') {
    var reflection = $('#reflection').val() !== "" ? $('#reflection').val() : false;

    statementTemplate.context = {
      extensions : {
        "http://www.LRS.xyz/context/reflection" : reflection
      }
    };
  }
  console.log(statementTemplate);
  // Client passes through the statement to the server/methods.js 'post' method.
  Meteor.call('post', statementTemplate, function() { console.log('submitted'); });

}
});

Template.addmoment.helpers({
  // returns a string of the activity that is displayed in the 'statement viewer'
  activityText: function() {
    return Session.get('activityText');
  },
  // returns a string of the verb that is displayed in the 'statement viewer'
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
  },
  locationOptions: function() {
    return Session.get('location');
  },
  roleOptions: function() {
    return Session.get('role');
  }

});
