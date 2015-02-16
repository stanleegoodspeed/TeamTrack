define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'backbonemixin',
  'reactboot'
  ], function($, _, Backbone, React, backboneMixin, ReactBoot){

    var HomePageClass = React.createClass({displayName: 'HomePageClass',

      mixins: [backboneMixin],
      render: function() {
        var Jumbotron = ReactBoot.Jumbotron;
        var Button = ReactBoot.Button;
        var Carousel = ReactBoot.Carousel;
        var CarouselItem = ReactBoot.CarouselItem;
        
        return (
          
              React.createElement(Jumbotron, null, 
                React.createElement("div", {className: 'my-container'}, 
                React.createElement("div", {className: 'wrap'}, 
                  React.createElement("h1", null, "Hello!"), 
                  React.createElement("p", null, "Welcome to TeamTrack, the simplest way to track all of your runners' performance metrics."), 
                  React.createElement("p", null, React.createElement(Button, {bsStyle: "primary", href: "#createrunner"}, "Create a Team"))
                )
                )
              )

        )
      }
    });

  
    var HomePageView = Backbone.View.extend({

      el: $('#mainContent'),
      events: {
      },

      initialize: function() {
      },

      render: function (){

        React.render(       
          React.createElement(HomePageClass, null),
          this.el
          );
      } 

    });

    return HomePageView;
  });
