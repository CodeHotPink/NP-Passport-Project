import React, { Component } from 'react';
import RegistrationModal from './RegistrationModal';

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            type: "password",
            states: new Array("Alabama", 
            "Alaska", 
            "Arizona", 
            "Arkansas", 
            "California", 
            "Colorado", 
            "Connecticut", 
            "Delaware", 
            "Florida", 
            "Georgia", 
            "Hawaii", 
            "Idaho", 
            "Illinois", 
            "Indiana", 
            "Iowa", 
            "Kansas", 
            "Kentucky", 
            "Louisiana", 
            "Maine", 
            "Maryland", 
            "Massachusetts", 
            "Michigan", 
            "Minnesota", 
            "Mississippi", 
            "Missouri", 
            "Montana", 
            "Nebraska", 
            "Nevada", 
            "New Hampshire", 
            "New Jersey", 
            "New Mexico", 
            "New York", 
            "North Carolina", 
            "North Dakota", 
            "Ohio", 
            "Oklahoma", 
            "Oregon", 
            "Pennsylvania", 
            "Rhode Island", 
            "South Carolina", 
            "South Dakota", 
            "Tennessee", 
            "Texas", 
            "Utah", 
            "Vermont", 
            "Virginia", 
            "Washington", 
            "West Virginia", 
            "Wisconsin", 
            "Wyoming")
        }
        this.openModalHandler = this.openModalHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.handleFirstChange = this.handleFirstChange.bind(this)
        this.handleLastChange = this.handleLastChange.bind(this)
        this.handleGenderChange = this.handleGenderChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this)
        this.handlePostalChange = this.handlePostalChange.bind(this)
        this.handleUsStateChange = this.handleUsStateChange.bind(this)
        this.createOptions = this.createOptions.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.showHide = this.showHide.bind(this)
        this.clearRegistrationForm = this.clearRegistrationForm.bind(this)
    }
    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }
    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }
    handleRegister(event) {
        event.preventDefault();
        this.registerUser()
        }
    registerUser() {
        fetch("http://localhost:5000/register_user", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({first:this.state.first,
                                last:this.state.last,
                                gender:this.state.gender,
                                birthday:this.state.birthday,
                                postal:this.state.postal,
                                userState:this.state.userState,
                                email:this.state.email,
                                password:this.state.password},)
            })
        .then(data => data.json())
        .then((data) => {
            console.log("it hit the server")
            if (data["newRegistration"] === 'false') {
                alert(data["message"])
            }
            else {
                alert(data["message"])
                this.clearRegistrationForm()
                this.closeModalHandler()
            }
        })	
        .catch(error => console.error(error));	
        }
    handleFirstChange(event) {
        this.setState({first: event.target.value})
      }
    handleLastChange(event) {
        this.setState({last: event.target.value})
      }
    handleGenderChange(event) {
        this.setState({gender: event.target.value})
    }
    handleBirthdayChange(event) {
        this.setState({birthday: event.target.value})
    }
    handlePostalChange(event) {
        this.setState({postal: event.target.value})
    }
    handleUsStateChange(event) {
        this.setState({userState: event.target.value})
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }
    showHide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            type: this.state.type === 'password' ? 'text' : 'password'
        })  
    }
    clearRegistrationForm() {
        this.setState({first: ""})
        this.setState({last: ""})
        this.setState({gender: ""})
        this.setState({birthday: ""})
        this.setState({postal: ""})
        this.setState({userState: ""})
        this.setState({email: ""})
        this.setState({password: ""})
    }
    createOptions(arrayObject) {
        return <option> {arrayObject} </option>;
    }
    render () {
        return (
            <div>
                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Register Now!</button>

                <RegistrationModal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}
                    register={this.handleRegister}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            First Name:
                            <input type="text" maxLength="50" value={this.state.value} onChange={this.handleFirstChange} />
                            </label>
                            <label>
                            Last Name:
                            <input type="text" maxLength="50" value={this.state.value} onChange={this.handleLastChange} />
                            </label>
                            <label>
                            Gender:
                            <select value={this.state.value} onChange={this.handleGenderChange}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option selected defaultValue="NA">N/A</option>
                            </select>
                            </label>
                            <br />
                            <label>
                            Birthday:
                            <input type="date" name="birthday" min="1900-01-01" max="2006-01-01" value={this.state.value} onChange={this.handleBirthdayChange}/>
                            </label>
                            <label>
                            Postal Code:
                            <input type="text" maxLength="5" value={this.state.value} onChange={this.handlePostalChange} />
                            </label>
                            <label>
                            State:
                            <select value={this.state.value} onChange={this.handleUsStateChange}>{this.state.states.map(this.createOptions)}</select>
                            </label>
                            <label>
                            Email:
                            <input type="text" maxLength="100" value={this.state.value} onChange={this.handleEmailChange} />
                            </label>
                            <label>
                            Password:
                            <input type={this.state.type} maxLength="100" value={this.state.value} onChange={this.handlePasswordChange} /><span className="password__show" onClick={this.showHide}>{this.state.type === 'password' ? 'Show' : 'Hide'}</span>
                            </label>
                        </form>
                </RegistrationModal>
            </div>
        );
    }
}

export default UserRegistration;
