import handleUrlEncode from './handle-urlencode';
let exportFile = ({url = '', data = {}}) => {
    window.open(url + '?' + handleUrlEncode(data));
};
export default exportFile;