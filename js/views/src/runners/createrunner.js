define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'models/createRunnerModel',
  'reactboot',
  'views/build/dropdowncontainer',
  ], function($, _, Backbone, React, backboneMixin, CreateRunnerModel, ReactBoot, DropdownContainer){

    var CreateRunnerClass = React.createClass({

      mixins: [backboneMixin],
      mixins: [React.addons.LinkedStateMixin],

      getInitialState: function () {
        return {
            firstName: '',
            lastName: '',
            dmnArray_Gender:[],
            genderName: 'Select gender',
            schoolCode:''          
        };
      },

      // Load Dmns for dropdowns
      loadDomainsFromServer: function() {
        
        $.ajax({
          url:"api/index.php/dmnGender",
          type:"GET",
          success:function(data){
            this.setState({dmnArray_Gender: data});
          }.bind(this),     
          dataType:"json"
        });

      },

      handleSubmit: function() {

        var myParent = this;

        var myRunner = new CreateRunnerModel({'firstName':this.state.firstName, 'lastName':this.state.lastName, 'fk_schoolID':this.props.schoolCode, 'gender':this.state.genderName});
        myRunner.save(null, {
          success:function(model, response) {
            myParent.props.handleCreateRunner();
          },
          error: function(model, error) {
            
            console.log(error);
          }
        });   
      },

      handleSelect_dmnGender: function(val) {
        this.setState({ genderName: val.selectedDomain.children});
      },

      componentDidMount: function() {
        this.loadDomainsFromServer();
      },

      render: function() {

        return (

          <div className={"form-box-wrap"}>  
            <div className={'input-group form-field-sizes'}>
              <input className={'form-control text-center'} type="text" placeholder="First name" valueLink={this.linkState('firstName')} />
            </div>
            <div className={'input-group form-field-sizes'}>
              <input className={'form-control text-center'} type="text" placeholder="Last name" valueLink={this.linkState('lastName')} />
            </div>
            <div className={'input-group form-field-sizes'}>
              <DropdownContainer dmnArray={this.state.dmnArray_Gender} menuTitle={this.state.genderName} onDomainSelect={this.handleSelect_dmnGender} />
            </div>  
            <div className={'input-group form-field-sizes'}>
              <button className={'btn btn form-control form-save-btn'} onClick={this.handleSubmit}>Create Runner</button>
            </div>
          </div>
        )
      }
    });

    return CreateRunnerClass;

  });

