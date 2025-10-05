import React from "react";
import { Building2, Briefcase, MapPin } from "lucide-react";
import { Company, Job } from "./types";
import ApplicationRateChart from "./ApplicationRateChart"; // Import the new chart component
import ApplicationSuccessLineChart from "./ApplicationSuccessLineChart"; // Import the new line chart component

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div
      key={company.id}
      className="bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-800 flex flex-col justify-between animate-fade-in-up"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Building2 className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">{company.name}</h3>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>{company.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Briefcase className="h-4 w-4 mr-1.5" />
            <span>
              {company._count?.jobs || company.jobs.length} open positions
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-6 line-clamp-3">
          {company.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-sm font-medium text-white mb-3">
              Open Positions:
            </h4>
            <div className="space-y-2">
              {company.jobs.slice(0, 3).map((job: Job) => (
                <div key={job.id} className="text-sm">
                  <p className="font-medium text-gray-200 truncate">
                    {job.position_name}
                  </p>
                  <p className="text-gray-500">Capacity: {job.capacity}</p>
                </div>
              ))}
              {company.jobs.length > 3 && (
                <p className="text-sm text-blue-400 mt-2">
                  +{company.jobs.length - 3} more...
                </p>
              )}
              {company.jobs.length === 0 && (
                <p className="text-sm text-gray-500">No open positions.</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-3">
              Application Success Rate
            </h4>
            <div className="w-full h-32">
              {company.successRate !== undefined ? (
                <ApplicationRateChart successRate={company.successRate} />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-md flex items-center justify-center">
                  <p className="text-xs text-gray-500">Data not available</p>
                </div>
              )}
            </div>
            {/* Add the line chart here */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-3">
                Monthly Success Rate Trend
              </h4>
              {company.historicalSuccessRates &&
              company.historicalSuccessRates.length > 0 ? (
                <ApplicationSuccessLineChart
                  data={company.historicalSuccessRates}
                />
              ) : (
                <div className="w-full h-64 bg-gray-800 rounded-md flex items-center justify-center">
                  <p className="text-xs text-gray-500">
                    Historical data not available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
