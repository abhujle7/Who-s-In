app.config(function($stateProvider) {
  $stateProvider
  .state('app.tab.chat-pollDetail', {
    url: '/chat/:id/polls/:pollid/:eventid',
    views: {
      'roomsView': {
        templateUrl: 'js/polls/poll.detail.html',
        controller: 'PollsCtrl'
      }
    },
    resolve: {
      eventDetails: function ($stateParams, EventFactory) {
        return EventFactory.get($stateParams.eventid)
      },
      pollDetails: function ($stateParams, PollsFactory) {
        return PollsFactory.getPoll($stateParams.pollid)
      }
    }
  })
});