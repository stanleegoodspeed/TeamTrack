define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'views/build/dropdownContainer'
  ], function($, _, Backbone, React, backboneMixin, DropdownContainer){


    var myParent = this;

    var CreateTeamClass = React.createClass({displayName: "CreateTeamClass",

      mixins: [backboneMixin],
      mixins: [React.addons.LinkedStateMixin],

      getInitialState: function () {
        return {
            teamName: '' ,
            dmnArray_Schools:[],
            dmnArray_States:[],
            schoolName: 'School',
            stateName:'State',
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
        this.props.onSchoolSelect({selectedDomain: val.selectedDomain});
        this.setState({schoolName:val.selectedDomain.children});
      },

      handleSelect_dmnStates: function(val) {
        
        this.props.onStateNameUpdate({stateName: val.selectedDomain.children});    
        this.setState({stateName:val.selectedDomain.children});

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

      componentDidMount: function() {
        this.loadDomainsFromServer();
        //this.props.schoolName = "Select School";
      },

     onTeamNameUpdate: function (e) {
      //this.setState({ teamName: e.target.value });
      this.props.onTeamNameUpdate({teamName: e.target.value});
     }, 

      render: function() {

        return (
        
        React.createElement("div", {className: "form-box-wrap"}, 
          React.createElement("div", {className: 'input-group form-field-sizes'}, 
            React.createElement("input", {className: 'form-control text-center', type: "text", placeholder: "Team name", onChange: this.onTeamNameUpdate})
          ), 
          React.createElement("div", {className: 'input-group form-field-sizes'}, 
            React.createElement(DropdownContainer, {dmnArray: this.state.dmnArray_States, menuTitle: this.state.stateName, onDomainSelect: this.handleSelect_dmnStates})
          ), 
          React.createElement("div", {className: 'input-group form-field-sizes'}, 
            React.createElement(DropdownContainer, {disabled: this.state.disableDropdown, dmnArray: this.state.dmnArray_Schools, menuTitle: this.state.schoolName, onDomainSelect: this.handleSelect_dmnSchools})
          )
        )
  
        )
    }
  });
    
  return CreateTeamClass;

  });

