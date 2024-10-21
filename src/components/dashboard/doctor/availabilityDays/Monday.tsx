import React, { useState } from "react";
import {
  createAvailability,
  updateAvailabilityById,
} from "../../../../../actions/onboarding";
import toast from "react-hot-toast";
import TimesComponent from "./TimesComponent";
import { timesArray } from "../../../../../config/constants";

export default function Monday({
  profile,
  day,
}: {
  profile: any;
  day: string;
}) {
  const availability = profile?.availability || {}; // Default to empty object
  const initialData = availability[day] || []; // If day is undefined, default to empty array

  const [selected, setSelected] = useState<string[]>(initialData);

  const [loading, setLoading] = useState(false);

  function handleAddTime(time: string) {
    if (selected.includes(time)) {
      toast.error("Time already added!");
    } else {
      setSelected((prev: string[]) => [...prev, time]);
    }
  }

  function handleRemoveTime(time: string) {
    setSelected((prev) => prev.filter((item) => item !== time));
  }

  function handleAddAllTime() {
    setSelected([...timesArray]);
  }

  function handleRemoveAllTime() {
    setSelected([]);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      if (profile?.id && availability?.id) {
        const data = {
          [day]: selected, // Use day dynamically
          doctorProfileId: profile.id,
        };
        await updateAvailabilityById(availability?.id, data);
        toast.success("Availability updated successfully.");
      } else if (profile?.id) {
        const data = {
          [day]: selected,
          doctorProfileId: profile.id,
        };
        await createAvailability(data);
        toast.success("Availability created successfully.");
      } else {
        toast.error("No profile ID provided.");
      }
    } catch (error) {
      toast.error(
        "Error in handleSubmit: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <TimesComponent
      handleAddAllTime={handleAddAllTime}
      handleAddTime={handleAddTime}
      handleRemoveTime={handleRemoveTime}
      handleSubmit={handleSubmit}
      selected={selected}
      timesArray={timesArray}
      loading={loading}
      handleRemoveAllTime={handleRemoveAllTime}
      day={day}
    />
  );
}
