import { Eyebrow, btn } from './ui'
import Vsl from './Vsl'

export default function Hero() {
  return (
    <>
      <section className="pb-[58px] pt-[94px] text-center max-[800px]:pb-[38px] max-[800px]:pt-[66px]">
        <Eyebrow>For coaches &amp; agency owners</Eyebrow>
        <h1 className="mx-auto mb-[22px] mt-0 text-[clamp(38px,5.3vw,66px)] font-extrabold leading-[1.12] tracking-[-.05em] max-[800px]:max-w-[530px] max-[800px]:text-[43px]">
          Your done-for-you content funnel.
        </h1>
        <p className="mx-auto mb-[29px] mt-0 max-w-[640px] text-[18px] leading-[1.65] text-[#b8c1b7] max-[800px]:max-w-[490px] max-[800px]:text-[16px]">
          Organic and paid content built around your offer.
          <br />
          Turn attention into clients. Leave the content work to us.
        </p>
        <a className={btn()} href="#inquiry">
          Request a discovery call <span>↗</span>
        </a>
        <a className="mt-[13px] block text-[14px] text-[#a9b7a7] max-[800px]:text-[13px]" href="#packages">
          Explore the three packages ↓
        </a>
      </section>
      <Vsl />
    </>
  )
}
