let handleFormData = (data) => {
    let ret = new FormData();
    Object.keys(data).map(k => {
        if(Array.isArray(data[k])){
            data[k].forEach(d => {
                ret.append(k,d);
            })
        }else{
            ret.append(k,data[k]);
        }
    });
    return ret;
};
export default handleFormData;