import GridLayout from "../components/GridLayout/GridLayout";
import AsideMenu from "../components/AsideMenu/AsideMenu";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import FlexContainer from "../components/FlexContainer/FlexContainer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="wrapper">
      <GridLayout>
        <NavBar />
        <FlexContainer>
          <Outlet />
        </FlexContainer>
        <AsideMenu />
        <Footer />
      </GridLayout>
    </div>
  );
};

export default DashboardLayout;
