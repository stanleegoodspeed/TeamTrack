define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'models/createRunnerModel',
  'reactboot',
  'views/build/dropdownContainer'
  ], function($, _, Backbone, React, backboneMixin, CreateRunnerModel, ReactBoot, DropdownContainer){

    //var dmnArray_Schools = [];
    //var dmnArray_States = [];
    //var stateSelect = "Select state";
    //var schoolSelect = "Select school";

    var CreateRunnerMaster = React.createClass({displayName: 'CreateRunnerMaster',

      mixins: [backboneMixin],
      mixins: [React.addons.LinkedStateMixin],

      getInitialState: function () {
        return {
            firstName: '',
            lastName: '',
            schoolName: 'Select school',
            stateName:'Select state',
            dmnArray_Schools:[],
            dmnArray_States:[] 
        };
      },

      // Load Dmns for dropdowns
      loadDomainsFromServer: function() {
        
        var test = "test1";
        $.ajax({
          url:"api/index.php/dmnSchools",
          type:"GET",
          async:false,
          success:function(data){
           this.setState({dmnArray_Schools: data});
         }.bind(this),     
         dataType:"json"
        });

        $.ajax({
          url:"api/index.php/dmnStates",
          type:"GET",
          async:false,
          success:function(data){
            this.setState({dmnArray_States: data});
          }.bind(this),     
          dataType:"json"
        });

      },

      handleSubmit: function() {

        var myRunner = new CreateRunnerModel({'fName':this.state.firstName, 'lName':this.state.lastName, 'sName':this.state.schoolName});

        myRunner.save(null, {
          success:function(model, response) {
            swal({title:"", text: "Successfully created new runner!", type:"success", timer: 2000 });
          },
          error: function(model, error) {
            sweetAlert("Oops!", "An error occured while creating a new runner!", "error");
            console.log(error);
          }
        });
      },

      handleSelect_dmnSchools: function(selectedDomain) {
        var myTest = selectedDomain;
        //this.setState({ schoolName: this.props.dmnArray_Schools[i].description });
      },

      handleSelect_dmnStates: function(selectedDomain) {
        var myTest = selectedDomain;
        //this.setState({ stateName: this.props.dmnArray_States[i].description });
      },

      // Called immediately when the React class is rendered
      componentDidMount: function() {
        this.loadDomainsFromServer();
      },

      render: function() {

        var MenuItem = ReactBoot.MenuItem;
        var DropdownButton = ReactBoot.DropdownButton;
        
        return (
          React.createElement("div", {className: 'my-container'}, 
            React.createElement("div", {className: 'wrap'}, 
            React.createElement("form", {role: "form"}, 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "First name"), 
                React.createElement("input", {type: "text", className: "form-control", valueLink: this.linkState('firstName')})
              ), 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Last name"), 
                React.createElement("input", {type: "text", className: "form-control", valueLink: this.linkState('lastName')})
              ), 
              React.createElement("div", {className: "form-group"}, 

                React.createElement("label", null, "State"), React.createElement("br", null), 
                React.createElement(DropdownContainer, {dmnArray: this.state.dmnArray_States, menuTitle: "Please select state", onDomainSelect: this.handleSelect_dmnStates})

              ), 
              React.createElement("div", {className: "form-group"}, 

                React.createElement("label", null, "School"), React.createElement("br", null), 
                React.createElement(DropdownContainer, {dmnArray: this.state.dmnArray_Schools, menuTitle: "Please select school", onDomainSelect: this.handleSelect_dmnSchools})

              ), 
              React.createElement("div", null, 
                React.createElement("button", {className: "btn btn-primary", onClick: this.handleSubmit}, "Submit")
              )
            )
            )
          )
        )
      },

      // No longer used - leave as an example
      onFirstNameChange: function (e) {
        this.setState({ firstName: e.target.value });
      }   

    });
    
    var CreateRunnerView = Backbone.View.extend({
    
      el: $('#mainContent'),
      events: {
      },

      initialize: function() {  
 
      },

      render: function (){
        
        React.render(       
          React.createElement(CreateRunnerMaster, null),
          this.el
        );
      } 
    });

    return CreateRunnerView;
  });

