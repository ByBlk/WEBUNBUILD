import React, { useEffect } from "react";
import "./style.scss";
import {fetchNui, useNuiEvent} from "@/hook";
import {useEscapeKey} from "@hooks/useKeys.tsx";

const KeyboardInput: React.FC = () => {
    const [visible, setVisible] = React.useState(false);
    const [data, setData] = React.useState({ title: "", defaultValue: "" });

    useNuiEvent('nui:keyboardinput:visible', (status: boolean) => {
        setVisible(status)
    });

    useNuiEvent('nui:keyboardinput:setData', (receiveData: never) => {
        setData(receiveData)
    });

    const [value, setValue] = React.useState(data.defaultValue || "");

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleValidate = () => {
        fetchNui("nui:keyboardinput:response", { value });
        setValue("");
    };

    const handleCancel = () => {
        fetchNui("nui:keyboardinput:response", { value: null });
    };

    useEscapeKey(() => {
        handleCancel();
    }, visible);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [visible,inputRef]);

    return visible ? (
        <div className="KeyboardInput">
            <h1>{data.title}</h1>
            <input
                ref={inputRef}
                value={value}
                placeholder={`${data.title}...`}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        handleValidate();
                    }
                }}
            />
        </div>
    ) : null;
};

export default KeyboardInput;
