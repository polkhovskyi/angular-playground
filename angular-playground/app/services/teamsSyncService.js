var app = angular.module('app');
app.service('teamsSyncService', function ($rootScope) {
    this.teams = [];
    this.selectedTeam;

    this.changeTeam = function (newTeam) {
        this.selectedTeam = newTeam;
    }

    this.deleteMember = function (memberToDelete, shouldBroadcast) {
        debugger;
        var deletionSource = this.selectedTeam.team.members;

        var index = deletionSource.indexOf(memberToDelete);
        deletionSource.splice(index, 1);

        if (shouldBroadcast) {
            this.broadcastTeammembersChange();
        }
    }

    this.addTeamMember = function (teammember, source) {

        var exist = source.filter(function (member) {
            return member.id == teammember.id;
        });

        if (exist.length == 0) {
            source.push(teammember);
        }
    }

    this.broadcastTeammembersChange = function () {
        $rootScope.$broadcast("team.changed", "");
    }

    this.sync = function (pendingMembers) {
        this.selectedTeam.team.members = [];
        for (var i = 0; i < pendingMembers.length; i++) {
            this.addTeamMember(pendingMembers[i], this.selectedTeam.team.members);
        }
    }
});
