
define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backreact',
  'models/team'
  ], function($, _, Backbone, React, BackReact, MyModel){

    var model = new MyModel();

    var TeamModel = Backbone.Model.extend({
      defaults: {
        name: "Haddon Heights Boys XC"
      }
    });


    var MyWidget = React.createClass({displayName: 'MyWidget',
      handleClick: function() {
        alert('Hello!');
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
              React.createElement("p", null, this.props.model.name)
            )
          )
          )
      }
    });

    var TeamListView = Backbone.View.extend({

      
      
      el: $('#mainContent'),
      events: {

      },

      initialize: function() {
        //console.log('test');
        //React.createElement(MyWidget, null),
        //document.getElementById('mainContent')
      },

      render: function (){



        React.render(
          
        React.createElement(MyWidget, {model: TeamModel}),
        document.getElementById('mainContent')

          );
        } 

      });

    return TeamListView;
  });
