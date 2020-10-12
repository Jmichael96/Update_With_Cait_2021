import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeModal } from '../../../store/actions/modal';

// styles
import './modal.css';

// components
import Wrapper from '../Wrapper/Wrapper';

const Modal = () => {
    const modalInfo = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const { modalType, modalTitle, modalText, modalActionText, modalAction } = modalInfo.modalData;

    // render the appropriate content for the type of modal
    const renderContent = () => {
        if (modalType === 'error') {
            return (<p className="modalContentText" style={{ textAlign: 'center' }}>{modalText}</p>);
        } 
    };

    // handler for modalAction being passed in
    const actionHandler = async () => {
        await modalAction();
        dispatch(removeModal());
    };

    return (
        <div id="open-modal" className="modal-window" style={{
            visibility: modalInfo.isOpen ? 'visible' : 'hidden',
            opacity: modalInfo.isOpen ? 1 : 0,
            pointerEvents: modalInfo.isOpen ? 'auto' : 'none',
        }}>
            <div style={{ maxHeight: modalType !== 'error' ? '40rem' : '' }}>
                <div id="modalHeader">
                    {modalTitle && <h1 id="modalTitle">{modalTitle.toUpperCase()}</h1>}
                </div>
                <div id="modalContent">
                    {renderContent()}
                </div>
                <Wrapper styles={{ padding: '1rem' }}>
                    {modalType === 'component' ? <button className="modalActionBtn" onClick={() => { dispatch(removeModal()) }}>CANCEL</button> : ''}
                    {modalActionText && <button className="modalActionBtn" onClick={actionHandler}>{modalActionText.toUpperCase()}</button>}
                </Wrapper>
            </div>
        </div>
    );
};

export default Modal;