import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function () {

});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.main.events({
  //This event fires when user clicks 'submit' button.
  'click button'(event, instance) {
    var data = {
    id: "cbfbd87a-d394-43e5-8723-28c0718b377a",
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
    },
  };
  // Clientside passes through a xapi statement to methods.js post method.
  Meteor.call('post', data, function() {
    console.log('call finished');
  });

  },
});