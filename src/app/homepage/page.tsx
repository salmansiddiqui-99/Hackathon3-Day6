import Carousel from "../components/carousel";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpCenter from "../components/HelpCenter";
import SearchBar from "../components/SearchBar";
import ProductCards from "../products/page";

export default function Homepage() {
    return (
      <>
      <Header />
      <SearchBar />
      <Carousel />
      <ProductCards />
      <div className="p-6">
      <FAQ />
      <HelpCenter />
    </div>
    <Footer/>
    
      </>
    );
  }