define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'views/build/runnertablerow',
  'reactboot'
  ], function($, _, Backbone, React, RunnerTableRow, ReactBoot){

    var RunnerTable = React.createClass({displayName: 'RunnerTable',
       
      render: function() {
        var Table = ReactBoot.Table;

        var rows = [];
        this.props.runners.forEach(function(runner) {
            rows.push(React.createElement(RunnerTableRow, {runner: runner, key: runner.id}));
        });

        return (
          
            React.createElement("div", {id: "runnerTableComponent"}, 
              React.createElement(Table, {responsive: true}, 
                rows
              )
            )              
          )
      }
    });

    return RunnerTable;
  });
