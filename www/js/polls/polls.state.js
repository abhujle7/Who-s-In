app.config(function($stateProvider) {
  $stateProvider
  .state('tab.polls', {
    cache: false,
    url: '/polls/:eventid',
    views: {
      'pollsView': {
        templateUrl: 'js/polls/createNewPoll.html',
        controller: 'PollsCtrl'
      }
    },
    resolve: {
      eventDetails: function ($stateParams, EventFactory) {
        return EventFactory.get($stateParams.eventid)
      }


    }
  })
});