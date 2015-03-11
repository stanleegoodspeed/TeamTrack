define(
  [
  'jquery',
  'underscore',
  'react',
  'reactboot',
  ], function($, _, React, ReactBoot){

    var TeamsTable = React.createClass({
       
      handleSelect: function() {
              
      },

      render: function() {
        var PanelGroup = ReactBoot.PanelGroup;
        var Panel = ReactBoot.Panel;
        
        return (
            
            <div id="teamsTableComponent">
             <PanelGroup defaultActiveKey='1' accordion>
                
                {this.props.myteams.map(function(team, i) {
                      return (<Panel eventKey={i} header={team.teamName}>
                                test {i}
                              </Panel>);
                    },this)}
             </PanelGroup>
            </div>              
          )
      }
    });

    return TeamsTable;
});

