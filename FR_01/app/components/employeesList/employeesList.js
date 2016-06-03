﻿(function () {
    'use strict';
    function employeesListController($rootScope, $scope, $http, employeesService, teamsSyncService) {
        var ctrl = this;
        var myDataPromise = employeesService.getData();
        ctrl.selectedTeam = undefined;
        ctrl.teamsSyncService = teamsSyncService;
        ctrl.gridOptions = {
            expandableRowScope: { scope: ctrl },
            enableRowHeaderSelection: false,
            enableExpandableRowHeader: false,
            expandableRowTemplate: '/app/components/employeesList/expandableRowTemplate.html',
            expandableRowHeight: 100,
            enableRowSelection: true,
            enableFiltering: true,
            enableSorting: true,
            multiSelect: false,
            noUnselect: true,
            modifierKeysToMultiSelect: false,
            columnDefs: [
              {
                  field: 'name', cellTooltip:
                  function (row, col) {
                      return 'Specialization: ' + row.entity.job + '; Grade: ' + row.entity.grade;
                  }, headerTooltip:
                  function (col) {
                      return 'Name';
                  }
              },
              { field: 'age' }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sort) {
                    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                })
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {
                        $scope.gridApi.expandable.collapseAllRows()
                        $scope.gridApi.expandable.expandRow(row.entity);
                    }
                });

            }
        };        

        ctrl.addTeamMember = function (teammember) {
            if (!ctrl.teamsSyncService.selectedTeam.team.members) {
                ctrl.teamsSyncService.selectedTeam.team.members = [];
            }

            addTeamMember(teammember, ctrl.teamsSyncService.selectedTeam.team.members);
            $rootScope.$broadcast("team.changed", "employeesListController");
        }

        function addTeamMember(teammember, source) {
            var exist = source.filter(function (member) {
                return member.id == teammember.id;
            });

            if (exist.length == 0) {
                source.push(teammember);
            }
        }

        $scope.$watch(function () { return teamsSyncService.selectedTeam; },
               function (value) {
                   ctrl.selectedTeam = value;
               }
        );

        myDataPromise.then(function (result) {
            ctrl.gridOptions.data = result;
        });
    }

    angular.module('app').component('employeesList', {
        templateUrl: "app/components/employeesList/employeesList.html",
        controller: employeesListController
    });
})();