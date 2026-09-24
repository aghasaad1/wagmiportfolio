import { Eyebrow, btn } from './ui'
import Vsl from './Vsl'

export default function Hero() {
  return (
    // Fills the screen below the sticky nav (76px desktop / 68px mobile incl. its top margin);
    // the video takes whatever height is left so its caption bar is always in view.
    // On short screens the text and spacing shrink with the height (dvh) to leave the video room.
    <div className="flex h-[calc(100dvh-76px)] flex-col pb-[clamp(12px,2.6dvh,24px)] max-[800px]:h-[calc(100dvh-68px)]">
      <section className="shrink-0 pb-[clamp(14px,3.6dvh,36px)] pt-[clamp(14px,4dvh,40px)] text-center max-[800px]:pt-[clamp(12px,3.4dvh,32px)] max-[800px]:pb-[clamp(12px,3.2dvh,30px)]">
        <Eyebrow anim="intro" className="mb-[clamp(10px,2.3dvh,23px)]">
          For coaches &amp; agency owners
        </Eyebrow>
        <h1 data-anim="intro" className="mx-auto mb-[clamp(10px,2.2dvh,22px)] mt-0 text-[clamp(32px,min(5.3vw,7.4dvh),66px)] font-extrabold leading-[1.12] tracking-[-.05em] max-[800px]:max-w-[530px] max-[800px]:text-[clamp(30px,5.6dvh,43px)]">
          Your done-for-you content funnel.
        </h1>
        <p data-anim="intro" className="mx-auto mb-[clamp(14px,2.9dvh,29px)] mt-0 max-w-[640px] text-[clamp(15px,2.1dvh,18px)] leading-[1.65] text-[#b8c1b7] max-[800px]:max-w-[490px] max-[800px]:text-[clamp(14px,2dvh,16px)]">
          Organic and paid content built around your offer.
          <br />
          Turn attention into clients. Leave the content work to us.
        </p>
        <a data-anim="intro" className={btn()} href="#inquiry">
          Request a discovery call <span>↗</span>
        </a>
        <a data-anim="intro" className="mt-[clamp(8px,1.3dvh,13px)] block text-[14px] text-[#a9b7a7] max-[800px]:text-[13px]" href="#packages">
          Explore the three packages ↓
        </a>
      </section>
      <div className="flex min-h-0 flex-1 justify-center @container-size">
        <Vsl />
      </div>
    </div>
  )
}
