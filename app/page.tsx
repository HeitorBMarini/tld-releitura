import AnnouncementBar from "@/app/components/AnnouncementBar"
import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/sections/Hero"
import Collections from "@/app/components/sections/Collections"
import BestSellersServer from "@/app/components/sections/BestSellersServer"
import HelmetFinder from "@/app/components/sections/HelmetFinder"
import InsideRiders from "@/app/components/sections/InsideRiders"
import Newsletter from "@/app/components/sections/Newsletter"
import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <BestSellersServer />
        <HelmetFinder />
        <InsideRiders />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
