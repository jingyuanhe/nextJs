import App,{Container} from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout'
import MyContext from '../lib/my-context'
import { Provider } from 'react-redux'
import withRedux from '../lib/with-redux.js'
class MyApp extends App{
    state={
        context:'value'
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
            <Layout>
                <Provider store={reduxStore}>
                    <MyContext.Provider value={this.state.context}>
                        <Component {...pageProps}></Component>
                    </MyContext.Provider>
                </Provider>
            </Layout>
        )
    }
}
export default withRedux(MyApp);