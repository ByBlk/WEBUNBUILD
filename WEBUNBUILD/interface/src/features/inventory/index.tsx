import { CategoryName, DragContainers, IInventoryItem, InventoryCategory, InventoryData } from "./types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InventoryItemGrid from "./components/item-grid";
import InventoryHud from "./components/hud";
import { useNuiEvent } from "@hooks/nuiEvent";
import InventoryCategoriesNavigation from "./components/categories-navigation";
import InventoryItem from "./components/item";
import InventoryWeaponSlots from "./components/weapon-slots";
import "./style.scss";
import { fetchNui } from "@hooks/fetchNui";
import { getDropAction } from "./utils";
import { useEnterKey, useEscapeKey, useKey } from "@hooks/useKeys";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { playOnClick2Sound, playOnSelectSound } from "@utils/playSound";

const Inventory: React.FC = () => {
  const [category, setCategory] = useState<InventoryCategory>('items');
  const [targetCategory, setTargetCategory] = useState<InventoryCategory>('items');
  const [selected, setSelected] = useState<IInventoryItem | IInventoryItem[] | undefined>();
  const [dragedItem, setDragedItem] = useState<IInventoryItem | undefined>(undefined);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragFrom = useRef<DragContainers | "">("");
  const dropTo = useRef<DragContainers | "">("");
  const dragTimeout = useRef<NodeJS.Timeout>();
  const [inventoryData, setInventoryData] = useState<InventoryData | undefined>();
  const [visible, setVisible] = useState(false);
  const [clickType, setClickType] = useState<"left" | "right" | undefined>("left");
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rename, setRename] = useState('');
  const [split, setSplit] = useState(1);
  const [targetFocus, setTargetFocus] = useState<string | undefined>(undefined);
  const [clothesFilter, setClothesFilter] = useState<CategoryName>('all');

  const clothesFilterList: { name: CategoryName, icon: string }[] = useMemo(() => [
    { name: 'all', icon: 'all.svg' },
    { name: 'outfit', icon: 'outfit.svg' },
    { name: 'hat', icon: 'hat.svg' },
    { name: 'top', icon: 'tShirt.svg' },
    { name: 'accessory', icon: 'accessory.svg' },
    { name: 'bottom', icon: 'bottomClothe.svg' },
    { name: 'shoe', icon: 'shoe.svg' }
  ], []);

  const chestInteraction = useMemo(() => {
    return !!inventoryData?.target
  }, [inventoryData])

  useEnterKey(() => {
    if (targetFocus === undefined || selected === undefined) return;
    switch (targetFocus) {
      case 'rename':
        setTargetFocus(undefined);
        fetchNui('nui:inventory:rename', { item: selected, name: rename });
        break;
      case 'split':
        fetchNui('nui:inventory:split', { item: selected, split })
        break;
    }
  })

  useEffect(() => {
    setRename('');
    setSplit(1);
  }, [targetFocus]);

  useEffect(() => {
    if (selected && !Array.isArray(selected) && selected.count !== undefined) {
      setQuantity(selected.count);
    }
  }, [selected]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (visible && event.key === 'Control') {
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (visible && event.key === 'Control') {
        setIsAltPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [visible]);

  useEffect(() => {
    setMultiSelect(isAltPressed);
  }, [isAltPressed]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event?.target.select();

  useKey('e', () => {
    if (targetFocus === 'rename') return;
    if (!selected) return;
    if (!chestInteraction)
      fetchNui('nui:inventory:give', { item: selected, quantity: quantity ?? 1 })
    else
      fetchNui('nui:inventory:trade', { item: selected, source: dragFrom.current, quantity })
  });

  useKey('y', () => {
    if (targetFocus === 'rename') return;
    if (!selected) return;
    fetchNui('nui:inventory:drop', { item: selected, quantity: quantity ?? 1 });
  });

  useNuiEvent<boolean>('nui:inventory:visible', (status) => {
    setVisible(status);
    if (!status) {
      fetchNui('nui:inventory:drag-item', { isDragging: false });
    }
  });

  useNuiEvent<InventoryData>('nui:inventory:data', (data) => {
    setInventoryData(data);
    setSelected(undefined);
  });

  useEffect(() => {
    if (visible) {
      fetchNui('nui:inventory:drag-item', {
        isDragging: dragedItem !== undefined
      });
    }
  }, [dragedItem]);

  useEffect(() => {
    setTargetFocus(undefined);
  }, [clickType]);

  useEscapeKey(() => {
    fetchNui('nui:inventory:close');
  }, visible, 'keypress');

  const setDropTo = useCallback((to: DragContainers | "") => (dropTo.current = to), []);

  const startDrag = useCallback((item: IInventoryItem | undefined, from: DragContainers) => {
    setClickType("left");
    dragTimeout.current = setTimeout(() => {
      setDragedItem(item);
      dragFrom.current = from;

      if (!Array.isArray(selected) ? selected?.id !== item?.id : selected.some(e => e?.id === item?.id)) {
        const fromParsed = () => {
          if (from === "target") return "target";
          if (from === "inventory") return "inventory";
          if (from === "weapon-slots") return "inventory";
          if (["weapon1", "weapon2", "weapon3", "weapon4", "weapon5"].includes(from)) return from;
          return ""
        };

        dragFrom.current = fromParsed()
      }
    }, 150);
  }, [selected]);

  const mouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const displayedItems = useMemo(() => {
    if (!inventoryData) return [];
    if (category === 'clothes') {
      if (clothesFilter === 'all')
        return inventoryData.items.filter(item => item.type === 'clothes');
      return inventoryData.items.filter(item => item.type === 'clothes' && item.name === clothesFilter);
    }
    return inventoryData.items.filter(item => (category === "keys" ? item.name === "keys" : item.type === category && item.name !== "keys"));
  }, [inventoryData, category, clothesFilter]);

  
  const targetDisplayedItems = useMemo(() => {
    if (!inventoryData?.target) return [];
    if (!inventoryData.target.search) return inventoryData.target.items;
    
    if (targetCategory === 'clothes') {
      if (clothesFilter === 'all')
        return inventoryData.target.items.filter(item => item.type === 'clothes');
      return inventoryData.target.items.filter(item => item.type === 'clothes' && item.name === clothesFilter);
    }
    return inventoryData.target.items.filter(item => (targetCategory === "keys" ? item.name === "keys" : item.type === targetCategory && item.name !== "keys"));
  }, [inventoryData, targetCategory, clothesFilter]);

  const mouseUp = useCallback(() => {
    if (dragedItem != null) {
      if (dragFrom.current) {
        let dropTarget = dropTo.current;
        if (!dropTarget) {
          const element = document.elementFromPoint(mousePos.x, mousePos.y);
          if (element?.id === "inventory" || element?.id === "weapon-slots") {
            dropTarget = "throw";
          }
        }
        if (dropTarget) {
          const action = getDropAction(dragFrom.current, dropTarget, dragedItem, selected, quantity ?? 1);
          if (action) action();
        }
      }
      setDragedItem(undefined);
    }
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
      dragTimeout.current = undefined;
    }
  }, [dragedItem, mousePos, selected]);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [mouseMove, mouseUp]);

  const onTargetCategoryChange = useCallback((newCategory: InventoryCategory) => {
    dragFrom.current = "";
    dropTo.current = "";
    setTargetCategory(newCategory);
    sessionStorage.setItem("inventory_target_category", newCategory);
  }, []);


  const onCategoryChange = useCallback((newCategory: InventoryCategory) => {
    dragFrom.current = "";
    dropTo.current = "";
    setCategory(newCategory);
    sessionStorage.setItem("inventory_category", newCategory);
  }, []);

  const onItemClick = useCallback((item: IInventoryItem, from: "inventory" | "target") => {
    setClickType("left")
    dragFrom.current = from;
    if (multiSelect) {
      playOnSelectSound();
      setSelected(old => {
        if (!old) {
          return [item];
        }
        if (!Array.isArray(old)) {
          return [old, item]
        }
        return old.find(e => e.id === item.id) !== undefined ? old.filter(e => e.id !== item.id) : [...old, item]
      });
      return
    } else {
      if (selected && selected != item) {
        playOnSelectSound();
      }
      setSelected(item);
    }
  }, [selected, clickType, multiSelect]);

  return (<>
    {visible && inventoryData && <div id="inventory" className={`inventory-wrapper` + (chestInteraction ? ' chest' : '')} style={{ background: '#00000045' }}>
      <InventoryHud
        thirst={inventoryData?.thirst ?? 100}
        hunger={inventoryData?.hunger ?? 100}
        maxWeight={inventoryData?.maxWeight ?? 100}
        currentWeight={inventoryData?.currentWeight ?? 100}
        playerInfo={inventoryData?.playerInfo}
      />
      {!!dragedItem && (
        <div
          className="item-container disable-hover dragging-item"
          style={{
            width: "120px",
            height: "120px",
            left: Math.ceil(mousePos.x - 120 / 2) + "px",
            top: Math.ceil(mousePos.y - 120 / 2) + "px",
            scale: 'var(--scale)'
          }}>
          <InventoryItem draggedLength={Array.isArray(selected) && selected.length > 1 ? selected.length : undefined} {...dragedItem} dragged={false} selected={false} />
        </div>
      )}
      <div className="inventory-base-container" style={inventoryData?.target ? { scale: 'var(--scale)', transformOrigin: 'center' } : {}}>
        <div className="player-inventory">
          <div className="inventory-main-container" style={!inventoryData?.target ? { scale: 'var(--scale)', transformOrigin: 'left' } : {}}>
            <InventoryCategoriesNavigation current={category ?? 'items'} onChange={onCategoryChange} />
            <div className="inventory-grids-container">
              {category === 'clothes' && <div className="clothes-filters">
                {clothesFilterList.map(e => <div className={"clothes-filter" + (e?.name === clothesFilter ? ' active' : '')} onClick={() => {
                  setClothesFilter(e.name);
                  playOnClick2Sound();
                }}>
                  <MediaCdn path="assets/icons" name={e.icon} />
                </div>)}
              </div>}
              <InventoryItemGrid
                containerName="inventory"
                separateByName={category === "clothes"}
                separateByWeight={category === "weapons"}
                items={displayedItems}
                onItemClick={i => onItemClick(i, "inventory")}
                setDropTo={setDropTo}
                onItemDragStart={i => startDrag(i, "inventory")}
                draggedItem={dragedItem}
                selectedItem={selected}
                selectedItems={Array.isArray(selected) ? selected : undefined}
                onItemRightClick={(item) => { setSelected(item); setClickType("right") }}
              />
            </div>
            {clickType === "left" && selected && !chestInteraction && <div className="action-buttons">
              <div className={"button-container" + (multiSelect ? ' active' : '')} onClick={() => {
                setMultiSelect(old => !old);
                playOnClick2Sound();
              }}>
                <div className="button"
                  style={{ paddingLeft: 21 }}>
                  <MediaCdn path="assets/icons" name="selection.svg" props={{
                    style: {
                      'left': 28
                    }
                  }} />
                  Sélection</div>
                <div className="alt-button" style={{ paddingLeft: 40 }}>
                  <div className="boxCtrl">CTRL</div>
                  Sélection</div>
              </div>

              <div className="button-container" onClick={() => {
                if (!!selected) {
                  fetchNui('nui:inventory:throw-item', { item: selected, quantity: quantity ?? 1 });
                  playOnClick2Sound();
                }
              }}
                onMouseEnter={() => setDropTo('throw')}
                onMouseLeave={() => setDropTo('')}
              >
                <div className="button"
                  style={{ paddingLeft: 27 }}>
                  <MediaCdn path="assets/icons" name="cross.svg" props={{
                    style: {
                      'left': 32
                    }
                  }} />
                  Jeter</div>
                <div className="alt-button" style={{ paddingLeft: 30 }}>
                  <div className="box">Y</div>
                  Jeter</div>
              </div>
              <div className="button-container"
                onClick={() => {
                  if (!!selected) {
                    fetchNui('nui:inventory:give', { item: selected, quantity: quantity ?? 1 });
                    playOnClick2Sound();
                  }
                }}
                onMouseEnter={() => setDropTo('give')}
                onMouseLeave={() => setDropTo('')}
                style={{ borderRadius: "2px 2px 10px 2px" }}
              >
                <div className="button"
                  style={{ paddingLeft: 24 }}>
                  <MediaCdn path="assets/icons" name="mouse-arrow.svg" props={{
                    style: {
                      'left': 26
                    }
                  }} />
                  Donner</div>
                <div className="alt-button" style={{ paddingLeft: 40 }}>
                  <div className="box">E</div>
                  Donner</div>
              </div>
            </div>}
            {clickType === "right" && selected && !chestInteraction && <div className="action-buttons">
              <div className={`button-container ${targetFocus === 'quantity' ? 'active' : ''}`} onClick={() => {
                setTargetFocus('quantity');
                playOnClick2Sound();
              }}>
                <div className="button" style={{ paddingLeft: 20 }}>
                  <MediaCdn
                    path="assets/icons"
                    name="quantity.svg"
                    props={{
                      style: {
                        left: 20,
                      },
                    }}
                  />
                  Quantité
                </div>
                <div className="alt-button">
                  <div className="box" />
                  <MediaCdn path="assets/icons" name="quantity.svg" />
                  <input
                    autoFocus={targetFocus === 'quantity'}
                    onBlur={() => setTargetFocus(undefined)}
                    type="number"
                    min="1"
                    max={!Array.isArray(selected) ? selected?.count || 1 : 1}
                    value={quantity}
                    onFocus={handleFocus}
                    onChange={(e) => {
                      const value = Number(e?.currentTarget?.value ?? 0);
                      if (value >= 1 && value <= (!Array.isArray(selected) ? selected?.count || 1 : 1)) {
                        setQuantity(value);
                      }
                    }}
                  />
                </div>
              </div>

              <div className={`button-container ${targetFocus === 'split' ? 'active' : ''}`} onClick={() => {
                setTargetFocus('split');
                playOnClick2Sound();
              }}>
                <div className="button" style={{ paddingLeft: 20 }}>
                  <MediaCdn
                    path="assets/icons"
                    name="split.svg"
                    props={{
                      style: {
                        left: 15,
                      },
                    }}
                  />
                  Split</div>
                <div className="alt-button">
                  <div className="box" />
                  <MediaCdn path="assets/icons" name="split.svg" props={{
                    style: {
                      left: 15,
                    },
                  }} />
                  <input
                    autoFocus={targetFocus === 'split'}
                    onBlur={() => setTargetFocus(undefined)}
                    onFocus={handleFocus}
                    type="number"
                    min="1"
                    max={!Array.isArray(selected) ? selected?.count || 1 : 1}
                    value={split}
                    onChange={(e) => {
                      const value = Number(e?.currentTarget?.value ?? 0);
                      if (value >= 1 && value <= (!Array.isArray(selected) ? selected?.count || 1 : 1)) {
                        setSplit(value);
                      }
                    }}
                  />
                </div>
              </div>

              <div className={`button-container ${targetFocus === 'rename' ? 'active' : ''}`} onClick={() => {
                setTargetFocus('rename');
                fetchNui('nui:inventory:focus');
                playOnClick2Sound();
              }}>
                <div className="button" style={{ paddingLeft: 20 }}>
                  <MediaCdn path="assets/icons" name="rename.svg" props={{
                    style: {
                      left: 17,
                    },
                  }} />
                  Renommer</div>
                <div className="alt-button">
                  <div className="box" />
                  <MediaCdn path="assets/icons" name="rename.svg" props={{
                    style: {
                      left: 17,
                    },
                  }} />
                  <input
                    autoFocus={targetFocus === 'rename'}
                    onBlur={() => { setTargetFocus(undefined); fetchNui('nui:inventory:unfocus') }}
                    onFocus={handleFocus}
                    type="text"
                    value={rename}
                    onChange={(e) => {
                      const value = e?.currentTarget?.value || '';
                      if (value.length <= 20) {
                        setRename(value);
                      }
                    }}
                    maxLength={20}
                  />
                </div>
              </div>

            </div>}
          </div>
        </div>
        {chestInteraction && <div className="middle-action-buttons">
          <div className="button-container"
            onClick={() => {
              if (!!selected) {
                fetchNui('nui:inventory:trade', { selected, source: dragFrom.current, quantity });
                playOnClick2Sound();
              }
            }}
            onMouseEnter={() => setDropTo('give')}
            onMouseLeave={() => setDropTo('')}
            style={{ marginBottom: 'auto', marginTop: 363 }}
          >
            <div className="button"
              style={{ paddingLeft: 18 }}>
              <MediaCdn path="assets/icons" name="mouse-arrow.svg" props={{
                style: {
                  'left': 25
                }
              }} />
              Échanger</div>
            <div className="alt-button" style={{ paddingLeft: 45 }}>
              <div className="box">E</div>
              Échanger</div>
          </div>
          {((Array.isArray(selected) && selected.length === 1)) || !Array.isArray(selected) &&
            <div className={`button-container ${targetFocus === 'quantity' ? 'active' : ''}`} onClick={() => {
              setTargetFocus('quantity');
              playOnClick2Sound();
            }}>
              <div className="button" style={{ paddingLeft: 20 }}>
                <MediaCdn
                  path="assets/icons"
                  name="quantity.svg"
                  props={{
                    style: {
                      left: 27,
                    },
                  }}
                />
                Quantité
              </div>
              <div className="alt-button">
                <div className="box" />
                <MediaCdn path="assets/icons" name="quantity.svg" />
                <input
                  autoFocus={targetFocus === 'quantity'}
                  onBlur={() => setTargetFocus(undefined)}
                  type="number"
                  min="1"
                  max={!Array.isArray(selected) ? selected?.count || 1 : 1}
                  value={quantity}
                  onFocus={handleFocus}
                  onChange={(e) => {
                    const value = Number(e?.currentTarget?.value ?? 0);
                    if (value >= 1 && value <= (!Array.isArray(selected) ? selected?.count || 1 : 1)) {
                      setQuantity(value);
                    }
                  }}
                />
              </div>
            </div>}

          <div className={"button-container" + (multiSelect ? ' active' : '')} onClick={() => {
            setMultiSelect(old => !old);
            playOnClick2Sound();
          }} style={{ marginTop: 10 }}>
            <div className="button"
              style={{ paddingLeft: 21 }}>
              <MediaCdn path="assets/icons" name="selection.svg" props={{
                style: {
                  'left': 28
                }
              }} />
              Sélection</div>
            <div className="alt-button" style={{ paddingLeft: 40 }}>
              <div className="boxCtrl">CTRL</div>
              Sélection</div>
          </div>
        </div>}
        {!!inventoryData.target && (
          <div className="target-inventory">
            <div className="inventory-main-container">
              {inventoryData.target.search ? (
                <InventoryCategoriesNavigation current={targetCategory ?? 'items'} onChange={onTargetCategoryChange} />
              ) : (
                <div className="inventory-target-header">
                  <MediaCdn path="assets/icons" name="items.svg" />
                  <div className="inventory-target-name">{inventoryData.target.name}</div>
                  <div
                    className="inventory-target-weight"
                    style={{ backgroundImage: 'url("https://cdn.eltrane.cloud/3838384859/https://cdn.eltrane.cloud/3838384859/cdnweight.svg")' }}>
                    <svg height="40" width="40">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="3"
                      />
                    </svg>
                    <svg height="40" width="40">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="white"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 16 * (inventoryData.target.currentWeight / inventoryData.target.maxWeight)}, ${2 * Math.PI * 16}`}
                        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="inventory-grids-container">
                <InventoryItemGrid
                  containerName="target"
                  items={targetDisplayedItems}
                  onItemClick={i => onItemClick(i, "target")}
                  setDropTo={setDropTo}
                  onItemDragStart={i => startDrag(i, "target")}
                  selectedItem={selected}
                  draggedItem={dragedItem}
                  selectedItems={Array.isArray(selected) ? selected : undefined}
                  onItemRightClick={(item) => { setSelected(item); setClickType("right") }}
                />
              </div>
            </div>
          </div>
        )}
        {!chestInteraction && <InventoryWeaponSlots
          onItemDragStart={startDrag}
          setDropTo={setDropTo}
          shortcuts={inventoryData.shortcuts}
          items={inventoryData?.items ?? []}
          show={inventoryData?.showShortcut ?? true}
          toggleShowShortcuts={() => {
            playOnClick2Sound();
            fetchNui('nui:inventory:toggle-shortcuts');
          }}
        />}
      </div>
    </div>}
  </>
  );
};

export default Inventory;
