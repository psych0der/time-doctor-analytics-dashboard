import React from 'react'
import {Modal} from 'react-bootstrap';
import {UserActivityWidgetDescription} from '../../components';
import saveIcon from '../../commons/assets/icons/save.svg';
import cancelIcon from '../../commons/assets/icons/cancel.svg';
import './index.css';

export class WidgetCreationModal extends React.Component {
    state = {
        revertAction: null
    }

    setRevertAction = (revertAction)=>{
        this.setState({revertAction});
    }

    cancelChanges = ()=>{
        let {revertAction} = this.state;
        if(revertAction !== null){
            revertAction();
        }
        /* reset the state */
        this.setState({revertAction: null});
        this.props.closeModal();
    }

    saveAndCloseModal = ()=>{
        /* reset the state */
        this.setState({revertAction: null});
        this.props.closeModal();
    }

    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.show} className="widgetCreationModal" bsSize="large">
                    <Modal.Header closeButton onHide={this.cancelChanges} className="modalHeader">
                        <Modal.Title className="modalTitle">Add a widget</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <UserActivityWidgetDescription
                            widgetContainerState={this.props.widgetContainerState}
                            addWidget={this.props.addWidget}
                            emptyContainer={this.props.emptyContainer}
                            setRevertAction={this.setRevertAction}
                            closeModal={this.closeModal}/>
                    </Modal.Body>

                    <Modal.Footer
                        style={{
                        border: 'none'
                    }}>
                        <div className="pull-right">
                            <div className="settingsButton" onClick={this.cancelChanges}>
                                <img src={cancelIcon} alt="cancel"/>
                            </div>
                            <div className="settingsButton  ml2" onClick={this.saveAndCloseModal}>
                                <img src={saveIcon} alt="save"/>
                            </div>
                        </div>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default WidgetCreationModal;