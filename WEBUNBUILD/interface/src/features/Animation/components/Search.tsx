import React, {useEffect, useRef} from "react";

interface SearchComponentsProps {
    placeholder: string;
    searchValue: string;
    setSearchValue: (value: string) => void;
    setIsOnInput: (value: boolean) => void;
}

const SearchComponent: React.FC<SearchComponentsProps> = ({ placeholder, searchValue, setSearchValue, setIsOnInput }) => {

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const cleanup = () => {
            setIsOnInput(false);
            inputRef.current?.blur();
        };

        const timer = setTimeout(cleanup, 6000);

        return () => clearTimeout(timer);
    }, [inputRef.current]);

    return (
        <div className="search" >
            <input
                ref={inputRef}
                type="text"
                className="search__input"
                placeholder={placeholder}
                value={searchValue}
                onFocusCapture={() => setIsOnInput(true)}
                onBlur={() => setIsOnInput(false)}
                onChange={(e) => setSearchValue(e.target.value)}

            />
        </div>
    );
};

export default SearchComponent;
