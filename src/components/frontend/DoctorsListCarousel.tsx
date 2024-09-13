"use client";
import { BaggageClaim } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DoctorCard from "./DoctorCard";

export default function DoctorsListCarousel({
  isInPersonal = false,
}: {
  isInPersonal?: boolean;
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={}
      dotListClass="custom-dot-list-style"
      itemClass="px-4 py-6"
      renderButtonGroupOutside={true}
    >
      {[...new Array(4)].map((_, i) => {
        return (
          <DoctorCard
            name="Dr. Marie Pabis, MD"
            address="57 St. Marks Place, New York, NY 10003"
            rating={5.0}
            reviewsCount={4}
            specialization="Family medicine"
            availability="Available tomorrow"
            profileImage="/doctor.jpg"
            review="Great customer service! Love the doctors and the entire staff."
            prices={{ original: 131, discounted: 121 }}
            appointmentTimes={[
              "6:30 pm",
              "10:00 am",
              "10:30 am",
              "11:00 am",
              "11:30 am",
            ]}
            isInPersonal={isInPersonal}
            key={i}
          />
        );
      })}
    </Carousel>
  );
}
