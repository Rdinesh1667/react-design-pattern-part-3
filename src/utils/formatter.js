export const readMoreFormatter = (text, maxLength = 20) => {
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)}...`;
}
