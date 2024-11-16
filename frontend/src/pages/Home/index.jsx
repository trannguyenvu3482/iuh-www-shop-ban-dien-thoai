import BannerHome from './Banner'
import HeadSection from './HeadSection'
import Sidebar from './Sidebar'
import ListSection from './ListSection'
import { SECTIONS_OF_HOME } from '../../constants'
import AccessoryCategory from './AccessoryList'
import ScrollToTop from '../../components/ScrollToTop'

export default function Home() {
  return (
    <div className="bg-primary-purple m-auto max-w-[100vw]">
      <div className="mx-auto w-[1220px] pb-8 pt-2">
        <div className="mb-8 flex">
          <Sidebar />
          <BannerHome />
        </div>
        <HeadSection />
        {SECTIONS_OF_HOME.map((section, index) => (
          <ListSection
            key={index}
            title={section.title}
            categories={section.categories}
            dataList={section.dataList}
          />
        ))}
        <AccessoryCategory />
        <ScrollToTop />
      </div>
    </div>
  )
}
