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

    var CreateTeamMaster = React.createClass({displayName: 'CreateTeamMaster',

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
        this.setState({ schoolName: 'Select school' });
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
        $("#pageHeader").html("Step 2: Enter team attributes");
        $("#mainPageBar").show();
      },

      render: function() {

        var Button = ReactBoot.Button;
        var ButtonGroup = ReactBoot.ButtonGroup;
        var submitBtnStyle = {paddingTop: 100};
        var nextBtnStyle = {paddingTop: 30};
        
        return (
          React.createElement("div", {className: 'my-container'}, 
            React.createElement("div", {className: 'wrap'}, 
            React.createElement("form", {role: "form"}, 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Team Name"), 
                React.createElement("input", {type: "text", className: "form-control", value: this.props.teamName, onChange: this.onTeamNameChange})
              ), 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "State"), React.createElement("br", null), 
                React.createElement(DropdownContainer, {dmnArray: this.state.dmnArray_States, menuTitle: this.state.stateName, onDomainSelect: this.handleSelect_dmnStates})
              ), 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "School"), React.createElement("br", null), 
                React.createElement(DropdownContainer, {id: "schoolDropdown", disabled: this.state.disableDropdown, dmnArray: this.state.dmnArray_Schools, menuTitle: this.state.schoolName, onDomainSelect: this.handleSelect_dmnSchools})
              ), 
              React.createElement(ButtonGroup, {justified: true, style: submitBtnStyle}, 
                React.createElement(Button, {bsStyle: "primary", bsSize: "large", block: true, onClick: this.handleSubmit}, "Save"), 
                React.createElement(Button, {bsStyle: "success", bsSize: "large", block: true, href: "#selectrunners/2"}, "Next")
              )
            )
            )
          )
        )
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
          React.createElement(CreateTeamMaster, null),
          this.el
        );
      } 
    });

    return CreateTeamView;
  });

