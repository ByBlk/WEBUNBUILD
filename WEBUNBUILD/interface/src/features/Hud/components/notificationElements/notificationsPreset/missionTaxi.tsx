import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { INotificationPresetProps } from "@/features/Hud/types";
import React, { useMemo } from "react";

export const MissionTaxi: React.FC<INotificationPresetProps> = ({ distance = 0, distancepnj = 0, ...props }) => {
    const style = useMemo(() => {
        if (distance < 3000) return "yellow";
        if (distance < 1000) return "green";
        if (distance > 1000) {
            const num = Number(distance / 1000);
            const roundedString = num.toFixed(1);
            return Number(roundedString);
        }
    }, [distance]);

    const unit = useMemo(() => {
        if (distance > 1000) {
            const num = Number(distance / 1000);
            const roundedString = num.toFixed(1);
            distance = Number(roundedString);
            return "km";
        }
        return "m";
    }, [distance]);

    const stylePnj = useMemo(() => {
        if (distancepnj < 3000) return "yellow";
        if (distancepnj < 1000) return "green";
        if (distancepnj > 1000) {
            const num = Number(distance / 1000);
            const roundedString = num.toFixed(1);
            return Number(roundedString);
        }
    }, [distancepnj]);

    const unitPnj = useMemo(() => {
        if (distancepnj > 1000) {
            const num = Number(distance / 1000);
            const roundedString = num.toFixed(1);
            distancepnj = Number(roundedString);
            return "km";
        }
        return "m";
    }, [distancepnj]);
    return <div className="notification police">
        <div className="top">
            <div style={{ marginLeft: 12.5 }}>{props.title}</div>
            <svg
                style={{ marginRight: 9 }}
                width="48"
                height="23"
                viewBox="0 0 48 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11.0969 21.0002C16.2331 21.0002 20.3969 16.7021 20.3969 11.4002C20.3969 6.09824 16.2331 1.80017 11.0969 1.80017C5.96063 1.80017 1.79688 6.09824 1.79688 11.4002C1.79688 16.7021 5.96063 21.0002 11.0969 21.0002Z"
                    fill="black"
                    fillOpacity="0.55"
                />
                <path
                    d="M22.2 11.4C22.2 17.696 17.2304 22.8 11.1 22.8C4.96964 22.8 0 17.696 0 11.4C0 5.10395 4.96964 0 11.1 0C17.2304 0 22.2 5.10395 22.2 11.4ZM2.11657 11.4C2.11657 16.4955 6.13859 20.6262 11.1 20.6262C16.0614 20.6262 20.0834 16.4955 20.0834 11.4C20.0834 6.3045 16.0614 2.17378 11.1 2.17378C6.13859 2.17378 2.11657 6.3045 2.11657 11.4Z"
                    fill="url(#paint0_linear_0_1)"
                />
                <path
                    d="M12.195 12.23V15H10.505V12.23L7.86499 7.71503H9.35499C9.50166 7.71503 9.61666 7.75003 9.69999 7.82003C9.78666 7.8867 9.85832 7.97336 9.91499 8.08003L10.945 10.2C11.0317 10.3667 11.11 10.5233 11.18 10.67C11.25 10.8133 11.3117 10.955 11.365 11.095C11.415 10.9517 11.4717 10.8083 11.535 10.665C11.6017 10.5183 11.6783 10.3633 11.765 10.2L12.785 8.08003C12.8083 8.0367 12.8367 7.99336 12.87 7.95003C12.9033 7.9067 12.9417 7.86836 12.985 7.83503C13.0317 7.79836 13.0833 7.77003 13.14 7.75003C13.2 7.7267 13.265 7.71503 13.335 7.71503H14.835L12.195 12.23Z"
                    fill="url(#paint1_linear_0_1)"
                />
                <path
                    d="M36.0969 21C41.2331 21 45.3969 16.7019 45.3969 11.4C45.3969 6.09805 41.2331 1.79999 36.0969 1.79999C30.9606 1.79999 26.7969 6.09805 26.7969 11.4C26.7969 16.7019 30.9606 21 36.0969 21Z"
                    fill="black"
                    fillOpacity="0.55"
                />
                <path
                    d="M47.2 11.4C47.2 17.696 42.2304 22.8 36.1 22.8C29.9696 22.8 25 17.696 25 11.4C25 5.10395 29.9696 0 36.1 0C42.2304 0 47.2 5.10395 47.2 11.4ZM27.1166 11.4C27.1166 16.4955 31.1386 20.6262 36.1 20.6262C41.0614 20.6262 45.0834 16.4955 45.0834 11.4C45.0834 6.3045 41.0614 2.17378 36.1 2.17378C31.1386 2.17378 27.1166 6.3045 27.1166 11.4Z"
                    fill="url(#paint2_linear_0_1)"
                />
                <path
                    d="M39.0651 7.71503V15H38.1851C38.0551 15 37.9451 14.98 37.8551 14.94C37.7684 14.8967 37.6818 14.8233 37.5951 14.72L34.1601 10.375C34.1734 10.505 34.1818 10.6317 34.1851 10.755C34.1918 10.875 34.1951 10.9883 34.1951 11.095V15H32.7051V7.71503H33.5951C33.6684 7.71503 33.7301 7.71836 33.7801 7.72503C33.8301 7.7317 33.8751 7.74503 33.9151 7.76503C33.9551 7.7817 33.9934 7.8067 34.0301 7.84003C34.0668 7.87336 34.1084 7.91836 34.1551 7.97503L37.6201 12.35C37.6034 12.21 37.5918 12.075 37.5851 11.945C37.5784 11.8117 37.5751 11.6867 37.5751 11.57V7.71503H39.0651Z"
                    fill="url(#paint3_linear_0_1)"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_0_1"
                        x1="11.1"
                        y1="0"
                        x2="11.1"
                        y2="22.8"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#38DC66" />
                        <stop offset="1" stopColor="#33963C" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_0_1"
                        x1="524.237"
                        y1="2.00003"
                        x2="524.237"
                        y2="21.2"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="#BFBFBF" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_0_1"
                        x1="36.1"
                        y1="0"
                        x2="36.1"
                        y2="22.8"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#E01F1F" />
                        <stop offset="1" stopColor="#C21D30" />
                    </linearGradient>
                    <linearGradient
                        id="paint3_linear_0_1"
                        x1="548.237"
                        y1="2.00003"
                        x2="548.237"
                        y2="21.2"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="#CDCDCD" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <div className="main">
            <div className="line">

                <MediaCdn path={"assets/hud/notifications"} name={"person.svg"} props={{
                    style: {
                        animationDelay: ".8s"
                    },
                    className: "A-BounceIn"
                }} />
                <div
                    className="value A-FadeInLeft"
                    style={{ textTransform: "uppercase", animationDelay: "1s" }}
                >
                    {props.adress}
                </div>
            </div>
            <div className="line">
                <MediaCdn path={"assets/hud/notifications"} name={"map.svg"} props={{
                    style: {
                        animationDelay: ".8s"
                    },
                    className: "A-BounceIn"
                }} />
                <div
                    className="value A-FadeInLeft "
                    style={{ textTransform: "uppercase", animationDelay: "1s" }}
                >
                    {props.adress2}
                </div>
            </div>
        </div>
        <div
            className={"distancepnj " + stylePnj + " A-BounceIn"}
            style={{ animationDelay: "1.3s" }}
        >
            {distancepnj}
            {unitPnj}
        </div>
        <div
            className={"distance " + style + " A-BounceIn"}
            style={{ animationDelay: "1.3s" }}
        >
            {distance}
            {unit}
        </div>
        {/*{props.duration && (*/}
        {/*    <div className="timer">*/}
        {/*        <div*/}
        {/*            className="track"*/}
        {/*            style={*/}
        {/*                {*/}
        {/*                    animationDuration: props.duration + "s",*/}
        {/*                } as React.CSSProperties*/}
        {/*            }*/}
        {/*        ></div>*/}
        {/*    </div>*/}
        {/*)}*/}
    </div>
}