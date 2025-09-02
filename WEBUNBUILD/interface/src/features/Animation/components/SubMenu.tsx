
import SubMenuItem from "@/features/Animation/components/SubMenuItem.tsx";

interface SubMenuProps {
  currentCategory: "walk" | "emotes" | "expresion"
  visible: boolean
  onClick: (subCategory: string) => void
  data: {
    categorySubcategories: {
      emotes: Record<string, any>;
      walk: Record<string, any>;
      expresion: Record<string, any>;
    },
  }
}

const SubMenu: React.FC<SubMenuProps> = ({ currentCategory, visible, onClick, data }) => {


  if (!visible) return null;


  const subCategories = Object.keys(data.categorySubcategories[currentCategory] || {});

  return (
    <div className="SubMenu">
      {subCategories.map((subCategory) => (
          <SubMenuItem key={subCategory} subCategory={subCategory} onClick={onClick}/>
      ))}
    </div>
  );
}

export default SubMenu;
