export const nothingToNull = (value: string | null): string | null => {
    let checkedValue = value;

    if (checkedValue == null) {
        return null;
    }
    checkedValue = checkedValue.trim();

    if (checkedValue.length === 0) {
        return null;
    }
    return value;
};
