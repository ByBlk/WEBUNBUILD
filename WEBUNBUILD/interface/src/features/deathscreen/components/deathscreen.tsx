import "../style/index.scss";
import { MessageComponent, IdComponent } from "./index";
import Button from "@/components/button/button";
import { fetchNui } from "@/hook";
import {useEffect, useState} from "react";

interface DeathScreenComponentsProps {
  data: {
    visible: boolean;
    timer: number;
    id: number;
  }
}

const DeathScreenComponents: React.FC<DeathScreenComponentsProps> = ({ data }) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportError, setReportError] = useState(false);
  const [report, setReport] = useState("");
  const [selected, setSelected] = useState("");

  const [timer, setTimer] = useState(data.timer);

  const handleSendReport = () => {
    if (reportOpen) {
      if (report.trim().split(" ").length < 4) {
        setReportError(true);
        return;
      }
      if (report.trim().length > 0) fetchNui("nui:deathscreen:send-report", { report: report.trim() });
      setReportOpen(false);
      setReportError(false);
      setSelected("");
      setReport("");
    } else setReportOpen(true);
  };
  const secondsToTime = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const handleRespawn = () => {
    if (timer <= 0) {
      fetchNui("nui:deathscreen:respawn");
      setSelected("");
      setReportOpen(false);
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer])

  return (
    <div className="deathscreen">
      <div className="deathscreen__time">
        <h1>{secondsToTime()}</h1>
        <span>TEMPS RESTANTS</span>
      </div>
      <div className="deathscreen__containerCase">
        {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
        <div className={`deathscreen__containerCase__Case ${selected === 'secours' ? 'selected' : ''}`} onClick={() => { setSelected('secours'), setReportOpen(false), fetchNui("nui:deathscreen:callemergency") }}>
          <h1>Alerter les secours</h1>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
        <div className={`deathscreen__containerCase__Case ${selected === 'report' ? 'selected' : ''}`} onClick={() => { setReportOpen(!reportOpen), setSelected('report') }}>
          <h1>Faire un report</h1>
        </div>

        {reportOpen && (
          <div className="deathscreen__containerCase__CaseReport">
            <textarea id="report" placeholder="Entrer votre message..." onChange={(e) => setReport(e.target.value)} />
            {reportError && (
              <div className="error">Le message doit comporter au moins 4 mots</div>
            )}
            <div className="deathscreen__containerCase__CaseReport__send">
              <Button
                color="white"
                fontWeight={400}
                fontSize="1.5vh"
                label="Envoyer"
                width="100%"
                height="100%"
                callback={handleSendReport}
              />
            </div>
          </div>
        )}
      </div>

      <div className="deathscreen__button">
        <div
          className="deathscreen__respawn"
          style={{
            background: data.timer <= 0 ? "linear-gradient(180deg, rgba(42, 189, 83,0.40) 0%, rgba(15, 131, 47,0.50) 100%)" : "",
          }}
          onClick={handleRespawn}
        >
          <h1 style={
            {
              fontWeight: data.timer <= 0 ? "400" : "lighter",
            }
          }> Me Relever</h1>
        </div>

      </div>
      <MessageComponent />
      <IdComponent data={{ id: data.id }} />

    </div>
  );
};

export default DeathScreenComponents;
