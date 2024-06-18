"use client";

import React, { useEffect } from "react";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
import QRCode from "react-qr-code";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth, authMiddleware, useUser } from "@clerk/nextjs";

function Ticket({ event }: { event: IEvent }) {
  const { user } = useUser();

  const options: Options = {
    filename: "advanced-example.pdf",
    method: "save",
    resolution: Resolution.EXTREME,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };

  const getTargetElement = () => document.getElementById("container");
  const downloadPdf = () => generatePDF(getTargetElement, options);

  useEffect(() => {
    // Simulate performing an action
    const performAction = async () => {

      downloadPdf();
      
      await new Promise((resolve) => setTimeout(resolve, 3000));

      window.close();
    };

    performAction();
  }, []);

  return (
    <div className="flex justify-between w-full h-full">
      <div
        className="w-[800px] min-w-[800px] mx-auto mt-10 rounded-2xl flex flex-col justify-between items-center min-h-[200px] gap-3 bg-grey-50 py-10 px-6 text-center"
        id="container"
      >
        <div className="h5-bold">{event.title}</div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-4 w-3/5">
            <div className="flex flex-col items-start">
              <p className="p-bold-20 !text-xs">What is it all about</p>
              <p className="text-sm text-left">{event.description}</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="p-bold-20 !text-xs">Where</p>
              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={16}
                  height={16}
                />
                <p className="text-sm text-left">{event.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <p className="p-bold-20 !text-xs">When</p>
              <div className="flex gap-2 md:gap-3 items-center">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={16}
                  height={16}
                />
                <div className="text-sm text-left flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <p className="p-bold-20 !text-xs">Fee</p>
              <p className="text-sm text-left">
                {event.isFree ? "FREE" : `$${event.price}`}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <p className="p-bold-20 !text-sm">By</p>
              <p className="text-primary-500">
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
            </div>
          </div>
          <div className="h-auto my-0 mx-auto max-w-[200px] w-[200px]">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={user?.emailAddresses[0].emailAddress || "nothing"}
              viewBox={`0 0 256 256`}
              bgColor="transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
