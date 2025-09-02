import { forwardRef, useMemo } from "react";
import { SnackbarContent } from "notistack";
import { VisionNotification } from "./notificationsPreset/vision";
import { MissionTaxi } from "./notificationsPreset/missionTaxi";
import { INotificationPresetProps } from "../../types";
import { Illegal } from "./notificationsPreset/illegal";
import { AlerteJob } from "./notificationsPreset/alerteJob";
import { Job } from "./notificationsPreset/job";
import { AdminReport } from "./notificationsPreset/adminReport";
import { Default } from "./notificationsPreset/default";
import { Invite } from "@/features/Hud/components/notificationElements/notificationsPreset/Invite.tsx";

const mainNotification = forwardRef<HTMLDivElement, INotificationPresetProps>(({ ...props }, ref) => {
  const DOM = useMemo(() => {
    if (props.type === 'VISION') return <VisionNotification {...props} />;
    if (props.type === 'MISSIONTAXI') return <MissionTaxi {...props} />;
    if (props.type === 'ALERTEJOBS') return <AlerteJob {...props} />;
    if (props.type === 'JOB') return <Job {...props} />;
    if (props.type === 'ILLEGAL') return <Illegal {...props} />;
    if (props.type === 'ADMIN_NEW_REPORT') return <AdminReport {...props} />;
    if (props.type === 'INVITE_NOTIFICATION') return <Invite {...props} />;
    return <Default {...props} />;
  }, [props]);

  return (
    <SnackbarContent ref={ref}>
      {DOM}
    </SnackbarContent>
  );
});

mainNotification.displayName = "MainNotification";

export default mainNotification;
