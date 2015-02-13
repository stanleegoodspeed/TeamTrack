define(
  [
  'jquery',
  'underscore',
  'backbone',
  'react',
  'reactboot'
  ], function($, _, Backbone, React, ReactBoot){


    var DropdownContainer = React.createClass({displayName: 'DropdownContainer',
         
      render: function() {
        
        var myParent = this;

        function selectedDomainVal() {
          myParent.props.onDomainSelect({selectedDomain:this.children})
        }

        var MenuItem = ReactBoot.MenuItem;
        var DropdownButton = ReactBoot.DropdownButton;
        var rows = [];

        this.props.dmnArray.map(function(domainVal, i) {
          rows.push(React.createElement(MenuItem, {onSelect: selectedDomainVal, key: i}, domainVal.description))
        });

        return (    
           React.createElement(DropdownButton, {ref: "DropMenu", bsStyle: "primary", title: this.props.menuTitle, style: {width : 200}}, 
              rows
           )                     
        )
      }

    });

    return DropdownContainer;
  });
