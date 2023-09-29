import React, { useEffect, useState } from 'react';
import modalStyles from './modalStyles.module.css';
import Button from '../ui/Button';

interface IProps {
    onClose: () => void;
    onConfirm: () => void;
    initialCountdown: number;
}

const Modal: React.FC<IProps> = ({ onClose, onConfirm, initialCountdown = 0 }) => {
    const [countdown, setCountdown] = useState(initialCountdown);

    useEffect(() => {
        let countdownInterval: NodeJS.Timeout;

        if (countdown > 0) {
            countdownInterval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [countdown]);

    return (
        <div className={modalStyles.modal}>
            <div className={modalStyles.modalContent}>
                <span
                    className={modalStyles.close}
                    onClick={onClose}>
                    &times;
                </span>
                <h2 className={modalStyles.modalTitle}>Согласие с правилами</h2>
                <p>
                    Для данной функции применяются особые условия и правила пользования, их необходимо подтвердить,
                    нажав на кнопку "Подтвердить"
                </p>
                <div className={modalStyles.buttonWrapper}>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button
                        onClick={onConfirm}
                        disabled={countdown > 0}>
                        Подтвердить {!!countdown && `(${countdown})`}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
