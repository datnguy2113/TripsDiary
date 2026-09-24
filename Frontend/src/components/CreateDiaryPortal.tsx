import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import createDiary from "../utils/createDiary";
import AuthContext from "../contexts/AuthContext";
import Button from "./button/Button";
import { useNavigate } from "react-router-dom";

type CreateDiaryPortalType = {
    isShow: boolean,
    handleIsShow: (show: boolean) => void
};

const CreateDiaryPortal = ({isShow, handleIsShow}: CreateDiaryPortalType) => {
    const [name, setName] = useState<string>("");
    const container = useRef<HTMLDivElement | null>(null);
    const hider = useRef<HTMLDivElement | null>(null);
    const authContext = useContext(AuthContext);
    const tl = useRef<GSAPTimeline | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        tl.current = gsap.timeline({defaults: {ease: "power4"}})
        if (isShow) {
            tl.current.to(container.current, {
                scale: 1
            });
        }
        else {
            tl.current.to(container.current, {
                scale: 0
            });
        }

        return () => {
            if (tl.current) {
                tl.current.kill();
                tl.current = null;
            }
        }
    }, [isShow]);

    return (
        <>
            <div 
                style={
                    {
                        display: isShow ? "block" : "none"
                    }
                }
                onClick={() => handleIsShow(false)}
                className="w-screen h-screen fixed top-0 left-0 z-[100] bg-black opacity-50"
            ></div>
            <div 
                className="fixed left-1/2 top-1/2 -translate-1/2 bg-blue-50 flex flex-col gap-4 justify-center items-center p-[2em] rounded-[1.5em] origin-center scale-0 z-[1000]"
                ref={container}
            >
                <Button
                    style={
                        {
                            alignSelf: "end"
                        }
                    }
                    onClick={() => handleIsShow(false)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 640 640"
                        className="w-[1.5rem]"
                    >
                        <path fill="#ecf7f9" d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/>
                    </svg>
                </Button>
                <p className="text-[2rem] font-bold text-blue_400">Give your diary a name</p>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 640 640"
                    className="w-[6rem]"
                >
                    <path fill="#64bece" d="M192 192C192 174.3 206.3 160 224 160C241.7 160 256 174.3 256 192L256 199.8C256 227.5 253.6 255.1 248.9 282.3L164.5 307.6C123.9 319.8 96.1 357.2 96.1 399.6L96.1 432L24.1 432C10.8 432 .1 442.7 .1 456C.1 469.3 10.8 480 24.1 480L96.6 480C100.8 516 131.4 544 168.6 544C194.6 544 218.6 530.1 231.5 507.5L245.4 483.2C272.2 436.2 291.9 385.5 303.8 332.7L398.2 304.4L385.7 341.9C382.4 351.7 384.1 362.4 390.1 370.7C396.1 379 405.7 384 416 384L544 384C561.7 384 576 369.7 576 352C576 334.3 561.7 320 544 320L460.4 320L478.4 266.1C482.2 254.8 479.3 242.3 471 233.7C462.7 225.1 450.3 221.9 438.8 225.3L316.4 262.1C318.8 241.4 320 220.7 320 199.8L320 192C320 139 277 96 224 96C171 96 128 139 128 192L128 224C128 241.7 142.3 256 160 256C177.7 256 192 241.7 192 224L192 192zM182.8 369L231.8 354.3C221.4 388.1 207.3 420.7 189.7 451.5L175.8 475.8C174.3 478.4 171.5 480.1 168.4 480.1C163.7 480.1 159.9 476.3 159.9 471.6L159.9 399.7C159.9 385.6 169.2 373.1 182.7 369zM616 480C629.3 480 640 469.3 640 456C640 442.7 629.3 432 616 432L323.1 432C316.6 448.3 309.4 464.3 301.5 480L616 480z"/>
                </svg>
                <div className="self-stretch">
                    <input
                        value={name}
                        className="bg-blue_400 w-full p-[.5em] text-blue_50 font-bold text-[1rem] rounded-[.5em]"
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your diary"
                    />
                </div>
                <Button
                    disabled={name === ""}    
                    style={
                        {
                            alignSelf: "stretch",
                            opacity: name === "" ? 0.5 : 1
                        }
                    }
                    onClick={async () => {
                    const diaryId = await createDiary(name, authContext?.accessToken as string);
                    navigate(`/diary/edit?id=${diaryId}`);
                    }}
                >
                    <p className="font-bold text-white">Create</p>
                </Button>
            </div>
        </>

    );
};

export default CreateDiaryPortal;