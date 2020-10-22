import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeModal } from '../../../store/actions/modal';

// styles
import './modal.css';

// components
import Wrapper from '../Wrapper/Wrapper';
import Colors from '../../../utils/constants/Colors';
import Button from '../../Button/Button';

const Modal = () => {
    const modalInfo = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const { modalType, modalTitle, modalText, modalActionText, modalAction } = modalInfo.modalData;

    // render the appropriate content for the type of modal
    const renderContent = () => {
        switch (modalType) {
            case 'error':
                return (<p className="modalContentText" style={{ textAlign: 'center' }}>{modalText}</p>);
            case 'confirm':
                return (<p className="modalContentText" style={{ textAlign: 'center' }}>{modalText}</p>);
            default: return;
        };
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
                <div id="modalHeader" style={{ backgroundColor: Colors.secondaryBgColor }}>
                    {modalTitle && <h1 id="modalTitle">{modalTitle.toUpperCase()}</h1>}
                </div>
                <div id="modalContent">
                    {renderContent()}
                </div>
                <Wrapper styles={{ padding: '1rem' }}>
                    {modalType === 'confirm' ? <Button style={{ backgroundColor: Colors.secondaryBgColor, borderColor: Colors.secondaryBgColor }} onClick={() => { dispatch(removeModal()) }}>CANCEL</Button> : ''}
                    {modalActionText && <Button style={{ backgroundColor: Colors.secondaryBgColor, borderColor: Colors.secondaryBgColor }} onClick={actionHandler}>{modalActionText.toUpperCase()}</Button>}
                </Wrapper>
            </div>
        </div>
    );
};

export default Modal;