'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    this.emit('SayHello');
  },
  'GetStatusIntent': function() {
    this.emit('GetStatus');
  },
  'GetStatus': function() {
    var project = this.event.request.intent.slots.project.value;
    var issue = this.event.request.intent.slots.issueNum.value;
    var phrase = util.format('%s %s', project, issue);
    this.response.speak(phrase)
      .cardRenderer(phrase);
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    console.log('Session ended with reason: ' + this.event.request.reason);
  },
  'AMAZON.StopIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    this.response.speak("You can try: 'alexa, ask jeera x the status of A.B.C. 1.2.5.'");
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    this.response.speak("Sorry, I didn't get that.");
    this.emit('AMAZON.HelpIntent');
  }
};
