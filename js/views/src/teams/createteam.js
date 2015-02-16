define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'models/createTeamModel',
  'reactboot',
  'views/build/dropdownContainer'
  ], function($, _, Backbone, React, backboneMixin, CreateTeamModel, ReactBoot, DropdownContainer){

    var CreateTeamMaster = React.createClass({

      mixins: [backboneMixin],

      getInitialState: function () {
        return {
            teamName: '' ,
            dmnArray_Schools:[],
            dmnArray_States:[],
            schoolName: 'Select school',
            stateName:'Select state',
            disableDropdown: 1,
            schoolCode:''
        };
      },

      // Load Dmns for dropdowns
      loadDomainsFromServer: function() {
        
        $.ajax({
          url:"api/index.php/dmnStates",
          type:"GET",
          success:function(data){
            this.setState({dmnArray_States: data});
          }.bind(this),     
          dataType:"json"
        });

      },

      handleSelect_dmnSchools: function(val) {
        this.setState({schoolName: val.selectedDomain.children});
        this.setState({schoolCode: val.selectedDomain.domainCode});
      },

      handleSelect_dmnStates: function(val) {
        this.setState({ stateName: val.selectedDomain.children});

        // Load School dropdown after state is selected
        $.ajax({
          url:"api/index.php/dmnSchools/" + val.selectedDomain.domainCode,
          type:"GET",
          success:function(data){

            this.setState({disableDropdown: 0});
            this.setState({dmnArray_Schools: data});

          }.bind(this), 
          error:function(err) {

            console.log('error retrieving school dropdown');
            console.log(err);
          },   
         dataType:"json"
        });

      },

      handleSubmit: function() {

        myTeam = new CreateTeamModel({'tName':this.state.teamName, 'sCode':this.state.schoolCode});
        
        myTeam.save(null, {
          success:function(model, response) {
            swal({title:"", text: "Successfully created new team!", type:"success", timer: 2000 });
          },
          error: function(model, error) {
            sweetAlert("Oops!", "An error occured while creating a new team!", "error");
            console.log(error);
          }
        });
      },

      componentDidMount: function() {
        this.loadDomainsFromServer();
      },

      render: function() {
        
        return (
          <div className={'my-container'}>
            <div className={'wrap'}>
            <form role="form">
              <div className={"form-group"}>
                <label>Team Name</label>
                <input type="text" className={"form-control"} value={this.props.teamName} onChange={this.onTeamNameChange} />
              </div>
              <div className={"form-group"}>
                <label>State</label><br/>
                <DropdownContainer dmnArray={this.state.dmnArray_States} menuTitle={this.state.stateName} onDomainSelect={this.handleSelect_dmnStates} />
              </div>
              <div className={"form-group"}>
                <label>School</label><br/>
                <DropdownContainer id="schoolDropdown" disabled={this.state.disableDropdown} dmnArray={this.state.dmnArray_Schools} menuTitle={this.state.schoolName} onDomainSelect={this.handleSelect_dmnSchools} />
              </div>   
              <div className={"text-center"}>
                <button className={"btn btn-primary"} onClick={this.handleSubmit}>Submit</button>
              </div>
            </form>       
            </div>          
          </div>
        )
      },

      onTeamNameChange: function (e) {
        this.setState({ teamName: e.target.value });
      }

    });
    
    var CreateTeamView = Backbone.View.extend({
    
      el: $('#mainContent'),
      events: {
      },

      initialize: function() {          
      },

      render: function (){
        
        React.render(       
          <CreateTeamMaster/>,
          this.el
        );
      } 
    });

    return CreateTeamView;
  });

