import React, { Component } from 'react';
import RegistrationModal from './RegistrationModal';

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            gender: "na",
            startDate: new Date()
        }
        this.openModalHandler = this.openModalHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.handleFirstChange = this.handleFirstChange.bind(this)
        this.handleLastChange = this.handleLastChange.bind(this)
        this.handleGenderChange = this.handleGenderChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this)
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
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.gender)
        console.log(this.state.last)
      }
    handleFirstChange(event) {
        this.setState({first: event.target.value})
      }
    handleLastChange(event) {
        this.setState({last: event.target.value})
        console.log(this.state.last)
      }
    handleGenderChange(event) {
        this.setState({gender: event.target.value})
        console.log(this.state.gender)
    }
    handleBirthdayChange(event) {
        this.setState({birthday: event.target.value})
        console.log(this.state.birthday)
        console.log(typeof(this.state.birthday))
    }
    render () {
        return (
            <div>
                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Register Now!</button>

                <RegistrationModal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            First Name:
                            <input type="text" value={this.state.value} onChange={this.handleFirstChange} />
                            </label>
                            <label>
                            Last Name:
                            <input type="text" value={this.state.value} onChange={this.handleLastChange} />
                            </label>
                            <label>
                            Gender:
                            <select value={this.state.value} onChange={this.handleGenderChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option selected defaultValue="na">N/A</option>
                            </select>
                            </label>
                            <br />
                            <label>
                            Birthday:
                            <input type="date" name="birthday" min="1900-01-01" max="2006-01-01" value={this.state.value} onChange={this.handleBirthdayChange}/>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                </RegistrationModal>
            </div>
        );
    }
}

export default UserRegistration;
