import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Marquee } from "@/components/sections/marquee";
import { Ventures } from "@/components/sections/ventures";
import { Timeline } from "@/components/sections/timeline";
import { Credentials } from "@/components/sections/credentials";
import { Now } from "@/components/sections/now";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Manifesto />
      <Ventures />
      <Timeline />
      <Credentials />
      <Now />
      <Contact />
    </main>
  );
}
