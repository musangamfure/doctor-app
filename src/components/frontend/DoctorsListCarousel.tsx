"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DoctorCard from "./DoctorCard";
import { Doctor } from "../../../types/types";

export default function DoctorsListCarousel({
  doctors,
  isInPersonal = false,
}: {
  isInPersonal?: boolean;
  doctors: Doctor[];
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const renderDoctorCard = (doctor: Doctor, i: number) => (
    <DoctorCard
      key={i}
      rating={5.0}
      reviewsCount={4}
      specialization="Family medicine"
      availability="Available tomorrow"
      doctor={doctor}
      review="Great customer service! Love the doctors and the entire staff."
      prices={{ original: 131, discounted: 121 }}
      isInPersonal={isInPersonal}
    />
  );

  if (doctors.length <= 6) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map(renderDoctorCard)}
      </div>
    );
  }

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="px-2 py-6"
      renderButtonGroupOutside={true}
    >
      {doctors.map(renderDoctorCard)}
    </Carousel>
  );
}
