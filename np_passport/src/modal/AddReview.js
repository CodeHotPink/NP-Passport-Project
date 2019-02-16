import React, { Component } from 'react';
import ReviewModal from './ReviewModal';

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            type: "password"
        }
        this.openModalHandler = this.openModalHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.handleAddReview = this.handleAddReview.bind(this)
        this.handleParkNameChange = this.handleParkNameChange.bind(this)
        this.handleReviewDateChange = this.handleReviewDateChange.bind(this)
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
    handleAddReview(event) {
        event.preventDefault();
        this.addUserReview()
        }

    addUserReview() {
        fetch("http://localhost:5000/add_user_review", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:this.props.email,
                                reviewDateChange:this.state.reviewDateChange,
                                reviewParkName:this.state.reviewParkName})
            })
        .then(data => data.json())
        .then((data) => {
            console.log("it hit the server")
            console.log(data)
            if (data["close"] === true) {
                alert("it's reading that it's true")
                alert(data["message"])
                this.closeModalHandler()
            }
            else {
                alert("it's reading that it's false")
                alert(data["message"])
            }
        })	
        .catch(error => console.error(error));	
        }


    handleParkNameChange(event) {
        this.setState({reviewParkName: event.target.value})
        console.log(this.state.reviewParkName)

      }
    handleReviewDateChange(event) {
        this.setState({reviewDateChange: event.target.value})
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

                <button className="open-modal-btn" onClick={this.openModalHandler}>Add Review</button>

                <ReviewModal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}
                    addReview={this.handleAddReview}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            Park Name:
                            </label>
                            <input list="parks" value={this.state.value} onChange={this.handleParkNameChange}/>
                            <datalist id="parks">
                                {this.props.allParkNames["parks"].map(this.createOptions)}
                            </datalist>
                            <label>
                            Review Date:
                            </label>
                            <input type="date" name="reviewDate" value={this.state.value} onChange={this.handleReviewDateChange}/>
                        </form>
                </ReviewModal>
            </div>
        );
    }
}

export default AddReview;
