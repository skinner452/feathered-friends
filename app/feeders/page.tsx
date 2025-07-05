"use client";

import { Button } from "@/components/Button";
import { getRegionByName } from "@/data/regions";
import { createFeeder, selectFeeders } from "@/redux/features/feeders";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Feeders() {
  const router = useRouter();
  const feeders = useAppSelector(selectFeeders);

  const dispatch = useAppDispatch();

  const handleCreateFeeder = useCallback(() => {
    dispatch(
      createFeeder({
        region: getRegionByName("North America"),
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-5xl">Feeders</p>

      {feeders.map((feeder) => (
        <Button
          key={feeder.id}
          text={feeder.name}
          onClick={() => router.push(`/feeders/${feeder.id}`)}
          color="blue"
        />
      ))}

      <Button text="Add Feeder" onClick={handleCreateFeeder} color="green" />
    </div>
  );
}
