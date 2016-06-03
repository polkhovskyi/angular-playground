(function () {
    'use strict';
    function teamsListController($rootScope, teamsSyncService) {
        this.newTeam = "";
        this.teams = teamsSyncService.teams;
        this.selectedTeam = teamsSyncService.selectedTeam;
        this.addTeam = function () {
            teamsSyncService.teams.push({ title: this.newTeam });
            this.newTeam = "";
        };

        this.opened = function (team, index) {
            teamsSyncService.selectedTeam = {team: team, index: index};
        };

        this.resetTeam = function () {
            teamsSyncService.selectedTeam = undefined;
        }

        this.removeTeamMember = function (memberToDelete) {
            var index = teamsSyncService.selectedTeam.team.members.indexOf(memberToDelete);
            teamsSyncService.selectedTeam.team.members.splice(index, 1);
            $rootScope.$broadcast("team.changed", "teamsListController");
        }
    }

    angular.module('app').component('teamsList', {
        templateUrl: 'app/components/teamsList/teamsList.html',
        controller: teamsListController,
        bindings: {
            title: '='
        }
    });
})();