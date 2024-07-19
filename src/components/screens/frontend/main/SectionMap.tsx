import Image from "next/image";
import "./css/map.css";

export const SectionMap = () => {
  return (
    <section className="map">
        <div className="wrapper">
            <div className="map__navigation">
                <a href="#" className="map__navigation-item map__navigation-item_active">PEOPLE</a>
                <span className="map__navigation-separator">/</span>
                <a href="#" className="map__navigation-item">CITIES</a>
                <span className="map__navigation-separator">/</span>
                <a href="#" className="map__navigation-item">EVENTS</a>
            </div>
        </div>
        <div className="map__container map__container_temp">
            <Image src="/temp.png"
                   alt="Temp"
                   layout='fill'
                   objectFit='contain' />
        </div>
    </section>
  )
}
