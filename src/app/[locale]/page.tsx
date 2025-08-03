import Hero from "@/components/Hero";
import HeatInsulator from "@/components/HeatInsulator";
import Offers from "@/components/Offers";
import Us from "@/components/Us";
import Agencies from "@/components/Agencies";
import CustomerComment from "@/components/CustomerComment";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HeatInsulator />
      <Offers />
      <Us />
      <Agencies />
      <CustomerComment />
    </div>
  );
}
