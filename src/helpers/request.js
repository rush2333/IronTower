import handleJson from './handle-json';
import handleFormData from './handle-formdata';
import handleUrlEncode from './handle-urlencode';
import history from '../history'
import { Modal } from "antd";

function request({ url, method = 'POST', dataType = 'json', data={}, success = () => { }, fail = () => { }, complete = () => { } }) {
    if (!url) {
        throw new Error('url参数不可缺省');
    }
    let xml = new XMLHttpRequest();
    if (method === 'GET') {
        xml.open(method, url + '?' +handleUrlEncode(data));
        xml.send();
    } else {
        xml.open(method, url);
        let dataData;
        switch (dataType) {
            case 'json':
                xml.setRequestHeader('Content-Type', 'application/json');
                dataData = handleJson(data);
                break;
            case 'formdata':
                // xml.setRequestHeader('Content-Type', "application/vnd.ms-excel");
                dataData = handleFormData(data);
                break;
            default:
                xml.setRequestHeader('Content-Type', 'application/json');
                dataData = handleJson(data);
        }
        xml.send(dataData);
    }
    xml.onreadystatechange = () => {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                let data = xml.responseText;
                let code = data.code;
                try {
                    if (code === undefined) throw new Error('code is not defined');
                } catch (e) {
                    // data = JSON.parse(data);
                }
                success(data);
            } else {
                alert('请求遇到了问题，请稍后再尝试');
                fail(data);
            }
            complete();
        }
    };
}


export default request;
