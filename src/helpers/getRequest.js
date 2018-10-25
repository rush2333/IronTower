import handleUrlEncode from './handle-urlencode';

function getRequest({url, method="GET"}) {
  if (!url) {
    throw new Error('url参数不可缺省');
  }
  let xml = new XMLHttpRequest();
  
}