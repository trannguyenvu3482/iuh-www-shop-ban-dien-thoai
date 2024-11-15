import SwiperCustom from '../../../components/Swiper'

function BannerHome() {
  return (
    <div className='flex-1 px-2 py-2'>
    <SwiperCustom/>
    <div className="flex overflow-x-auto gap-2 mt-2 rounded-md w-full h-[158px] scrollbar-hide">
    <img className="rounded-lg" src="https://cdn.xtmobile.vn/vnt_upload/weblink/ip-cu.jpg" />
    <img className="rounded-lg" src="https://cdn.xtmobile.vn/vnt_upload/weblink/watch.jpg" />
    <img className="rounded-lg" src="https://cdn.xtmobile.vn/vnt_upload/weblink/ip-cu.jpg" />
  </div>
  
    </div>
  )
}

export default BannerHome