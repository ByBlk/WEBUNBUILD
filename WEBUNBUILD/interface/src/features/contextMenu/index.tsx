import "./style.scss";
import React, { useEffect, useState, useRef } from "react";
import { setClipboard } from '@/utils'
import { fetchNui, useNuiEvent } from "@/hook";
import ListIcon from "./utils/listIcon";

interface MenuItem {
  name: string;
  id: number;
  value?: string;
  style?: {
    color?: [number, number, number];
  };
  child?: MenuItem[];
}

const ContextMenu: React.FC = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useNuiEvent<boolean>('nui:context-menu:visible', (status) => {
    setVisible(status);
    if (!status)
      setMenuData([]);
  });

  useEffect(() => {
    const handleRightClick = async (event: MouseEvent) => {
      event.preventDefault();
      setMenuData(await fetchNui("ContextMenuPosition", { x: event.clientX, y: event.clientY }));
      // setInterval(() => {
      //   console.log("data", menuData);
      // }, 2500)
      const menuWidth = menuRef.current?.offsetWidth || 0;
      const menuHeight = menuRef.current?.offsetHeight || 0;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      let x = event.clientX;
      let y = event.clientY;
  
      // Adjust position to prevent overflow
      if (x + menuWidth > screenWidth) {
        x = screenWidth - menuWidth;
      }
      if (y + menuHeight > screenHeight) {
        y = screenHeight - menuHeight;
      }
  
      setPosition({ x, y });
    };

    const handleClick = () => {
      if (visible) {
        setVisible(false);
        setMenuData([]);
        fetchNui("ContextMenuClose");
      }
    };

    window.addEventListener("contextmenu", handleRightClick);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
      window.removeEventListener("click", handleClick);
    };
  }, [visible]);

  const handleButtonClick = (id: number, value?: string) => {
    if (value) {
      setClipboard(value);
      return;
    }

    fetchNui("ContextMenuButtonClick", { id });
  };

  const renderMenu = (items: MenuItem[]) => {
    return (
      <ul className="context-menu-list">
        {items.map(item => {
          const backgroundColor = item.style?.color ? `rgb(${item.style.color.join(",")}, 0.4)` : undefined;
          const hoverColor = item.style?.color ? `rgba(${item.style.color.map(c => c * 0.9).join(",")}, 0.3)` : undefined;

          return (
            <li
              key={item.id}
              onClick={() => handleButtonClick(item.id, item.value)}
              style={{ backgroundColor }}
              onMouseEnter={(e) => { if (!item.value) e.currentTarget.style.backgroundColor = hoverColor || ''; }}
              onMouseLeave={(e) => { if (!item.value) e.currentTarget.style.backgroundColor = backgroundColor || ''; }}
              className={item.style?.color ? 'context-menu-item has-custom-color' : (item.value ? 'context-menu-item has-value' : `context-menu-item ${item.id%2 == 0 ? 'even' : 'odd'}`)}
            >
              {item.value ? (
                <>
                  <div className="context-menu-item-value"><div className="context-menu-item-value-data">{item.value}</div><div className="context-menu-item-value-name">{item.name}</div></div>
                </>
              ) : (
                item.name
              )}
              {item.child && <ListIcon />}
              {item.child && renderMenu(item.child)}
            </li>
          );
        })}
      </ul>
    );
  };

  return visible ? (
    <div className="context-menu-container">
      <div 
        ref={menuRef}
        className="context-menu"
        style={{ top: position.y, left: position.x }}
      >
        {renderMenu(menuData)}
      </div>
    </div>
  ) : null;
};

export default ContextMenu;