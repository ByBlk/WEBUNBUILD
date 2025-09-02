import {useState} from 'react';
import {getCdnUrl} from "@/utils";

interface SubMenuItemProps {
    subCategory: string;
    onClick: (subCategory: string) => void;
}

const SubMenuItem = ({subCategory, onClick}: SubMenuItemProps) => {

    const [isOver, setIsOver] = useState(false);
    return (
        <div key={subCategory} className="SubMenu__item" onClick={() => onClick(subCategory)}
             onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <div className="SubMenu__Container">
                <div className="SubMenu__Icons">
                    <img src={getCdnUrl("assets/menu-anim/Categories/", subCategory + `_${isOver ? "r" : "b"}.svg`)}
                         className="SubMenu__Icons"/>
                </div>
                <span style={{fontWeight: isOver ? 500 : 300}}>{subCategory}</span>
            </div>
            {isOver && <img src={getCdnUrl("assets/animations", "arrow.svg")} className="SubMenu__arrow"/>}
        </div>
    );
};

export default SubMenuItem;