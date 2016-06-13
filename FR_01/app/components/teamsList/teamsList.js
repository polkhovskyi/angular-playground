(function () {
    'use strict';
    function teamsListController($rootScope, teamsSyncService) {
        this.newTeam = "";
        this.teams = teamsSyncService.teams;
        this.addTeam = function () {
            teamsSyncService.teams.push({ title: this.newTeam });
            this.newTeam = "";
        };

        this.opened = function (team, index) {
            teamsSyncService.changeTeam({ team: team, index: index });            
        };

        this.resetTeam = function () {
            teamsSyncService.changeTeam();
        }

        this.removeTeamMember = function (memberToDelete) {
            teamsSyncService.deleteMember(memberToDelete, true, true);
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