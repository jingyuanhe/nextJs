import React from 'react'
import createStore from '../store/store'
const isServer=typeof window==='undefined';
const __NEXT_REDUX_STORE__='__NEXT_REDUX_STORE__';
function getOrCreateStore(initialState){
    if(isServer){
        return createStore(initialState)
    }
    if(!window[__NEXT_REDUX_STORE__]){
        window[__NEXT_REDUX_STORE__]=createStore(initialState);
    }
    return window[__NEXT_REDUX_STORE__]
}
export default Comp=>{
    class WithReduxApp extends React.Component{
        constructor(props){
            super(props);
            this.reduxStore=getOrCreateStore(props.initialReduxStore)
        }
        render(){
            const {pageProps,Component,...rest}=this.props;
            if(pageProps){
                pageProps.test='123'
            }
            return <Comp pageProps={pageProps} Component={Component} {...rest} reduxStore={this.reduxStore}></Comp>
        }
    }
    
    WithReduxApp.getInitialProps=async (ctx)=>{
        let appProps={};
        const reduxStore=getOrCreateStore();
        ctx.reduxStore=reduxStore;
        if(typeof Comp.getInitialProps==='function'){
            appProps=await Comp.getInitialProps(ctx);
        }
        
        return{
            ...appProps,
            initialReduxStore:reduxStore.getState()
        }
    };
    return WithReduxApp;
}