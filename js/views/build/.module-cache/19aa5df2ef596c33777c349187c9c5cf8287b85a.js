define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'reactboot',
  ], function($, _, Backbone, React, backboneMixin, ReactBoot){

    var runnerId = -1;

    var RunnerProfileClass = React.createClass({displayName: 'RunnerProfileClass',

      mixins: [backboneMixin],
      mixins: [React.addons.LinkedStateMixin],

      getInitialState: function () {
        return {
            firstName: '',
            lastName: '',
            age: '',  
            stateName:'',
            schoolName: ''       
        };
      },

      // Load Dmns for dropdowns
      loadDomainsFromServer: function() {
        
        // $.ajax({
        //   url:"api/index.php/dmnStates",
        //   type:"GET",
        //   success:function(data){
        //     this.setState({dmnArray_States: data});
        //   }.bind(this),     
        //   dataType:"json"
        // });

      },

      // Called immediately when the React class is rendered - better option than passing in loaded domain arrays from via Backbone View
      componentDidMount: function() {
        this.loadDomainsFromServer();
      },

      render: function() {

        return (

          React.createElement("div", null, 
            React.createElement("h3", null, "Runner Profile"), 
            React.createElement("table", null, 
              React.createElement("tr", null, React.createElement("td", null, "Colin")), 
              React.createElement("tr", null, React.createElement("td", null, "Cole")), 
              React.createElement("tr", null, React.createElement("td", null, "24")), 
              React.createElement("tr", null, React.createElement("td", null, "Haddon Heights"))
            )
          )
        )
      }

    });
    
    var RunnerProfileView = Backbone.View.extend({
    
      el: $('#mainContent'),
      events: {
        
      },

      initialize: function(options) { 

          if(options)
          {
            runnerId = options.runnerId;
          }
        },

      render: function (){
        
        React.render(       
          React.createElement(RunnerProfileClass, null),
          this.el
        );
      } 
    });

    return RunnerProfileView;
  });
