// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
// import './main.html';

Template.main.onCreated(function () {
  // code here
});

Template.main.helpers({
  //example helper
  // functionName() {
  // code here
  // },
});

Template.main.events({
  //This event fires when user clicks 'submit' button.
  'click #submit'(event, instance) {
    var stmt1 = {
      id: "cbfbd17a-a543-3ee5-8723-26c0714b373a",
      actor: {
        name : "Mary Jane",
        mbox : "mailto:liam@example.com"
      },
      verb: {
        id : "https://www.LRS.xyz/verbs/delivered",
        display : { "en-US" : "delivered" }
      },
      object: {
        id : "https://www.LRS.xyz/objects/delivered-baby",
        objectType : "Activity",
        definition : {
          name : { "en-US" : "baby birth" },
          description : { "en-US" : "baby birth" }
        }
      },
      result: {
        score: {
          scaled: 0.80
        }
      },
      context : {
        extensions : {
          "https://wwww.LRS.xyz/context/time-pressure" : "emergency",
          "https://www.LRS.xyz/context/location" : "Taxi",
          "https://www.LRS.xyz/context/sub-activity" : "c-section",
          "http://www.LRS.xyz/context/reflection" : "text here",
          "http://www.LRS.xyz/context/people": ["paed", "obs reg", "anaes"]
        }
      },
      authority : {
        name : "Mary Jane",
        mbox : "mailto:liam@example.com"
      }
    };

  // Client passes through an xapi statement to the server/methods.js 'post' method.
  Meteor.call('post', stmt1, function() {
    //callback after statement has been submitted
  });
  },
});
