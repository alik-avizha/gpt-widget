import React, {FC} from 'react';
import './button.css';

export interface MyButtonProps {
    color: string;
    children?: React.ReactNode;
    big?: boolean
}

const MyButton: FC<MyButtonProps> = ({  big,
                                         children,
                                         color,
                                         ...props
                                     }) => {
    const rootClasses = ['my-button']
    if (big){
        rootClasses.push('big-btn')
    }

    return (
        <button {...props} className={rootClasses.join(' ')} style={{ color }}>
            {children}
        </button>
    );
};

export default MyButton;
