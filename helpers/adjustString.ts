const adjustString = (str?: string, length: number = 20, dots: boolean = true) => {
    if (!str) return "";
    str = str.trim();
    // Return the string itself if it doesn't exceed the given size
    if (str.length < length) return str;
    return str.slice(0, length) + (dots ? "..." : "");
};

export default adjustString;