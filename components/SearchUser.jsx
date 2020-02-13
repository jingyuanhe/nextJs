import {Select,Spin} from 'antd'
import {useCallback,useState,useRef} from 'react'
import debounce from 'lodash/debounce'
import api from '../lib/api'
const Option=Select.Option;

 function SearchUser({onSearch,value}){
    let lastFetchIdRef=useRef(0);
    const [fetching,setFething]=useState(false);
    const [options,setOptions]=useState([]);
    const fetchUser=useCallback(debounce(value=>{
        setFething(true);
        setOptions([]);
        lastFetchIdRef.current+=1;
        const fetchId=lastFetchIdRef.current; 
        api.request({
            url:`/search/users?q=${value}`
        }).then(res=>{
                if(fetchId!==lastFetchIdRef.current){
                    return;
                }
                const data=res.data.items.map(item=>({
                    text:item.login,
                    value:item.login
                }));
                setFething(false);
                setOptions(data);
            })
        },500),[])
    const handleChange=value=>{
        setFething(false);
        setOptions([]);
        onSearch(value);
    }
    return (
    <Select
        value={value}
        style={{width:200}}
        showSearch={true}
        filterOption={false}
        placeholder='创建者'
        allowClear={true}
        onSearch={fetchUser}
        onChange={handleChange}
        notFoundContent={fetching?<Spin size='small'></Spin>:<span>nothing</span>}
    >
        {
            options.map(op=>(
                <Option key={op.value} value={op.value}>{op.text}</Option>
                )
            )
        }
    </Select>)
}
export default SearchUser