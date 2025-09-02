import { Hammer } from '@icons/dev/hammer';
import './tooltip.css';

interface TooltipProps {
  status: 'Close' | 'Open';
  onClick: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({ onClick, status }) => {
  return (
    <button className="tooltip-button" onClick={onClick}>
      <Hammer className="tooltip-icon" />
      <span className="tooltip-text">{status} devtool</span>
    </button>
  );
};