import React, { Component } from 'react';
import VisitModal from './VisitModal';

class AddVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            type: "password"
        }
        this.openModalHandler = this.openModalHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.handleAddVisit = this.handleAddVisit.bind(this)
        this.handleParkNameChange = this.handleParkNameChange.bind(this)
        this.handleVisitDateChange = this.handleVisitDateChange.bind(this)
        this.createOptions = this.createOptions.bind(this)
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
    handleAddVisit(event) {
        event.preventDefault();
        this.addUserVisit()
        }

    addUserVisit() {
        fetch("http://localhost:5000/add_user_visit", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:this.props.email,
                                visitDateChange:this.state.visitDateChange,
                                visitParkName:this.state.visitParkName})
            })
        .then(data => data.json())
        // .then((data) => {
        //     console.log("it hit the server")
        //     if (data["newRegistration"] === 'false') {
        //         alert(data["message"])
        //     }
        //     else {
        //         alert(data["message"])
        //         this.clearRegistrationForm()
        //         this.closeModalHandler()
        //     }
        // })	
        .catch(error => console.error(error));	
        }


    handleParkNameChange(event) {
        this.setState({visitParkName: event.target.value})
        console.log(this.state.visitParkName)

      }
    handleVisitDateChange(event) {
        this.setState({visitDateChange: event.target.value})
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

                <button className="open-modal-btn" onClick={this.openModalHandler}>Add Visit</button>

                <VisitModal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}
                    addVisit={this.handleAddVisit}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            Park Name:
                            </label>
                            <input list="parks" value={this.state.value} onChange={this.handleParkNameChange}/>
                            <datalist id="parks">
                                {this.props.allParkNames["parks"].map(this.createOptions)}
                            </datalist>
                            <label>
                            Visit Date:
                            </label>
                            <input type="date" name="visitDate" value={this.state.value} onChange={this.handleVisitDateChange}/>
                        </form>
                </VisitModal>
            </div>
        );
    }
}

export default AddVisit;
