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
      mixins: [React.addons.LinkedStateMixin],

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
        myParent = this;

        myTeam.save(null, {
          success:function(model, response) {
            var str = "#selectrunners/" + response;
            swal({title:"", text: "Successfully created new team!", type:"success", timer: 2000 }); 

            // Go to 'Select runners' page
            window.location.href = str;
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
        $("#bufferDiv").show();
      },

      render: function() {

        var Button = ReactBoot.Button;
        var ButtonGroup = ReactBoot.ButtonGroup;

        var btnBlockBuffer = {paddingTop: 100};
        var myWidth = $(".wrap").width() / 2;
        var wrapWidth = {width:myWidth};
        
        return (
        
        React.createElement("div", null, 
          React.createElement("div", {className: 'input-group margin-bottom-sm'}, 
            React.createElement("span", {className: 'input-group-addon'}, React.createElement("i", {className: 'fa fa-envelope-o fa-fw'})), 
            React.createElement("input", {className: 'form-control', type: "text", placeholder: "Email address"})
          ), 

          React.createElement("div", {className: 'input-group'}, 
            React.createElement("span", {className: 'input-group-addon'}, React.createElement("i", {className: 'fa fa-key fa-fw'})), 
            React.createElement("input", {className: 'form-control', type: "password", placeholder: "Password"})
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


// <div className={'my-container'}>
//             <div className={'wrap'}>
//             <form role="form">
//               <div className={"form-group"}>
//                 <label>Team Name</label>
//                 <input type="text" className={"form-control"} valueLink={this.linkState('teamName')} />
//               </div>
//               <div className={"form-group"}>
//                 <label>State</label><br/>
//                 <DropdownContainer dmnArray={this.state.dmnArray_States} menuTitle={this.state.stateName} onDomainSelect={this.handleSelect_dmnStates} />
//               </div>
//               <div className={"form-group"}>
//                 <label>School</label><br/>
//                 <DropdownContainer id="schoolDropdown" disabled={this.state.disableDropdown} dmnArray={this.state.dmnArray_Schools} menuTitle={this.state.schoolName} onDomainSelect={this.handleSelect_dmnSchools} />
//               </div>   
//               <ButtonGroup style={btnBlockBuffer}>
//                 <Button bsStyle="primary" bsSize="large" style={wrapWidth} onClick={this.handleSubmit}>Save</Button>
//               </ButtonGroup>
//             </form>       
//             </div>          
//           </div>

