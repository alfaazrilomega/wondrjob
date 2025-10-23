import React from "react";
import Image from "next/image";
import { Briefcase, MapPin } from "lucide-react";
import { Company } from "./types";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div
      key={company.id}
      className="bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-800 flex flex-col justify-between animate-fade-in-up h-full"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-4 flex-shrink-0">
              <Image
                src={company.logo || "/next.svg"}
                alt={`${company.name} logo`}
                className="rounded-full w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{company.name}</h3>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span className="line-clamp-1">{company.address}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-6 line-clamp-3 h-16">
          {company.description}
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-white mb-2">
              Open Positions
            </h4>
            <div className="flex items-center text-2xl font-bold text-white">
              <Briefcase className="h-6 w-6 mr-2 text-blue-400" />
              <span>{company.jobs?.length ?? 0}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-2">
              Success Rate
            </h4>
            <div className="flex items-center text-2xl font-bold text-white">
              {company.successRate !== undefined ? (
                <>
                  <span
                    className={`${company.successRate >= 50 ? "text-green-400" : "text-amber-400"}`}
                  >
                    {company.successRate.toFixed(0)}%
                  </span>
                </>
              ) : (
                <span className="text-base text-gray-500">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CompanyCard);
