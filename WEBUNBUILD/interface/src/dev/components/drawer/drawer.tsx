import './drawer.css';

interface DrawerProps {
  isOpen: boolean;
  position: 'left' | 'right';
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  position = 'left',
  onClose,
  children
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`drawer ${position} ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </>
  );
};