import Image from 'next/image';
import "./css/info.css";

export const SectionInfo = () => {
  return (
    <section className="info">
        <div className="wrapper">
            <div className="info-main">
                <div className="info-main__text">
                    <p>The project exists with the support of donors, and we invite funds, organizations, and caring patrons to join us.</p>
                </div>
                <div className="info-main__sponsors">
                    <a href="#" className="info-main__sponsors-item info-main__sponsors-item_logo"><Image src="/ishr-iac-logo.svg" alt="ISHR Logo" width={106} height={45} /></a>
                    <a href="#" className="info-main__sponsors-item info-main__sponsors-item_memory"><Image src="/memory-box-logo.svg" alt="Memory Box Logo" width={184} height={18} /></a>
                </div>
                <Image className="info-main__image" src="/info.jpg" alt="Info" width={1300} height={655}/>
            </div>
            <div className="info-footer">
                <p><i>"Zberezhemo" is a joint project by Memory Box and IAC ISHR.</i> We analyzed the requests of people from the most vulnerable regions of Ukraine and realized that often they want to preserve their history and emotions hidden in old photos, videotapes, or children's drawings. Memories for them are a powerful source of strength and support. So we understood... we must help.</p>
                <p><i>We offered people to digitize, revive, and preserve their family archives. And from the materials they wished to share, we created a library.</i> There are no books, no shelves, or catalogs here, but, as in any other library, you can carefully take and respectfully explore the living memories. Here are the stories of those whom "Zberezhemo" has already helped, and new additions are constantly arriving.</p>
            </div>
        </div>
    </section>
  )
}
