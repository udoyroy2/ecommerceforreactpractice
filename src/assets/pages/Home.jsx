import OfferCarousel from "../../components/OfferCarousel";
import Categories from "../../components/Categories";
import ProductSection from "../../components/ProductSection";
import PaymentMethods from "../../components/PaymentMethods";
import Footer from "../../components/Footer";



const Home = ({}) => {
  return (
    <main>
      <OfferCarousel />
      <Categories  />
      <ProductSection />
      <PaymentMethods/>
      <Footer/>

    </main>
  );
};

export default Home;