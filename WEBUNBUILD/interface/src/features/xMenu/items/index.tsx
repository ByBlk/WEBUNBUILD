import {FunctionComponent} from "react";
import {FactoryButton} from "./component/ItemButton";
import {FactorySeparator} from "./component/ItemSeparator";
import {FactoryCheckbox} from "./component/ItemCheckBox";
import {FactorySlider} from "./component/ItemSlider";
import {FactoryList} from "./component/ItemList";
import {FactoryLine} from "./component/ItemLine";

export const FactoryItems: FunctionComponent<any> = ({item, theme, isSelected}) => {
    if (item.type === "button") {
        return <FactoryButton item={item} theme={theme} isSelected={isSelected}/>;
    } else if (item.type === "separator") {
        return <FactorySeparator item={item} theme={theme}/>;
    } else if (item.type === "checkbox") {
        return <FactoryCheckbox item={item} theme={theme} isChecked={item.checked} isSelected={isSelected}/>;
    } else if (item.type === "slider") {
        return <FactorySlider item={item} theme={theme} isSelected={isSelected}/>;
    } else if (item.type === "list") {
        return <FactoryList item={item} theme={theme} isSelected={isSelected}/>;
    } else if (item.type === "line") {
        return <FactoryLine item={item} theme={theme} isSelected={isSelected}/>;
    }
    return null;
};
