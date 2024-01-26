// ** import core packages:
import { Outlet } from "react-router-dom";
//  ** import Third party Packages:
import { Button, Layout } from "antd";

// ** import  components:
import Sidebar from "./sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logOut } from "../../redux/features/auth/authSlice";

// ** destructure  components:
const { Header, Content } = Layout;

const MainLayout = () => {
   const dispatch = useAppDispatch();

   // ** handle the logOut:
   const handleLogOut = () => {
      dispatch(logOut());
   };

   return (
      <Layout style={{ height: "100vh" }}>
         <Sidebar></Sidebar>
         <Layout>
            <Header
               style={{
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  paddingRight: "30px",
               }}
            >
               <Button
                  style={{
                     background: "white",
                     color: "black",
                     borderRadius: "8px",
                     marginLeft: "auto",
                     display: "block",
                  }}
                  onClick={handleLogOut}
               >
                  LogOut
               </Button>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
               <Outlet></Outlet>
            </Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
