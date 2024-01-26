// ** import third party:
import { Layout, Menu } from "antd";

// ** import components:
//  ** import data:
import { adminRoutes } from "../../routes/admin.route";

// * import utils:
import { sidebarGenerator } from "../../utils/sideBarGenerator";
import facultyRoutes from "../../routes/facultyRoutes";
import { ISideBarRoute } from "../../types";
import studentRoutes from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { IUser, selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

// ** User Roles:
const USER_ROLES = {
   ADMIN: "admin",
   STUDENT: "student",
   FACULTY: "faculty",
};
const Sidebar = () => {
   const user = useAppSelector(selectCurrentUser) as IUser;

   let sidebarItems: ISideBarRoute[] = [];
   switch (user!.role) {
      case USER_ROLES.ADMIN:
         sidebarItems = sidebarGenerator(adminRoutes, USER_ROLES.ADMIN);
         break;
      case USER_ROLES.FACULTY:
         sidebarItems = sidebarGenerator(facultyRoutes, USER_ROLES.FACULTY);
         break;
      case USER_ROLES.STUDENT:
         sidebarItems = sidebarGenerator(studentRoutes, USER_ROLES.STUDENT);
         break;
      default:
         sidebarItems = [] as ISideBarRoute[];
   }
   return (
      <Sider breakpoint="lg" collapsedWidth="0">
         <div
            style={{
               color: "#fff",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               height: "4rem",
            }}
         >
            <h1>Ph University</h1>
         </div>
         <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItems}
         />
      </Sider>
   );
};

export default Sidebar;
