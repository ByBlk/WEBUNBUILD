export type RadialMenuData = {
    elements: { name: string; icon?: string; action?: string; args?: string }[],
    title?: string,
    key?: string,
    bar?: {
        crew: string,
        time: string,
        color: string,
        value: string,
        valueString: string,
        rank: string,
        postAsync: {
            url: string,
            data: any,
        },
    },
    hideKey?: string,
    keyAction?: string,
    hideShortcut?: string,
    shortcut?: string;
    shortcutAction?: string;
    size?: number;
}