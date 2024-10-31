import { Stethoscope, Video } from "lucide-react";
import Link from "next/link";
import { Doctor } from "../../../types/types";
import createSlug from "../../../utils/slugFunction";
import { cn } from "@/lib/utils";
import { formatTodayDate } from "../../../utils/formattedDate";

interface DoctorCardProps {
  doctor: Doctor;
  rating: number;
  reviewsCount: number;
  specialization: string;
  availability: string;

  review: string;
  prices: {
    original: number;
    discounted: number;
  };
  appointmentTimes: string[];
  isInPersonal?: boolean;
}

const DoctorCard = ({
  doctor,
  rating,
  reviewsCount,
  specialization,
  availability,
  review,
  prices,
  appointmentTimes,
  isInPersonal = false,
}: DoctorCardProps) => {
  const getDayName = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ] as const;
    const today = new Date();
    const dayName = days[today.getDay()];
    return dayName;
  };
  const today = getDayName();

  const timeStamps = doctor.doctorProfile?.availability?.[today] ?? [];

  const slug = createSlug(doctor.slug);

  return (
    <>
      {timeStamps.length > 0 && (
        <div
          className={cn(
            "max-w-md rounded-md border dark:bg-neutral-950 border-gray-200 hover:border-gray-400 duration-300 shadow-sm p-4 bg-white",
            isInPersonal ? "h-[540px]" : "h-[494px]"
          )}
        >
          <Link href={`/doctors/${slug}`}>
            <div className="">
              <div>
                <h2 className="text-xl font-bold">
                  <span className="mr-[0.3px]">Dr.</span> {doctor.name}
                </h2>
                {isInPersonal && (
                  <p className="text-gray-600 dark:text-white/65">
                    2138 Maplewood Drive San Francisco, CA 94110 USA
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="relative">
                <img
                  src={doctor.doctorProfile?.profilePicture ?? "/doctor.jpg"}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full  mr-8 object-cover  "
                />
                {!isInPersonal && (
                  <div className="bg-blue-200 text-blue-700 w-10 h-10  absolute bottom-0 right-4 flex items-center justify-center rounded-full">
                    <Video className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="my-4">
                <div className="">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-bold dark:text-white/65">
                    {rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-white/65 ml-1">
                    ({reviewsCount})
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1 text-sm text-gray-700">
                  <span>
                    <Stethoscope className="w-4 h-4" />
                  </span>
                  <span className="text-sm dark:text-white/65">
                    {" "}
                    {specialization}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    {availability}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-white/65 mt-2">{review}</p>
          </Link>

          <div className=" flex items-center justify-between border-t mt-4 pt-2">
            <div className="text-gray-500 dark:text-white/65 text-sm mb-2">
              {formatTodayDate()}
            </div>
            <div className="flex items-center">
              <span className="line-through text-gray-400 dark:text-white/65 mr-2">
                ${prices.original}
              </span>
              <span className="text-lg font-bold text-purple-600">
                ${doctor.doctorProfile?.hourlWage}
              </span>
              <span className="text-sm text-gray-500 dark:text-white/65 ml-1">
                with Sesame Plus
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {timeStamps.map((time: string, index: number) => (
              <Link
                href="#"
                key={index}
                className="bg-purple-600 text-white rounded-full px-3 py-1 hover:bg-purple-700 flex-shrink-0"
              >
                {time}
              </Link>
            ))}
            {/* <Link
              href={`/doctors/${slug}`}
              className="bg-purple-200 text-purple-600 flex-shrink-0 rounded-full px-2 py-1 hover:bg-purple-300"
            >
              More times
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorCard;
