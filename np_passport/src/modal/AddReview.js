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
        this.handleNumStarsChange = this.handleNumStarsChange.bind(this)
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
                                numStarsChange:this.state.numStarsChange,
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
    handleNumStarsChange(event) {
        this.setState({numStarsChange: event.target.value})
      }
    handleTextChange(event) {
    this.setState({reviewText: event.target.value})
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
                            Number of stars:
                            </label>
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {this.handleNumStarsChange}/>
                            <label>
                            Review Text:
                            </label>
                            <input type="text" maxLength="5000" value={this.state.value} onChange={this.handleTextChange} />
                        </form>
                </ReviewModal>
            </div>
        );
    }
}

export default AddReview;
