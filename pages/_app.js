import App,{Container} from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import withRedux from '../lib/with-redux.js'
import PageLoading from '../components/PageLoading'
import Router from 'next/router'
class MyApp extends App{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
    }
    startLoading(){
        this.setState({
            loading:true
        })
    }
    endLoading(){
        this.setState({
            loading:false
        })
    }
    componentDidMount() {
        Router.events.on('routeChangeStart',this.startLoading);
        Router.events.on('routeChangeComplete',this.endLoading);
        Router.events.on('routeChangeError',this.endLoading)
    }
  
    componentWillUnmount() {
        Router.events.off('routeChangeStart',this.startLoading);
        Router.events.off('routeChangeComplete',this.endLoading);
        Router.events.off('routeChangeError',this.endLoading)
    }
    static async getInitialProps(ctx){
        const {Component}=ctx;
        let pageProps={};
        if(Component.getInitialProps){
            pageProps=await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }
    render(){
        const {pageProps,Component,reduxStore}=this.props;
        return (
            <Provider store={reduxStore}>
                {this.state.loading?<PageLoading/>:null}
                <Layout>
                    <Component {...pageProps}></Component>
                </Layout>
            </Provider>
        )
    }
}
export default withRedux(MyApp);