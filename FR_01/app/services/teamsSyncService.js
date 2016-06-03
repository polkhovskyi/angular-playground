var app = angular.module('app');
app.service('teamsSyncService', function () {
    var _teams = [];
    var _selectedTeam;
    return {
        teams: _teams,
        selectedTeam: _selectedTeam
    }
});
