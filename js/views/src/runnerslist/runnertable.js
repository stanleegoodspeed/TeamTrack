define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'views/build/runnertablerow',
  'reactboot',
  ], function($, _, Backbone, React, RunnerTableRow, ReactBoot){

    var tmpRunnersArray = [];
    var RunnerTable = React.createClass({
       
      handleSelect: function(i) {
        $($("#myTable tbody tr")[i]).toggleClass("info");;
        
        var myRunner = this.props.runners[i];
        tmpRunnersArray.push(myRunner);
        
        //var myRunner = this.props.runners[i];
      },

      handleMySubmit: function() {
        //tmpRunnersArray.toJSON();
        this.props.onTeamSubmit({teamRunners: tmpRunnersArray});
      },

      render: function() {
        var Table = ReactBoot.Table;

        var rows = [];
        this.props.runners.forEach(function(runner) {
            rows.push(<RunnerTableRow runner={runner} key={runner.id} />);
        });

        return (
            
            <div id="runnerTableComponent">
              <button className={"btn btn-primary"} onClick={this.handleMySubmit}>Submit</button>
              <Table id="myTable">
              <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>School</th>
              </tr>
              </thead>
              <tbody>
                {this.props.runners.map(function(runner, i) {
                      return (<tr onClick={this.handleSelect.bind(this, i)} key={i}>
                                <td>
                                {runner.firstName}
                                </td>
                                <td>
                                {runner.lastName}
                                </td>
                                <td>
                                {runner.schoolName}
                                </td>
                              </tr>);
                    },this)}
                </tbody>
              </Table>
            </div>              
          )
      }
    });

    return RunnerTable;
});


