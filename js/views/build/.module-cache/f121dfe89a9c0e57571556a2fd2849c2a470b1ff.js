define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react'
  ], function($, _, Backbone, React){

    var SearchBar = React.createClass({displayName: 'SearchBar',

      getInitialState: function () {
        return {
          searchInput:'test'
        };
      },

      render: function() {

        return (
          
            React.createElement("div", {id: "searchBarComponent"}, 
            React.createElement("div", {className: 'input-group'}, 
              React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "glyphicon glyphicon-search"})), 
              React.createElement("input", {type: "text", className: "form-control", placeholder: "Search", value: this.state.searchInput})
            )
            )
          )
      }
    });

    return SearchBar;
  });
