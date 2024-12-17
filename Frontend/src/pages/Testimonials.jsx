import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "@/components/TestimonialCard";
import user1 from "@/assets/user.jpg";
import user2 from "@/assets/user.jpg";
import user3 from "@/assets/user.jpg";
import user4 from "@/assets/user.jpg";
import user5 from "@/assets/user.jpg";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    testimonial:
      "This platform has exceeded my expectations. The user experience is fantastic!",
    image: user1,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    testimonial:
      "Absolutely love the design and performance of this app. Highly recommended!",
    image: user2,
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "UI/UX Designer",
    testimonial:
      "The glassmorphism design is stunning, and the functionality is flawless!",
    image: user3,
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "DevOps Engineer",
    testimonial: "A seamless experience from start to finish. Great job team!",
    image: user4,
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Data Scientist",
    testimonial:
      "The tools here have improved our workflow dramatically. Excellent support!",
    image: user5,
  },
];

const Testimonials = () => {
  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-400">
        What Our Users Say
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 20 },
          1024: { slidesPerView: 2.5, spaceBetween: 30 },
        }}
        className="w-full "
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
