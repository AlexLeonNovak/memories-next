import Image from 'next/image';

export const SectionInfo = () => {
  return (
    <section className="info-section">
      <p>The project exists with the support of donors, and we invite funds, organizations, and caring patrons to join us.</p>
      <div className="sponsors">
        <Image src="/ishr-iac-logo.svg" alt="ISHR Logo" width={97} height={41} />
        <Image src="/memory-box-logo.svg" alt="Memory Box Logo" width={170} height={41} />
      </div>
      <Image src="/info.jpg" alt="Info" width={1300} height={655}/>
      <p>&quot;Zberezhemo&quot; is a joint project by Memory Box and IAC ISHR. We analyzed the requests of people from the most vulnerable regions of Ukraine and realized that often they want to preserve their history and emotions hidden in old photos, videotapes, or children&apos;s drawings. Memories for them are a powerful source of strength and support. So we understood... we must help.

        We offered people to digitize, revive, and preserve their family archives. And from the materials they wished to share, we created a library. There are no books, no shelves, or catalogs here, but, as in any other library, you can carefully take and respectfully explore the living memories. Here are the stories of those whom &quot;Zberezhemo&quot; has already helped, and new additions are constantly arriving.
      </p>
    </section>
  )
}
