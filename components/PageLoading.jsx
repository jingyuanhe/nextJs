import {Spin} from 'antd'
export default ()=>{
   return <div className="root">
        <Spin></Spin>
        <style jsx>
            {
                `
                .root{
                    position:fixed;
                    left:0;
                    right:0;
                    top:0;
                    bottom:0;
                    z-index:10001;
                    background:rgba(255,255,255,.3);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                `
            }
        </style>
    </div>
}