import { useEffect, useState } from "react";

interface TurnsignalProps {
    data: {
        TursignalLeft: boolean;
        TursignalRight: boolean;
    };
}
const TurnsignalComponent: React.FC<TurnsignalProps> = ({ data }) => {
    const [blink, setBlink] = useState(true);

    useEffect(() => {
      const interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 400);
  
      return () => clearInterval(interval);
    }, []);

    return (
        <div className="TurnsignalComponent">
            <div className='icon'>
                <svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3648 18.6464L0.346829 10.0482C0.239721 9.9714 0.152416 9.87019 0.0921128 9.75297C0.0318099 9.63575 0.00023747 9.50587 -4.09753e-07 9.37405L-4.09666e-07 9.37207C0.000276046 9.23974 0.0321285 9.10939 0.0929103 8.99184C0.153692 8.8743 0.241648 8.77295 0.34947 8.69623L12.3674 0.153523C12.4916 0.0651051 12.6378 0.0126816 12.7899 0.00202629C12.942 -0.00862903 13.0941 0.0228976 13.2294 0.0931337C13.3649 0.162901 13.4785 0.268702 13.5577 0.39889C13.637 0.529078 13.6788 0.678606 13.6785 0.831014L13.6785 4.8514L24.4725 4.85107C24.5815 4.85103 24.6895 4.87248 24.7902 4.91419C24.8909 4.95591 24.9825 5.01707 25.0595 5.09418C25.1366 5.17129 25.1978 5.26284 25.2394 5.36359C25.2811 5.46434 25.3025 5.57232 25.3024 5.68135L25.3021 13.1199C25.3021 13.229 25.2807 13.337 25.2389 13.4377C25.1972 13.5385 25.136 13.6301 25.0589 13.7072C24.9817 13.7843 24.8902 13.8455 24.7894 13.8871C24.6886 13.9288 24.5806 13.9502 24.4715 13.9502L13.6788 13.9502L13.6788 17.9719C13.6788 18.2821 13.5039 18.5669 13.2277 18.7101C13.092 18.78 12.9396 18.8111 12.7873 18.7999C12.635 18.7886 12.4888 18.7355 12.3648 18.6464Z" fill="url(#paint0_linear_342_7)"/>
                    <defs>
                        {(data.TursignalLeft && blink) ?
                        <linearGradient id="paint0_linear_342_7" x1="12.6512" y1="5.53002e-07" x2="12.6512" y2="18.8021" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#37D864"/>
                            <stop offset="1" stop-color="#2EB553"/>
                        </linearGradient>
                            :
                        <linearGradient id="paint0_linear_342_7" x1="12.6512" y1="5.53002e-07" x2="12.6512" y2="18.8021" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#fff" stop-opacity="0.2"/>
                            <stop offset="1" stop-color="#fff" stop-opacity="0.2"/>
                        </linearGradient>
                        }
                    </defs>
                </svg>
            </div>
            <div className='icon'>
                <svg width="33" height="24" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9375 0.155733L24.9554 8.75388C25.0625 8.83073 25.1498 8.93193 25.2101 9.04915C25.2704 9.16637 25.302 9.29625 25.3022 9.42807V9.43005C25.302 9.56238 25.2701 9.69274 25.2093 9.81028C25.1486 9.92783 25.0606 10.0292 24.9528 10.1059L12.9348 18.6486C12.8106 18.737 12.6644 18.7894 12.5124 18.8001C12.3603 18.8108 12.2082 18.7792 12.0729 18.709C11.9374 18.6392 11.8237 18.5334 11.7445 18.4032C11.6653 18.273 11.6235 18.1235 11.6237 17.9711V13.9507L0.829777 13.9511C0.720745 13.9511 0.612776 13.9296 0.512039 13.8879C0.411304 13.8462 0.31978 13.7851 0.242699 13.7079C0.165619 13.6308 0.104494 13.5393 0.0628185 13.4385C0.0211449 13.3378 -0.000259399 13.2298 -0.000173569 13.1208L0.000156403 5.68224C0.000112534 5.57317 0.0215702 5.46515 0.0633011 5.36438C0.10503 5.2636 0.166216 5.17204 0.243359 5.09493C0.320501 5.01782 0.412086 4.95667 0.512878 4.91498C0.61367 4.87329 0.721691 4.85188 0.830765 4.85196L11.6234 4.85196L11.6234 0.830252C11.6234 0.520052 11.7983 0.235262 12.0745 0.0920429C12.2103 0.0220814 12.3627 -0.00899696 12.515 0.00224304C12.6673 0.013483 12.8135 0.0666027 12.9375 0.155733Z" fill="url(#paint0_linear_297_157)"/>
                    <defs>
                        {(data.TursignalRight && blink) ?
                        <linearGradient id="paint0_linear_297_157" x1="12.651" y1="18.8021" x2="12.651" y2="-3.8147e-06" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#37D864"/>
                            <stop offset="1" stop-color="#2EB553"/>
                        </linearGradient>
                            :
                        <linearGradient id="paint0_linear_297_157" x1="12.651" y1="18.8021" x2="12.651" y2="-3.8147e-06" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#fff" stop-opacity="0.2"/>
                            <stop offset="1" stop-color="#fff" stop-opacity="0.2"/>
                        </linearGradient>
                        }
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default TurnsignalComponent;