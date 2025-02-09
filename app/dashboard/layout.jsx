import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="hidden md:block md:w-1/5 border-r-2">
          <SideNav />
        </div>
        <div className="flex-1 px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
