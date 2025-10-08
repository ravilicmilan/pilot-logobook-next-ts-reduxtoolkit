import type { Metadata } from "next";
import Header from "@/components/UI/Header/Header";
import Home from "@/components/Home/Home";

export const metadata: Metadata = {
  title: "Pilot logbook",
};

export default async function IndexPage() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}
