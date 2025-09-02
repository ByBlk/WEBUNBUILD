import { useState, useEffect, useRef, useCallback } from 'react';
import {
    SnackbarProvider,
    SnackbarKey,
    useSnackbar,
    closeSnackbar,
    enqueueSnackbar,
} from "notistack";
import { useNuiEvent } from '@hooks/nuiEvent';
import { IAlertData, IAlertDatas, INotification, INotificationPresetProps, IWeazelNewsBroadcastData } from '../types';
import WeazelBroadcast from './notificationElements/weazelBroadcast';
import { parseNotificationContentColors } from './notificationElements/utils';
import MainNotification from "./notificationElements/mainNotification";
import '../style/notifications.scss'
import { alert as Alert } from "./notificationElements/alerts";

declare module "notistack" {
    interface VariantOverrides {
        mainNotification: true;
    }
}

const Child = () => {
    useSnackbar();
    return <></>;
};

const NotificationsComponent: React.FC<{ visible: boolean }> = ({ visible }) => {
    const ref = useRef(null);
    const [props, setProps] = useState<INotificationPresetProps>({});
    const [weazelBroadcastQueue, setWeazelBroadcastQueue] = useState<IWeazelNewsBroadcastData[]>([]);
    const [currentWeazelBroadcast, setCurrentWeazelBroadcast] = useState<IWeazelNewsBroadcastData | null>(null);
    const [weazelBroadcastPreview, setWeazelBroadcastPreview] = useState<IWeazelNewsBroadcastData | null>(null);
    const [disableNotifications, setDisableNotifications] = useState(false);
    const [snackbarKeys, setSnackbarKeys] = useState<SnackbarKey[]>([]);
    const [snackbarList, setSnackbarList] = useState<{key: string | number, message: string, options: INotificationPresetProps}[]>([]);
    const [alerts, setAlerts] = useState<IAlertDatas>([]);
    const [hud, setHud] = useState(true);
    const weazelRef = useRef(weazelBroadcastQueue);
    weazelRef.current = weazelBroadcastQueue;

    useNuiEvent("nui:hud:disable-notifications", (data: boolean) => {
        setDisableNotifications(data);
    });

    useNuiEvent("nui:hud:remove-notifications", (data: string) => {
        closeSnackbar(data);
    });

    useNuiEvent("nui:hud:create-notifications", (data: INotification | IWeazelNewsBroadcastData) => {
        if (disableNotifications) return;

        if (data.type === "WEAZEL") {
            setWeazelBroadcastQueue([...weazelBroadcastQueue, data as IWeazelNewsBroadcastData]);
            return;
        }

        const { content, ...rest } = data as INotification;
        const {
            content: parsedContent,
            hasSpecialColor,
            color,
        } = parseNotificationContentColors(content ?? '', data.type);

        setProps({
            ...rest,
            parsedContent,
            hasSpecialColor,
            color,
            autoHideDuration: (rest?.duration ?? 5) * 1000,
        });

        const duration = (rest?.duration ?? 5) * 1000;
        handleEnqueueNotification(rest?.title ?? "", {
            key: new Date().getTime(),
            variant: "mainNotification",
            ...rest,
            parsedContent,
            hasSpecialColor,
            color,
            autoHideDuration: duration,
        });
    });

    useNuiEvent("nui:hud:preview-notifications", (data: INotification | IWeazelNewsBroadcastData) => {
        if (disableNotifications) return;
        switch (data.type) {
            case "WEAZEL":
                setWeazelBroadcastPreview(data as IWeazelNewsBroadcastData);
                break;
            default:
                setWeazelBroadcastPreview(null);
                break;
        }
    });

    useNuiEvent("nui:hud:clear-preview", () => {
        setWeazelBroadcastPreview(null);
    });

    useNuiEvent("nui:hud:update-hud-state", (data: boolean) => {
        setHud(data);
    });

    useNuiEvent("nui:hud:create-alert", (data: IAlertData) => {
        if (disableNotifications) return;
        const id = new Date().getTime().toString();
        setAlerts((old) => [...old, { id, ...data }]);
        setTimeout(() => {
            removeAlert(id);
        }, 10000);
    });

    useNuiEvent("nui:hud:remove-newest-notifications", () => {
        if (snackbarKeys.length > 0) {
            const latestKey = snackbarKeys[snackbarKeys.length - 1];
            setSnackbarKeys((prevKeys) => prevKeys.slice(0, -1));
            closeSnackbar(latestKey);
        }
    });

    const handleEnqueueNotification = (message: string, options: INotificationPresetProps) => {
        snackbarList.forEach((item) => {
            if (item.message === message && item.options.type === options.type) {
                setSnackbarList((prevList) => prevList.filter((iteme) => iteme.key !== item.key));

                setSnackbarKeys((prevKeys: SnackbarKey[]) => {
                    if (prevKeys.includes(item.key)) {
                        closeSnackbar(item.key);
                        return prevKeys.filter((k) => k !== item.key);
                    }
                    return prevKeys;
                });
            }
        });

        const key = enqueueSnackbar(message, options);
        setSnackbarKeys((prevKeys: SnackbarKey[]) => [...prevKeys, key]);
        setSnackbarList((prevList) => [...prevList, { key, message, options }]);

        setTimeout(() => {
            setSnackbarList((prevList) => prevList.filter((item) => item.options.key !== key));
            setSnackbarKeys((prevKeys: SnackbarKey[]) => {
                if (prevKeys.includes(key)) {
                    closeSnackbar(key);
                    return prevKeys.filter((k) => k !== key);
                }
                return prevKeys;
            });
        }, options.autoHideDuration ?? 5000);
    };

    const removeAlert = useCallback((id: string) => {
        setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    }, []);

    useEffect(() => {
        if (weazelBroadcastQueue.length > 0 && !currentWeazelBroadcast) {
            setTimeout(removeWeazelNotification, 11000, weazelBroadcastQueue);
            setCurrentWeazelBroadcast(weazelBroadcastQueue[0]);
        }
    }, [weazelBroadcastQueue]);

    const removeWeazelNotification = useCallback(() => {
        const _weazel = [...weazelRef.current];
        _weazel.shift();
        setCurrentWeazelBroadcast(null);
        setWeazelBroadcastQueue(_weazel);
    }, [weazelRef]);

    return (
        <div className={hud ? "notificationContainer" : "notificationContainer"} style={{ opacity: visible ? 1 : 0 }}>
            {currentWeazelBroadcast && <WeazelBroadcast announcement={currentWeazelBroadcast} />}
            {weazelBroadcastPreview && <WeazelBroadcast announcement={weazelBroadcastPreview} />}

            {/* Notifications, WeazelBroadcast */}
            <SnackbarProvider
                maxSnack={6}
                Components={{
                    mainNotification: MainNotification,
                }}
            >
                <div
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Child />
                    <div className="holder" ref={ref}>
                        <MainNotification {...props} />
                    </div>
                </div>
            </SnackbarProvider>

            {/* Alertes */}
            <div className="alerts">
                {alerts.map((alert, index) => (
                    <Alert key={index} alert={{...alert}} />
                ))}
            </div>
        </div>
    );
};

export default NotificationsComponent;