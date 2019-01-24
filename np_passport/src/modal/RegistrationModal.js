import React from 'react';

import './Modal.css';

const registrationModal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>User Registration</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <div>
                        {props.children}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={props.register}> REGISTER</button>
                </div>
            </div>
        </div>
    )
}

export default registrationModal;