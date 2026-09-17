import type { ButtonHTMLAttributes } from "react";


const Button = ({children, ...prop}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...prop}
            style={{position: "relative", cursor: "pointer"}}
            className="group"
        >
            <div className="bg-blue_400 py-[.2em] px-[2em] border-3 border-blue_200 relative z-10 -translate-y-[.6rem] group-active:translate-y-0 rounded-[.6em]">
                {children}
            </div>
            <div className="w-full h-full absolute bg-blue_200 top-0 left-0 rounded-[.6em]"></div>
        </button>
    );
};

export default Button;