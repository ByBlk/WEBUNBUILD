import "./style/index.scss";
import {useEffect, useState} from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import {
    CategoriesComponent,
    ButtonComponent,
    SearchComponent,
    SubMenu,
    ItemsComponent,
    FavorisComponent
} from "./components";
import {useEscapeKey, useBackspaceKey} from "@hooks/useKeys";

interface ItemData {
    label?: string;
    category?: string;
    name: string;
    dist: string;
    shared?: boolean;
}

interface SubCategoryData {
    [subCategory: string]: ItemData[];
}

const Animation: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<"walk" | "emotes" | "expresion">("emotes");
    const [showCategories, setShowCategories] = useState(true);
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [items, setItems] = useState<ItemData[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [isOnInput, setIsOnInput] = useState(false);
    const [filteredEmotes, setFilteredEmotes] = useState<ItemData[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const [categorySubcategories, setCategorySubcategories] = useState<{
        emotes: SubCategoryData;
        walk: SubCategoryData;
        expresion: SubCategoryData;
    }>({
        emotes: {},
        walk: {},
        expresion: {}
    });

    const sendInputState = (state: boolean) => {
        fetchNui("nui:animation:input", {value: state});
    }

    useEffect(() => {
        sendInputState(isOnInput);
    }, [isOnInput]);

    useEffect(() => {
        const favs = localStorage.getItem("favorites-anim")
        if (favs) {
            setFavorites(JSON.parse(favs));
        }
    }, []);

    const toggleFavorite = (item: ItemData) => {
        const newFavorites = favorites.includes(item.name)
            ? favorites.filter((i) => i !== item.name)
            : [...favorites, item.name];

        setFavorites(newFavorites);
        localStorage.setItem("favorites-anim", JSON.stringify(newFavorites));
    };

    const getFavoritesItems = (): ItemData[] => {
        const allItems: ItemData[] = [];
        Object.values(categorySubcategories[currentCategory]).forEach(subCategoryItems => {
            allItems.push(...subCategoryItems);
        });
        return allItems.filter(item => favorites.includes(item.name));
    };

    useEscapeKey(() => {
        fetchNui('nui:animation:close');
    }, visible, 'keydown');

    useNuiEvent("nui:animation:data", (data: any) => {
        const subcategories = data.subcategories || {
            emotes: {},
            walk: {},
            expresion: {}
        };

        setCategorySubcategories(subcategories);

        if (subcategories[currentCategory] && selectedSubCategory) {
            const subCategoryItems = subcategories[currentCategory][selectedSubCategory] || [];
            setItems(subCategoryItems);
        }
    });

    useNuiEvent("nui:animation:visible", (status: boolean) => {
        setVisible(status);
        // Réinitialiser l'état du input quand le menu se ferme
        if (!status) {
            setIsOnInput(false);
            sendInputState(false);
        }
    });

    const handleDisplayingFilteredItems = (value: string) => {
        setSearchValue(value);

        let itemsToFilter: ItemData[] = [];

        Object.values(categorySubcategories[currentCategory]).forEach(subCategoryItems => {
            itemsToFilter = [...itemsToFilter, ...subCategoryItems];
        });

        const filtered = itemsToFilter.filter(item =>
            item.label!.toLowerCase().includes(value.toLowerCase())
        ).sort((a, b) => {
            const aLabel = a.label?.toLowerCase() || a.name.toLowerCase();
            const bLabel = b.label?.toLowerCase() || b.name.toLowerCase();
            return aLabel > bLabel ? 1 : -1;
        });

        setFilteredEmotes(filtered);
    };

    const handleCategoryChange = (category: "walk" | "emotes" | "expresion") => {
        setCurrentCategory(category);
        setShowCategories(true);
        setShowSubCategories(false);
        setSelectedSubCategory(null);
        setItems([]);
        setSearchValue("");
        setFilteredEmotes([]);
    };

    const handleCategoriesClick = () => {
        setShowCategories(false);
        setShowSubCategories(true);
        setFilteredEmotes([]);
    };

    const handleSubMenuClick = (subCategory: string) => {
        if (subCategory === "favoris") {
            const favoritesItems = getFavoritesItems();
            setItems(favoritesItems);
        } else {
            const subCategoryItems = categorySubcategories[currentCategory]?.[subCategory] || [];
            setItems(subCategoryItems);
        }

        setSelectedSubCategory(subCategory);
        setShowSubCategories(false);
        setShowCategories(false);
        setSearchValue("");
        setFilteredEmotes([]);
    };

    useBackspaceKey(() => {
        // Si on est en train de taper et qu'il reste des caractères, on ne fait rien
        if (isOnInput && searchValue.length > 0) return;

        // Si on supprime le dernier caractère, on vide juste la recherche sans fermer
        if (isOnInput && searchValue.length === 0) {
            setSearchValue("");
            setFilteredEmotes([]);
            setItems([]);
            return;
        }

        // Le reste de la logique pour la navigation par backspace
        if (showCategories) {
            setVisible(false);
            fetchNui('nui:animation:close');
            return;
        }

        if (showSubCategories) {
            if (selectedSubCategory === "favoris") {
                setShowSubCategories(false);
                setShowCategories(true);
                setSelectedSubCategory(null);
                return;
            }

            setShowSubCategories(false);
            setShowCategories(true);
            setSelectedSubCategory(null);
            return;
        }

        if (selectedSubCategory) {
            setShowSubCategories(true);
            setShowCategories(false);
            setSelectedSubCategory(null);
        }
    });


    const placeholder = currentCategory === "emotes"
        ? "Rechercher une emote"
        : currentCategory === "walk"
            ? "Rechercher une démarche"
            : "Rechercher une expression";

    const showFilteredResults = filteredEmotes.length > 0;
    const showItemsList = selectedSubCategory && !showFilteredResults;
    const showCategoriesSection = showCategories && !showSubCategories && !showFilteredResults;

    return visible ? (
        <div className="AnimationContainer">
            <ButtonComponent onCategoryChange={handleCategoryChange}/>

            <SearchComponent
                placeholder={placeholder}
                searchValue={searchValue}
                setSearchValue={handleDisplayingFilteredItems}
                setIsOnInput={setIsOnInput}
            />

            {showCategoriesSection && (
                <>
                    <CategoriesComponent
                        onClick={handleCategoriesClick}
                        currentCategory={currentCategory}
                        showSubCategories={showSubCategories}
                        onSelectSubCategory={() => {}}
                    />
                    <FavorisComponent
                        onClick={() => handleSubMenuClick("favoris")}
                        currentCategory={currentCategory}
                        onSelectSubCategory={() => handleSubMenuClick("favoris")}
                    />
                </>
            )}

            <SubMenu
                currentCategory={currentCategory}
                visible={showSubCategories && !showFilteredResults}
                onClick={handleSubMenuClick}
                data={{categorySubcategories}}
            />

            {showFilteredResults && (
                <div className="Items-Container">
                    <ItemsComponent data={filteredEmotes} favoritesAnim={favorites} toggleFavorite={toggleFavorite}/>
                </div>
            )}

            {!showFilteredResults && selectedSubCategory === "favoris" && (
                <div className="Items-Container">
                    <ItemsComponent data={getFavoritesItems()} favoritesAnim={favorites}
                                    toggleFavorite={toggleFavorite}/>
                </div>
            )}

            {!showFilteredResults && selectedSubCategory !== "favoris" && showItemsList && (
                <div className="Items-Container">
                    <ItemsComponent
                        data = {
                            items
                                .filter((i) => i.name.toLowerCase().includes(searchValue.toLowerCase()))
                                .sort((a, b) => {
                                    const aLabel = a.label?.toLowerCase() || a.name.toLowerCase();
                                    const bLabel = b.label?.toLowerCase() || b.name.toLowerCase();
                                    return aLabel > bLabel ? 1 : -1;
                                })
                        }
                        favoritesAnim={favorites} toggleFavorite={toggleFavorite}/>
                </div>
            )}

            <div className="Key">
                <div className="KeyButton">
                    <div className="KeyButton__Text"><span>Copier</span></div>
                    <div className="KeyButton__key">U</div>
                </div>
                <div className="KeyButton">
                    <div className="KeyButton__Text">Stop</div>
                    <div className="KeyButton__key">X</div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Animation;