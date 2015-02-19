define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'views/build/searchbar',
  'views/build/runnertable',
  'collections/runners',
  'reactboot'
  ], function($, _, Backbone, React, backboneMixin, SearchBar, RunnerTable, RunnerCollection, ReactBoot){

    var RunnerListMaster = React.createClass({displayName: 'RunnerListMaster',

      mixins: [backboneMixin],

      getInitialState: function () {
        return {
            selectedRunners:[] 
        };
      },

      handleSubmit: function() {
        swal({title:"", text: "Done! You've successfully created a new team.", type:"success", timer: 2000 });
      },

      populateList: function() {
        
          masterModel = new RunnerCollection();

          masterModel.fetch({
            success: function (response) {
              console.log("Success fetch runners list!");
            },
            error: function(model,response,xhr) {
              console.log("Error fetch runners list");
              console.log(response);
              console.log(xhr);        
            }
          });

      },

      componentDidMount: function() {
        this.populateList();
      },

      render: function() {
        var Button = ReactBoot.Button;
        
        return (
          React.createElement("div", {className: 'my-container'}, 
            React.createElement("div", {className: 'wrap'}, 
              React.createElement(SearchBar, null), 
              React.createElement("div", {className: 'runner-table-div'}, 
                React.createElement(RunnerTable, {selectedRunners: this.state.selectedRunners, runners: this.props.collection, onTeamSubmit: this.handleTeamSubmit})
              ), 
              React.createElement("br", null), 
              React.createElement(Button, {bsStyle: "primary", bsSize: "large", block: true, onClick: this.handleSubmit}, "Create Team")
            )
          )
        )
      }
    });

    var RunnerListView = Backbone.View.extend({
      
      el: $('#mainContent'),
      events: {
          // none
        },

        initialize: function() {
         
          masterModel = new RunnerCollection();

          masterModel.fetch({
            success: function (response) {
              console.log("Success fetch runners list!");
            },
            error: function(model,response,xhr) {
              console.log("Error fetch runners list");
              console.log(response);
              console.log(xhr);        
            }
          });
        },

        render: function (){
        
        React.render(       
          React.createElement(RunnerListMaster, {collection: masterModel}),
          this.el
          );
      } 

    });

    return RunnerListView;
  });
