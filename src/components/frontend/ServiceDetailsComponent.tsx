import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface ServiceDetailsComponentProps {
  included: string[];
  excluded: string[];
  details: string;
  additionalInfo: string;
}

const ServiceDetailsComponent: React.FC<ServiceDetailsComponentProps> = ({
  included,
  excluded,
  details,
  additionalInfo,
}) => {
  return (
    <div className="bg-white p-6 dark:bg-slate-950  w-full">
      <div className="">
        <p className="text-gray-500 dark:text-white/65 mb-4">{details}</p>
        <div className="flex justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-white/85 mb-2">
              Included
            </h4>
            {included.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-purple-600 mb-1"
              >
                <CheckCircle className="mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-white/85 mb-2">
              Excluded
            </h4>
            {excluded.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-gray-600 dark:text-white/65   mb-1"
              >
                <XCircle className="mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-2">
          <button
            className="w-full text-left text-gray-700 dark:text-white/85  font-semibold"
            onClick={() => alert("Service details clicked")}
          >
            Service details
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-white/85 rounded-lg flex justify-between items-center">
        <p className="text-gray-600 text-sm">{additionalInfo}</p>
        <a href="#" className="text-purple-600 text-sm font-semibold">
          Read more
        </a>
      </div>
    </div>
  );
};

export default ServiceDetailsComponent;
