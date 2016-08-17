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
  'click button'(event, instance) {

    console.log('hihih')
    var data = {
    id: "cbfbd87a-d394-43e5-8723-28c0718a377a",
    actor: {
      name : "Mary Jane",
      mbox : "mailto:mary@example.com"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/experienced",
      display: { "en-US" : "performed" }
    },
    object: {
      definition: {
        description: { "en-US" : "delivered a baby" }
      },
      objectType: 'Activity',
      id: 'http://www.LRS.com/test4'
    },
  };
  // Clientside passes through a xapi statement to methods.js post method.
  Meteor.call('post', data, function(err, result) {
    console.log('call finished,' + result)
  });

  },
});
