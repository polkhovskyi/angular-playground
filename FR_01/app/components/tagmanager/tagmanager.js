(function () {
    'use strict';
    function tagmanagerController($scope, employeesService, teamsSyncService) {
        var ctrl = this;
        var _selected;
        var myDataPromise = employeesService.getData();
        ctrl.teamsSyncService = teamsSyncService;       

        ctrl.onSelect = function ($item, $model, $label) {
            addTeamMember($item, ctrl.pendingMembers);
            ctrl.selected = "";
        };

        ctrl.deleteMember = function (memberToDelete) {
            var index = ctrl.pendingMembers.indexOf(memberToDelete);
            ctrl.pendingMembers.splice(index, 1);
        }

        ctrl.filterByName = function filterByName(employees, typedValue) {
            return employees.filter(function (employee) {
                var matches_first_name = employee.name.indexOf(typedValue) != -1;
                var matches_job = employee.job.indexOf(typedValue) != -1;
                var matches_grade = employee.grade.indexOf(typedValue) != -1;
                return matches_first_name || matches_job || matches_grade;
            });
        };

        ctrl.syncTeams = function () {
            ctrl.selectedTeam.team.members = [];
            for (var i = 0; i < ctrl.pendingMembers.length; i++) {
                addTeamMember(ctrl.pendingMembers[i], ctrl.selectedTeam.team.members);
            }
        }

        myDataPromise.then(function (result) {
            ctrl.data = result;
        });

        function addTeamMember(teammember, source) {

            var exist = source.filter(function (member) {
                return member.id == teammember.id;
            });

            if (exist.length == 0) {
                source.push(teammember);
            }
        }

        $scope.$on("team.changed", function (event, value) {
            ctrl.pendingMembers = [];
            for (var i = 0; i < teamsSyncService.selectedTeam.team.members.length; i++) {
                addTeamMember(teamsSyncService.selectedTeam.team.members[i], ctrl.pendingMembers);
            }
        });

        $scope.$watch(function () { return teamsSyncService.selectedTeam; },
               function (value) {
                   ctrl.selectedTeam = value;
                   if (value == undefined || value.team == undefined) { return; }
                   if (value.team.members) {
                       ctrl.pendingMembers = [];
                       for (var i = 0; i < value.team.members.length; i++) {
                           addTeamMember(value.team.members[i], ctrl.pendingMembers);
                       }
                   } else {
                       ctrl.pendingMembers = [];
                   }
               }
       );
    }

    angular.module('app').component('tagmanager', {
        templateUrl: 'app/components/tagmanager/tagmanager.html',
        controller: tagmanagerController
    });
})();