import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.main.onCreated(function () {
  // code here
});

Template.main.helpers({
  //example helpers

  // functionName() {
  // code here
  // },
});

Template.main.events({
  //This event fires when user clicks 'submit' button.
  'click #submit'(event, instance) {
    var stmt = {
      id: "cbfbd17a-a243-4ee5-8723-28c0714b373a",
      actor: {
        name : "Liam Murphy",
        mbox : "mailto:liam@example.com"
      },
      verb: {
        id: "http://adlnet.gov/expapi/verbs/experienced",
        display: { "en-US" : "confirmed" }
      },
      object: {
        definition: {
          description: { "en-US" : "App submits to LRS" }
        },
        objectType: 'Activity',
        id: 'http://www.LRS.com/test4'
      }
    };
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
  Meteor.call('post', stmt1, function(error, result) {
    //callback function
    debugger;
  });
  },
});
