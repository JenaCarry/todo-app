import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
