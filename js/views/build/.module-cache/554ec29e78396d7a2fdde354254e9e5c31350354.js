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
          searchInput:''
        };
      },

      render: function() {

        return (
          
            React.createElement("div", {id: "searchBarComponent"}, 
            React.createElement("div", {className: 'input-group'}, 
              React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "glyphicon glyphicon-search"})), 
              React.createElement("input", {type: "text", className: "form-control", placeholder: "Search", value: this.state.searchInput, onChange: this.onSearchChange, placeholder: "Search by last name"})
            )
            )
          )
        },

      onSearchChange: function (e) {
        this.setState({ searchInput: e.target.value });
        this.props.onSearch({searchTerm: e.target.value});
      }  

    });

    return SearchBar;
  });