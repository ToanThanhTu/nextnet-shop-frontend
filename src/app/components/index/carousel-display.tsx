"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { carousel } from "@/app/data/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

function CarouselDisplay() {
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {carousel.map((item) => (
          <CarouselItem key={item.alt}>
            <div className="aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
              <Image
                src={item.src}
                alt={item.alt}
                width={2800}
                height={700}
                className="h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:cursor-pointer" />
      <CarouselNext className="hover:cursor-pointer" />
    </Carousel>
  );
}

export default CarouselDisplay;
