import handleJson from './handle-json';
import handleFormData from './handle-formdata';
import history from '../history'
import {Modal} from "antd";

function request({ url, method = 'POST', postType = 'json' ,data = {}, success = () => {}, fail = () => {}, complete = () => {}}) {
    if(!url){
        throw new Error('url参数不可缺省');
    }
    let xml = new XMLHttpRequest();
    xml.open(method, url);
    let postData ;
    switch (postType){
        case 'json':
            xml.setRequestHeader('Content-Type', 'application/json');
            postData = handleJson(data);
            break;
        case 'formdata':
            // xml.setRequestHeader('Content-Type', "application/vnd.ms-excel");
            postData = handleFormData(data);
            break;
        default:
            xml.setRequestHeader('Content-Type', 'application/json');
            postData = handleJson(data);
    }
    xml.onreadystatechange = () => {
        if(xml.readyState === 4){
            if(xml.status === 200){
                let data = xml.responseText;
                let code = data.code;
                try{
                    if(code === undefined) throw new Error('code is not defined');
                }catch(e){
                    data = JSON.parse(data);
                }
                success(data);
                // if(code === 200){
                //     console.log(data)
                //     success(data);
                // }
            }else{
                alert('请求遇到了问题，请稍后再尝试');
                fail(data);
            }
            complete();
        }
    };
    xml.send(postData);

}


export default request;
