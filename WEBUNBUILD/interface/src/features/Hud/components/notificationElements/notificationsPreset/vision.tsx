import MediaCdn from "@/components/mediaCdn/mediaCdn"
import { INotificationPresetProps } from "@/features/Hud/types"

export const VisionNotification: React.FC<INotificationPresetProps> = (props) => {
    return <div className="_notification showAnnonce">
        <MediaCdn path={"assets/hud/notifications"} name={"vision.webp"} />
        <div className="infos">
            <div
                className="name A-FadeInLeft"
                style={{ animationDelay: "1.3s" }}
            >
                VISION
            </div>
            <div
                className={props.typeannonce?.toLowerCase() + " A-FadeInLeft"}
                style={{ animationDelay: "1.6s" }}
            >
                {props.labeltype}
            </div>
            <div
                className="message A-FadeInLeft"
                style={{ animationDelay: "1.9s" }}
            >
                {props.parsedContent}
            </div>
        </div>
        {/*{props.duration && (*/}
        {/*    <div className="timer A-FadeIn" style={{ animationDelay: "2s" }}>*/}
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