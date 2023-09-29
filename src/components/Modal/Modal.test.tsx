import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '.';
import { act } from 'react-dom/test-utils';

describe('Modal', () => {
    it('should render the modal content', () => {
        const onClose = jest.fn();
        const onConfirm = jest.fn();

        render(
            <Modal
                onClose={onClose}
                onConfirm={onConfirm}
                initialCountdown={10}
            />
        );

        expect(screen.getByText('Подтвердить (10)')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
        const onClose = jest.fn();
        const onConfirm = jest.fn();

        render(
            <Modal
                onClose={onClose}
                onConfirm={onConfirm}
                initialCountdown={10}
            />
        );

        const closeButton = screen.getByText('×');

        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    it('onClose button should be disabled if countdown > 0', () => {
        const onClose = jest.fn();
        const onConfirm = jest.fn();
        const initialCountdown = 10;
        render(
            <Modal
                onClose={onClose}
                onConfirm={onConfirm}
                initialCountdown={initialCountdown}
            />
        );

        const confirmButton = screen.getByText('Подтвердить (10)');

        expect(confirmButton).toBeDisabled();
    });

    it('should call onConfirm when countdown < 0', async () => {
        const onClose = jest.fn();
        const onConfirm = jest.fn();
        const initialCountdown = 10;
        jest.useFakeTimers();
        jest.runAllTimers();

        render(
            <Modal
                onClose={onClose}
                onConfirm={onConfirm}
                initialCountdown={initialCountdown}
            />
        );

        const confirmButton = screen.getByText(`Подтвердить (${initialCountdown})`);
        setTimeout(() => {
            expect(confirmButton).toBeEnabled();
            act(() => fireEvent.click(confirmButton));
            expect(onConfirm).toHaveBeenCalled();
        }, initialCountdown + 1 * 1000);
    });
});
