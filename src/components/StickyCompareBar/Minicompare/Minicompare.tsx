import React from "react";
import "./Minicompare.css";

interface MinicompareProps {
    count: number;
    onToggle: () => void;
}

const Minicompare: React.FC<MinicompareProps> = ({ count, onToggle }) => {
    return (
        <div className="container">
            <div className='minicompare' onClick={onToggle}>
                <span className="pill-text">So sánh ({count})</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.20694 12.2672C3.92125 11.9672 3.93279 11.4925 4.23271 11.2068L9.48318 6.20548C9.77285 5.92955 10.2281 5.92955 10.5178 6.20548L15.7682 11.2068C16.0681 11.4925 16.0797 11.9672 15.794 12.2672C15.5083 12.5671 15.0336 12.5786 14.7336 12.2929L10.0005 7.78434L5.26729 12.2929C4.96737 12.5786 4.49264 12.5671 4.20694 12.2672Z" fill="#ffffff" />
                </svg>
            </div>
        </div>

    );
};

export default Minicompare;