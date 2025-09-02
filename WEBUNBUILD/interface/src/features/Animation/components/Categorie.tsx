import type React from "react"
import { getCdnUrl } from "@utils/misc"

interface CategoriesComponentProps {
  onClick: () => void
  currentCategory: "walk" | "emotes" | "expresion"
  showSubCategories: boolean
  onSelectSubCategory: (subCategory: string) => void
}


const CategoriesComponent: React.FC<CategoriesComponentProps> = ({
  onClick,
  showSubCategories,
}) => {


  if (!showSubCategories) {
    return (
      <div className="Categories" onClick={onClick}>
          <div className="Categories__Text">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg"
                   className="categories-icon">
                  <path
                      d="M6.56704 10.4202H9.99374V8.70681H6.56704V10.4202ZM0.570312 0.140053V1.8534H15.9905V0.140053H0.570312ZM3.14034 6.13678H13.4204V4.42343H3.14034V6.13678Z"
                      fill="url(#paint0_linear_10173_187)"/>
                  <defs>
                      <linearGradient id="paint0_linear_10173_187" x1="8.28039" y1="0.140053" x2="8.28039" y2="10.4202"
                                      gradientUnits="userSpaceOnUse">
                          <stop stop-color="white"/>
                          <stop offset="1" stop-color="#D3D3D3"/>
                      </linearGradient>
                  </defs>
              </svg>

              <h1>Catégories</h1>
          </div>
          <div className="Categories__img">
              <img src={getCdnUrl("assets/animations", "arrow.svg")}/>
          </div>
      </div>
    )
  }

    return null
}

export default CategoriesComponent

