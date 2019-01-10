import React, { Component } from 'react';

class LoginForm extends React.Component {
  render() {
    return (
      <div> 
        INPUT TEXT
        <input 
          type="text" 
          name={this.props.formName} 
          placeholder={this.props.placeholder} />
      </div>
    )
  }
}

export default LoginForm;
