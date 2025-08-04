import Hero from "@/components/Hero";
import HeatInsulator from "@/components/HeatInsulator";
import Us from "@/components/Us";
import Agencies from "@/components/Agencies";
import CustomerComment from "@/components/CustomerComment";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HeatInsulator />
      {/* <Offers /> */}
      {/* Moving Gradient Breaker */}
      <div className="my-12 h-2 w-full bg-gradient-to-r from-red-200 via-red-900 to-red-500 rounded-full shadow-md animate-gradient-move" />

      <Us />
      <Agencies />
      <CustomerComment />
    </div>
  );
}
