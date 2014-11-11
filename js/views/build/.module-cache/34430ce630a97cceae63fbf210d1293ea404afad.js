
define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'models/team'
  ], function($, _, Backbone, React, backboneMixin, MyModel){

    // Initialize the model here so it's scope can be reached in MyWidget
    var masterModel;

    var MyWidget = React.createClass({displayName: 'MyWidget',

      mixins: [backboneMixin],

      handleClick: function() {
        masterModel.set('name', 'pooo');
      },
      handleSweet: function() {
        sweetAlert("Oops...", "Something went wrong!", "error");
      },
      render: function() {

        return (
          React.createElement("div", {className: 'my-container'}, 
            React.createElement("div", {className: 'wrap'}, 
              React.createElement("ul", {className: 'nav nav-tabs'}, 
                React.createElement("li", {className: 'active'}, React.createElement("a", {href: "#"}, "John")), 
                React.createElement("li", null, React.createElement("a", {href: "#"}, "Han Solo"))
              ), 
              React.createElement("a", {href: "#", onClick: this.handleClick}, "Do song!"), 
              React.createElement("div", null, 
              React.createElement("button", {className: 'btn btn-primary', onClick: this.handleSweet}, "Popup sweet alert")
              ), 
              React.createElement("p", null, "Colin Cole Test"), 
              React.createElement("p", null, this.props.name)
            )
          )
          )
      }
    });

    var TeamListView = Backbone.View.extend({
      
      el: $('#mainContent'),
      events: {
          // none
      },

      initialize: function() {
        // Set the model 
        // TODO: Server call will go here to retreive list of all Runnners
        masterModel = new MyModel();
      },

      render: function (){

        React.render(       
          React.createElement(MyWidget, {model: masterModel}),
          document.getElementById('mainContent')
        );
      } 

      });

    return TeamListView;
  });