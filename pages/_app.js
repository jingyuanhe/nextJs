import App,{Container} from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout'
import MyContext from '../lib/my-context'
import store from '../store/store'
import { Provider } from 'react-redux'
class MyApp extends App{
    state={
        context:'value'
    }
    static async getInitialProps({Component,router,ctx}){
        let pageProps={};
        if(Component.getInitialProps){
            pageProps=await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }
    render(){
        const {pageProps,Component}=this.props;
        return (
            <Layout>
                <Provider store={store}>
                    <MyContext.Provider value={this.state.context}>
                        <Component {...pageProps}></Component>
                    </MyContext.Provider>
                </Provider>
            </Layout>
        )
    }
}
export default MyApp;