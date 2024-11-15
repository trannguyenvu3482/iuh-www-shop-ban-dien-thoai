import BannerHome from "./Banner";
import Sidebar from "./Sidebar";

export default function Home() {
  return <div className="m-auto max-w-[100vw] bg-slate-100">
  <div className="w-[1220px] pb-8 pt-2 mx-auto ">
  <div className="mb-8 flex">
    <Sidebar/>
    <BannerHome />
    </div>
  </div>
  </div>
}

