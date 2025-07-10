// components/sections/HeroSection.tsx
import GetStartedButton from "@/components/atoms/GetStartedButton/GetStartedButton";
import Spline from "@splinetool/react-spline";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/MV7IOWF7YN1Qbtra/scene.splinecode" />
      </div>

			{/* logo on top left */}
			<div className="absolute top-4 left-4 z-10">
				<Image
					src="full-logo-white.svg"
					alt="Logo"
					width={200}
					height={50}
					className="h-8 w-auto"
				/>
			</div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-eudoxus-sans font-bold text-transparent bg-clip-text bg-white">
            Manage Money Smarter
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white">
            Track spending, set goals, and stay on top of your financial life.
          </p>
          <div className="mt-6">
            <GetStartedButton />
          </div>
        </div>
      </div>

      {/* Optional: overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
    </main>
  );
}
