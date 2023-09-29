import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CONFIRMATION_STORAGE_KEY } from './constants';
import { RootState } from './store';
import useLocalStorage from './hooks/useLocalStorage';

import Modal from './components/Modal';
import { toggleModal } from './components/Modal/modalSlice';
import Button from './components/ui/Button';

import appStyles from './App.module.css';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.modal.toggle) === 'open';
    const [LSModalConfirmed, setLSModalConfirmed, clearLSModalConfirmed] = useLocalStorage(
        CONFIRMATION_STORAGE_KEY,
        ''
    );

    const handleActionClick = () => {
        if (!isModalOpen && !LSModalConfirmed) {
            dispatch(toggleModal('open'));
        } else {
            alert('Действие выполнено');
        }
    };

    const handleModalClose = () => {
        dispatch(toggleModal('close'));
    };

    const handleModalConfirmation = () => {
        alert('Действие выполнено');
        setLSModalConfirmed('true');
        dispatch(toggleModal('close'));
    };

    return (
        <div className={appStyles.btnWrapper}>
            <Button onClick={handleActionClick}>Выполнить действие</Button>
            <button
                className={`${appStyles.clearStorageBtn} ${LSModalConfirmed ? appStyles.visible : ''}`}
                onClick={clearLSModalConfirmed}>
                Очистить сторедж
            </button>
            {isModalOpen &&
                createPortal(
                    <Modal
                        initialCountdown={2}
                        onClose={handleModalClose}
                        onConfirm={handleModalConfirmation}
                    />,
                    document.querySelector('#confirmModal') as HTMLElement
                )}
        </div>
    );
};

export default App;
