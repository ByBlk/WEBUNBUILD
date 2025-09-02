import { useState } from "react"
import { getCdnUrl } from "@utils/misc"

type AnimationCategory = "walk" | "emotes" | "expresion"

interface ButtonComponentProps {
  onCategoryChange: (category: AnimationCategory) => void
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onCategoryChange }) => {
  const [current, setCurrent] = useState<AnimationCategory>("emotes")

  const handleClick = (category: AnimationCategory) => {
    if (current !== category) {
      setCurrent(category)
      onCategoryChange(category)
    }
  }

  const buttons = [
    { key: "emotes" as const, icon: 'emote.svg', label: "Émotes" },
    { key: "walk" as const, icon: 'walk.svg', label: "Démarche" },
    { key: "expresion" as const, icon: 'sad.svg', label: "Expression" }
  ]

  const sortedButtons = [...buttons].sort((a, b) => 
    a.key === current ? -1 : b.key === current ? 1 : 0
  )

  return (
    <div className="category-navigation">
      {sortedButtons.map((button, index) => (
        <div
          key={button.key}
          className={current === button.key ? "active" : ""}
          onClick={() => handleClick(button.key as "walk" | "emotes" | "expresion")}
          style={{
            borderRadius: index === 0 ? ".9vh 0 0 0" : index === sortedButtons.length - 1 ? "0 .9vh 0 0" : "0"
          }}
        >
          <img src={getCdnUrl("assets/animations", button.icon)} />
          {current === button.key && <span style={{fontWeight: 400, fontFamily: "montserrat"}}>{button.label}</span>}
        </div>
      ))}
    </div>
  )
}

export default ButtonComponent
