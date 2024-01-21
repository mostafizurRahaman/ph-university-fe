// ** import core packages: 
import { Outlet } from "react-router-dom";
//  ** import Third party Packages:
import { Layout } from "antd";

// ** import  components: 
import Sidebar from "./sidebar";



// ** destructure  components:
const { Header, Content } = Layout;


const MainLayout = () => {
   return (
      <Layout style={{ height: "100vh" }}>
         <Sidebar></Sidebar>
         <Layout>
            <Header style={{ padding: 0 }} />
            <Content style={{ margin: "24px 16px 0" }}>
               <Outlet></Outlet>
            </Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
