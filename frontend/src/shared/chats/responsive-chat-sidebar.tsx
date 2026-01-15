import DesktopSidebar from "../../components/desktop-sidebar";
import MobileSideBar from "../../components/mobile-sidebar";

const ResponsiveChatSidebar = () => {
  return (
    <>
      {/* Desktop Sidebar - Always visible on md+ screens */}
      <DesktopSidebar />
      {/* Mobile/Tablet View */}
      <MobileSideBar />
    </>
  );
};

export default ResponsiveChatSidebar;
