import { NOTIFICATION_COLORS_ASSOCIATION } from "./staticData"

export const getTextColor = (type: string) => {
    return NOTIFICATION_COLORS_ASSOCIATION.find((_noti) => _noti.type === type)?.color
}

export const parseNotificationContentKeys = (content: string) => {
    if (!content) return content
    const REG = /~K\s*(\w+)/g
    const matchedArray = content.match(REG)

    if (!matchedArray) return content

    for (const matchedKey of matchedArray) {
        content = content.replace(
            REG,
            `<span class="special-key">${matchedKey}</span>`,
        )
        content = content.replace('~K', '')
    }

    return content
}

export const parseNotificationContentColors = (content: string, type: string) => {
    const REG = /~[sc]/g
    const matchedArray = content?.match(REG)
    const color = getTextColor(type)
    if (!color) return ({ content, hasSpecialColor: false, color: undefined })
    content = parseNotificationContentKeys(content)

    if (!matchedArray) return { content, hasSpecialColor: false, color }

    for (const matchedKey of matchedArray) {
        content =
            matchedKey === '~c'
                ? content.replace(`${matchedKey}`, `</span>`)
                : content.replace(
                    `${matchedKey}`,
                    `<span class="special-color" style="--color: ${color}">`,
                )
    }

    return { content, hasSpecialColor: true, color }
}