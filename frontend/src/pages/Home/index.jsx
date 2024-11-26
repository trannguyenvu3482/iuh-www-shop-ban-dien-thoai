import ScrollToTop from '../../components/ScrollToTop'
import { SECTIONS_OF_HOME } from '../../constants'
import useMe from '../../hooks/useMe'
import AccessoryCategory from './AccessoryList'
import BannerHome from './Banner'
import HeadSection from './HeadSection'
import ListSection from './ListSection'
import Sidebar from './Sidebar'

export default function Home() {
  const { me } = useMe()
  return (
    <div className="m-auto max-w-[100vw] bg-primary-purple">
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
