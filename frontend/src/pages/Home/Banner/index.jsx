import SwiperCustom from '../../../components/Swiper'

function BannerHome() {
  return (
    <div className="flex-1 px-2 py-2">
      <SwiperCustom />
      <div className="scrollbar-hide mt-2 flex h-[158px] w-full gap-2 overflow-x-auto rounded-md">
        <img className="rounded-lg" src="https://cdn.xtmobile.vn/vnt_upload/weblink/ip-cu.jpg" />
        <img className="rounded-lg" src="https://cdn.xtmobile.vn/vnt_upload/weblink/watch.jpg" />
        <img className="rounded-lg" src="https://cdn.xtmobile.vn/vnt_upload/weblink/ip-cu.jpg" />
      </div>
    </div>
  )
}

export default BannerHome
