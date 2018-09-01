let handleUrlEncode = (data) => {
    return Object.keys(data).map(key => {
        return key + '=' + data[key];
    }).join('&');
};
export default handleUrlEncode;