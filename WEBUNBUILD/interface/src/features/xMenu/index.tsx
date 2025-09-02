import './theme.scss';
import React, { useState } from 'react';
import { FactoryItems } from './items';
import { fetchNui, useNuiEvent } from '@/hook';
import textToStyled from '../../utils/textToStyled';

interface Item {
    id: number;
    label: string;
    checked: boolean;
    default: boolean;
    type: string;
    key: string;
}

interface Data {
    id: number;
    banner?: string;
    title: string;
    subtitle: string;
    item: Item[];
    itemsPerPage: number;
}

const Xmenu: React.FC = () => {
    const [visible, setVisible] = useState(false);
    useNuiEvent('nui:xmenu:visible', (visible: boolean) => {
        setVisible(visible);
    });
    const [id, setId] = useState(0);
    const [theme] = useState('theme');
    const [banner, setBanner] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemIndex, setSelectedItemIndex] = useState(() => {
        let initialIndex = 0;
        while (items[initialIndex]?.type === 'separator' || items[initialIndex]?.type === 'line') {
            initialIndex++;
        }
        return initialIndex;
    });

    useNuiEvent('nui:xmenu:setData', (data: Data) => {
        setId(data.id || 0);
        setBanner(data.banner || '');
        setTitle(data.title || '');
        setSubtitle(data.subtitle || '');
        setItems(data.item || []);
        setItemsPerPage(data.itemsPerPage || 10);
    });

    useNuiEvent('nui:xmenu:up', () => {
        let newIndex = selectedItemIndex - 1;
        while (newIndex >= 0 && (items[newIndex]?.type === 'separator' || items[newIndex]?.type === 'line')) {
            newIndex--;
        }
        setSelectedItemIndex(newIndex >= 0 ? newIndex : items.length - 1);
    });
    
    useNuiEvent('nui:xmenu:down', () => {
        let newIndex = selectedItemIndex + 1;
        while (newIndex < items.length && (items[newIndex]?.type === 'separator' || items[newIndex]?.type === 'line')) {
            newIndex++;
        }
        setSelectedItemIndex(newIndex < items.length ? newIndex : 0);
    });

    useNuiEvent('nui:xmenu:close', () => {
        fetchNui('onClose:' + id, {});
    });

    const currentPage = Math.floor(selectedItemIndex / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    const visibleItems = items.slice(startIndex, endIndex);

    return visible && (
        <div className={theme}>
            <div className={theme + '__banner'}>
                <img src={banner} alt=" " className={theme + '__banner__with_background'} />
                <div className={theme + '__banner__title'}>
                    <h1>{textToStyled(title)}</h1>
                </div>
            </div>
            <div className={theme + '__divider'}>
                <div className={theme + '__divider__subtitle'}>
                    <h1>{textToStyled(subtitle)}</h1>
                </div>
            </div>
            <div className={theme + '__content'}>
                {visibleItems.map((item, index) => (
                    <FactoryItems
                        key={item.id}
                        item={item}
                        theme={theme}
                        isSelected={index === (selectedItemIndex % itemsPerPage)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Xmenu;