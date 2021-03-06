define(
  [
  'jquery',
  'underscore',
  'react',
  ], function($, _, React){

    var RunnerTeamsTable = React.createClass({displayName: "RunnerTeamsTable",
      
      render: function() {

        return (
            
            React.createElement("div", {className: "medium-table"}, 
              React.createElement("table", {className: "table table-responsive"}, 
              React.createElement("thead", null, 
                React.createElement("tr", null, 
                React.createElement("th", {className: "centered"}, "Team Name"), 
                React.createElement("th", {className: "centered"}, "Coach")
              )
              ), 
              React.createElement("tbody", null, 
                this.props.runnerTeams.map(function(team, j) {
                      return (React.createElement("tr", null, 
                                React.createElement("td", null, 
                                team.teamName
                                ), 
                                React.createElement("td", null, 
                                "Matt Martin"
                                )
                              ));
                    },this)
                )
              )
            )              
          )
      }
    });

    return RunnerTeamsTable;
});


