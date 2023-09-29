import btnStyles from './Button.module.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = ({ children, ...props }: IProps) => {
    return (
        <button
            className={btnStyles.button}
            {...props}>
            {children}
        </button>
    );
};

export default Button;
