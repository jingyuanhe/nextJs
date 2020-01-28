import App,{Container} from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout'
class MyApp extends App{
    static async getInitialProps({Component,router,ctx}){
        let pageProps={};
        if(Component.getInitialProps){
            pageProps=await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }
    render(){
        const {pageProps,Component}=this.props;
        return <Layout><Component {...pageProps}></Component></Layout>
    }
}
export default MyApp;