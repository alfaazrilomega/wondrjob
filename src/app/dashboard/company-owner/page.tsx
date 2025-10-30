"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useTransition,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getUser,
  updateEmail,
  updatePassword,
  logout,
} from "@/app/actions/auth";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Briefcase,
  Users,
  Building,
  DollarSign,
  Clock,
  Link,
  Phone,
  Award,
  ChevronLeft,
  Search,
  Plus,
  MoreVertical,
  MapPin,
  Settings,
  ChevronDown,
  User,
  ArrowRight,
  ChevronUp,
  LogOut,
  BarChart2,
  Trash2,
  Edit,
} from "lucide-react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { deleteJobPosting } from "@/app/actions/jobs";
import { getMyNotifications } from "@/actions/notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addMonthlyStat, deleteMonthlyStat } from "@/app/actions/stats";
import {
  addTeamMember,
  removeTeamMember,
  updateTeamMember,
} from "@/app/actions/team";

const ICONS = {
  briefcase: <Briefcase size={20} className="text-purple-400" />,
  users: <Users size={20} className="text-blue-400" />,
  building: <Building size={20} className="text-teal-400" />,
  finance: <BarChart2 size={20} className="text-indigo-400" />,
  settings: <Settings size={20} className="text-gray-400" />,
  payroll: <Users size={24} className="text-yellow-500" />,
  search: <Search size={20} className="text-gray-400" />,
  plus: <Plus size={20} />,
  arrowRight: <ArrowRight size={16} />,
  moreVertical: <MoreVertical size={18} />,
  chevronLeft: <ChevronLeft size={20} />,
  logo: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 414 414"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M414 207C414 321.325 321.325 414 207 414C92.6751 414 0 321.325 0 207C0 92.6751 92.6751 0 207 0C321.325 0 414 92.6751 414 207Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M229.071 113.843L207.001 154.214L184.93 113.843C161.215 70.3879 111.666 84.1555 96.6577 127.604C81.6491 171.053 104.791 221.053 148.24 236.062C167.319 242.41 187.414 242.41 206.493 236.062L207.001 235.859L207.509 236.062C250.958 221.053 274.1 171.053 259.091 127.604C244.083 84.1555 194.534 70.3879 170.819 113.843L207.001 178.509L243.182 113.843C266.897 70.3879 316.446 84.1555 331.455 127.604C346.463 171.053 323.322 221.053 279.873 236.062C260.794 242.41 240.7 242.41 221.62 236.062L221.113 235.859L220.605 236.062C177.156 221.053 154.015 171.053 169.023 127.604C184.032 84.1555 233.581 70.3879 257.296 113.843L207.001 201.272L156.705 113.843"
        stroke="white"
        strokeWidth="10"
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="414"
          y2="414"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A2BE2" />
          <stop offset="1" stopColor="#4A00E0" />
        </linearGradient>
      </defs>
    </svg>
  ),
};

interface Job {
  id: string | number;
  title: string;
  applicants: number;
  location: string;
  department: string;
  status: string;
  description: string;
  skills: string[];
}

interface JobStats {
  totalJobs: number;
  totalApplicants: number;
  avgSalary: number;
  avgTimeToFill: number;
}

interface TeamMember {
  id: string | number;
  avatar: string;
  name: string;
  role: string;
  email: string;
}

interface MonthlyStat {
  id: string | number;
  month: string;
  rate: number;
}

interface CompanyProfile {
  logoUrl: string;
  companyName: string;
  tagline: string;
  website: string;
  phone: string;
  address: string;
  certificateUrl: string;
  description: string;
}

interface CompanyOwnerData {
  jobs: Job[];
  stats: JobStats;
  team: TeamMember[];
  monthlyStats: MonthlyStat[];
  profile: CompanyProfile;
}

interface NotificationData {
  id: string;
  type: "job_approval" | "info" | "applicant_update";
  text: string;
  timestamp: string;
  read: boolean;
  jobId?: number;
  hrdName?: string;
  jobTitle?: string;
}

function InputField({
  id,
  label,
  type = "text",
  value,
  defaultValue,
  onChange,
  name,
  placeholder,
  as = "input",
  icon,
}: {
  id: string;
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name?: string;
  placeholder?: string;
  as?: string;
  icon?: React.ReactElement | null;
}) {
  const commonProps = {
    id,
    name: name || id,
    value,
    defaultValue,
    placeholder: placeholder || label,
    onChange,
    className: `w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${
      icon ? "pl-10" : ""
    }`,
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(icon, {
              className: "text-gray-400",
              size: 20,
            } as { className: string; size: number })}
          </div>
        )}
        {as === "textarea" ? (
          <textarea {...commonProps} rows={5} />
        ) : (
          <input type={type} {...commonProps} />
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  percentage,
  icon,
  trend,
}: {
  title: string;
  value: string | number;
  percentage?: string | number;
  icon: React.ReactElement;
  trend?: "up" | "down";
}) {
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-[#1e1e24] p-6 rounded-lg shadow-lg flex items-center gap-6">
      <div className="flex-shrink-0 p-4 bg-gray-800 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-3xl font-bold text-white my-1">{value}</p>
        {percentage !== undefined && percentage !== null && (
          <p className={`text-sm ${trendColor}`}>
            {trend === "up" ? "+" : ""}
            {percentage} vs. last period
          </p>
        )}
      </div>
    </div>
  );
}

function JobPostingsPage({
  jobs,
  stats,
  onSelectJob,
  onCreateJob,
}: {
  jobs: Job[];
  stats: JobStats;
  onSelectJob: (job: Job) => void;
  onCreateJob: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (jobId: number) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      startTransition(async () => {
        const result = await deleteJobPosting(jobId.toString());
        if (result?.error) {
          alert(`Error: ${result.error}`);
        } else {
          alert("Job posting deleted successfully.");
        }
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Job Postings</h1>
        <button
          onClick={onCreateJob}
          className="flex items-center gap-2 px-5 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors font-semibold shadow-lg"
        >
          {ICONS.plus}
          Create New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={<Briefcase size={24} className="text-purple-400" />}
        />
        <StatCard
          title="Total Applicants"
          value={stats.totalApplicants}
          icon={<Users size={24} className="text-blue-400" />}
        />
        <StatCard
          title="Avg. Salary"
          value={`$${stats.avgSalary / 1000}k`}
          icon={<DollarSign size={24} className="text-green-400" />}
        />
        <StatCard
          title="Avg. Time to Fill"
          value={`${stats.avgTimeToFill}d`}
          icon={<Clock size={24} className="text-yellow-400" />}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Active Job Listings
        </h2>
        <div className="bg-[#1e1e24] rounded-lg shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-700">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="p-6 hover:bg-gray-800 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {job.applicants} Applicants · {job.location} ·{" "}
                      {job.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === "Active"
                          ? "bg-green-800 text-green-200"
                          : "bg-yellow-800 text-yellow-200"
                      }`}
                    >
                      {job.status}
                    </span>
                    <button
                      onClick={() => onSelectJob(job)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors text-sm font-medium"
                    >
                      <span>View</span>
                      {ICONS.arrowRight}
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#2a2a30] border-gray-700 text-gray-200">
                        <DropdownMenuItem
                          className="hover:bg-gray-700 focus:bg-gray-700"
                          onClick={() =>
                            router.push(
                              `/dashboard/company-owner/edit/${job.id}`,
                            )
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem
                          className="text-red-500 hover:bg-gray-700 focus:bg-gray-700 focus:text-red-400"
                          onSelect={(e) => e.preventDefault()} // Prevents auto-close on click
                          onClick={() => handleDelete(job.id as number)}
                          disabled={isPending}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>{isPending ? "Deleting..." : "Delete"}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imgSrc, setImgSrc] = useState(member.avatar);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleRemove = async () => {
    const formData = new FormData();
    formData.append("memberId", member.id as string);

    const result = await removeTeamMember(formData);
    if (result?.error) {
      console.error(result.error);
    } else {
      console.log("Team member removed successfully");
    }
  };

  const handleUpdateMember = async (memberData: Partial<TeamMember>) => {
    const formData = new FormData();
    formData.append("memberId", member.id as string);
    if (memberData.name) formData.append("name", memberData.name);
    if (memberData.email) formData.append("email", memberData.email);

    const result = await updateTeamMember(formData);
    if (result?.error) {
      console.error(result.error);
    } else {
      console.log("Team member updated successfully");
      setShowEditModal(false);
    }
  };

  return (
    <>
      <div
        key={member.id}
        className="bg-[#1e1e24] rounded-lg shadow-lg p-6 text-center"
      >
        <Image
          src={imgSrc}
          alt={member.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"
          onError={() => {
            setImgSrc("https://placehold.co/100x100/CCCCCC/FFFFFF?text=??");
          }}
        />
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-purple-400 text-sm mb-2">{member.role}</p>
        <p className="text-gray-400 text-sm">{member.email}</p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors text-sm font-medium"
          >
            Edit
          </button>
          <form action={handleRemove}>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-red-700 hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Remove
            </button>
          </form>
        </div>
      </div>

      {showEditModal && (
        <EditTeamMemberModal
          member={member}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateMember}
        />
      )}
    </>
  );
}

function EditTeamMemberModal({
  member,
  onClose,
  onSave,
}: {
  member: TeamMember;
  onClose: () => void;
  onSave: (data: Partial<TeamMember>) => void;
}) {
  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e24] rounded-lg shadow-xl w-full max-w-md p-8 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">
          Edit Team Member
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <InputField
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., john.doe@example.com"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddTeamMemberModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e24] rounded-lg shadow-xl w-full max-w-md p-8 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">
          Add New Team Member
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <InputField
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., john.doe@example.com"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a temporary password"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TeamPage({ team }: { team: TeamMember[] }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddMember = async (memberData: Record<string, unknown>) => {
    const formData = new FormData();
    Object.entries(memberData).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const result = await addTeamMember(formData);
    if (result?.error) {
      console.error(result.error);
    } else {
      console.log("Team member added successfully");
      setShowAddModal(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Team Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors font-semibold shadow-lg"
        >
          {ICONS.plus}
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      {showAddModal && (
        <AddTeamMemberModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMember}
        />
      )}
    </>
  );
}

function AddStatModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: { month: string; year: string; rate: string }) => void;
}) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [rate, setRate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (month && year && rate) {
      onSave({ month, year, rate });
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e24] rounded-lg shadow-xl w-full max-w-md p-8 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Add New Stat</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <InputField
              id="month"
              label="Month (1-12)"
              type="number"
              value={month}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setMonth(e.target.value)}
              placeholder="e.g., 1 for January"
            />
            <InputField
              id="year"
              label="Year"
              type="number"
              value={year}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setYear(e.target.value)}
              placeholder="e.g., 2025"
            />
            <InputField
              id="rate"
              label="Success Rate (%)"
              type="number"
              value={rate}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setRate(e.target.value)}
              placeholder="e.g., 30.5"
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Save Stat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MonthlyStatsPage({ stats }: { stats: MonthlyStat[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentStat = stats.length > 0 ? stats[stats.length - 1].rate : 0;

  const handleAddStat = async (newStat: {
    month: string;
    year: string;
    rate: string;
  }) => {
    const formData = new FormData();
    formData.append("month", newStat.month);
    formData.append("year", newStat.year);
    formData.append("rate", newStat.rate);

    const result = await addMonthlyStat(formData);
    if (result?.error) {
      console.error(result.error);
    } else {
      // Refetch or update state
      console.log("Stat added");
    }
  };

  const handleDeleteStat = async (id: string | number) => {
    const formData = new FormData();
    formData.append("statId", id.toString());

    const result = await deleteMonthlyStat(formData);
    if (result?.error) {
      console.error(result.error);
    } else {
      // Refetch or update state
      console.log("Stat deleted");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Monthly Stats</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors font-semibold shadow-lg"
        >
          {ICONS.plus}
          Add New Stat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1e1e24] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            Historical Success Rate
          </h2>
          <p className="text-5xl font-bold text-white mb-2">{currentStat}%</p>
          <p className="text-sm text-gray-400 mb-6">Last 12 Months</p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={stats}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e24",
                    border: "1px solid #374151",
                  }}
                  labelStyle={{ color: "#FFFFFF" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#1e1e24] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Manage Data</h2>
          <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-md"
              >
                <div>
                  <p className="font-semibold text-white">{stat.month}</p>
                  <p className="text-indigo-300">{stat.rate}% Success Rate</p>
                </div>
                <button
                  onClick={() => handleDeleteStat(stat.id)}
                  className="p-2 text-red-500 hover:bg-gray-600 rounded-full"
                  title="Delete stat"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddStatModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddStat}
        />
      )}
    </>
  );
}

function CompanyProfilePage({
  profile,
  setProfile,
}: {
  profile: CompanyProfile;
  setProfile: (profile: CompanyProfile) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [localProfile, setLocalProfile] = useState(profile);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setLocalProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch("/api/company/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save profile.");
      }

      setProfile(localProfile);
      setSaveMessage("Profile saved successfully!");
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(""), 5000);
    }
  };

  const defaultLogoUrl = "https://placehold.co/160x160/CCCCCC/121217?text=Logo";

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-8">Company Profile</h1>

      <form
        onSubmit={handleSave}
        className="bg-[#1e1e24] rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0 w-full md:w-48 text-center">
            <Image
              src={localProfile.logoUrl || defaultLogoUrl}
              alt="Company Logo"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full mx-auto mb-4 bg-gray-700 object-cover"
            />
            <button
              type="button"
              className="w-full px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors text-sm font-medium"
            >
              Upload New Logo
            </button>
            <div className="mt-4">
              <InputField
                id="logoUrl"
                label="Or enter Logo URL"
                value={localProfile.logoUrl}
                onChange={handleChange}
                placeholder="https://..."
                icon={<Link />}
              />
            </div>
          </div>

          <div className="w-full space-y-6">
            <InputField
              id="companyName"
              label="Company Name"
              value={localProfile.companyName}
              onChange={handleChange}
              icon={<Building />}
            />
            <InputField
              id="tagline"
              label="Tagline"
              value={localProfile.tagline}
              onChange={handleChange}
              placeholder="e.g., Quality Skincare for All"
            />
            <InputField
              id="website"
              label="Website URL"
              type="url"
              value={localProfile.website}
              onChange={handleChange}
              placeholder="https://example.com"
              icon={<Link />}
            />
            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              value={localProfile.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              icon={<Phone />}
            />
            <InputField
              id="address"
              label="Company Address"
              value={localProfile.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              icon={<MapPin />}
            />
            <InputField
              id="companyCertificateUrl"
              label="Company Certificate URL"
              type="url"
              value={localProfile.certificateUrl}
              onChange={handleChange}
              placeholder="https://example.com/certificate.pdf"
              icon={<Award />}
            />
            <InputField
              id="description"
              label="Company Description"
              as="textarea"
              value={localProfile.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-700">
          {saveMessage && (
            <p
              className={`text-sm ${
                saveMessage.startsWith("Error")
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {saveMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors font-semibold shadow-lg disabled:bg-purple-800 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

function SettingsPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
      setLoading(false);
    });
  }, []);

  const handleFormAction = async (formData: FormData) => {
    setSaveMessage("");
    setErrorMessage("");

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const email = formData.get("email") as string;

    if (password && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      if (password) {
        const result = await updatePassword(formData);
        if (result?.error) {
          throw new Error(result.error);
        }
      }

      if (email !== userEmail) {
        const result = await updateEmail(formData);
        if (result?.error) {
          throw new Error(result.error);
        }
        setSaveMessage("Confirmation email sent to new address.");
      }

      setSaveMessage("Settings updated successfully!");
      formRef.current?.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading settings...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      <form
        ref={formRef}
        action={handleFormAction}
        className="bg-[#1e1e24] rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Account Settings
        </h2>
        <div className="space-y-6">
          <InputField
            id="email"
            label="Email Address"
            type="email"
            name="email"
            defaultValue={userEmail}
          />
          <InputField
            id="password"
            label="New Password"
            type="password"
            name="password"
            placeholder="New Password"
          />
          <InputField
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
          />
        </div>
        <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-700">
          {saveMessage && <p className="text-green-400">{saveMessage}</p>}
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          <button
            type="submit"
            className="px-8 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors font-semibold shadow-lg"
          >
            Save Settings
          </button>
        </div>
      </form>
    </>
  );
}

function ProfileDropdown({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700"
      >
        <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          S
        </span>
        <User size={20} className="text-gray-400" />
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#2a2a30] border border-gray-700 rounded-md shadow-lg z-20">
          <button
            onClick={() => {
              onNavigate("profile");
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700"
          >
            <Building size={18} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => {
              onNavigate("settings");
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <div className="border-t border-gray-700 my-1"></div>
          <button
            onClick={async () => {
              await logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

function MainHeader({
  onNavigate,
  notifications,
}: {
  onNavigate: (page: string) => void;
  notifications: NotificationData[];
}) {
  return (
    <header className="flex-shrink-0 flex items-center justify-end h-20 px-8 bg-[#1e1e24] border-b border-gray-700">
      <div className="flex items-center gap-4">
        <NotificationDropdown initialNotifications={notifications} />
        <ProfileDropdown onNavigate={onNavigate} />
      </div>
    </header>
  );
}

function CompanyDashboardLayout({
  currentPage,
  onNavigate,
  children,
  notifications,
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
  notifications: NotificationData[];
}) {
  const navItems = [
    { id: "jobs", name: "Job Postings", icon: <Briefcase size={20} /> },
    { id: "team", name: "Team Management", icon: <Users size={20} /> },
    { id: "stats", name: "Monthly Stats", icon: <BarChart2 size={20} /> },
    { id: "profile", name: "Company Profile", icon: <Building size={20} /> },
    { id: "settings", name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#121217] text-gray-200 font-sans">
      <nav className="w-72 flex-shrink-0 bg-[#1e1e24] flex flex-col border-r border-gray-700">
        <div className="flex items-center gap-3 p-6 border-b border-gray-700">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <div>
            <h1 className="text-white font-semibold">SKINTIFIC</h1>
            <p className="text-sm text-gray-400">Company Owner</p>
          </div>
        </div>

        <div className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-md transition-colors ${
                currentPage === item.id
                  ? "bg-purple-700 text-white font-semibold shadow-inner"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700 h-20"></div>
      </nav>

      <main className="flex-1 flex flex-col h-screen">
        <div className="w-full bg-gradient-to-r from-purple-800 to-indigo-800 text-center py-2 text-sm font-medium text-white shadow-md flex-shrink-0">
          This is a simulation. All data is fictional.
        </div>

        <MainHeader onNavigate={onNavigate} notifications={notifications} />

        <div className="flex-1 overflow-y-auto p-8 md:p-12">{children}</div>
      </main>
    </div>
  );
}

export default function App() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("jobs");

  const [data, setData] = useState<CompanyOwnerData | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch dashboard and notifications data simultaneously
        const [dashboardResponse, notificationResult] = await Promise.all([
          fetch("/api/company-owner/dashboard"),
          getMyNotifications(),
        ]);

        if (!dashboardResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const dashboardResult = await dashboardResponse.json();
        setData(dashboardResult);

        // Handle notifications
        if (notificationResult && Array.isArray(notificationResult)) {
          setNotifications(notificationResult as NotificationData[]);
        } else if (notificationResult?.error) {
          console.error(
            "Failed to fetch notifications:",
            notificationResult.error,
          );
        } else {
          console.warn(
            "Unexpected notification data format:",
            notificationResult,
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const handleSelectJob = (job: Job) => {
    router.push(`/dashboard/company-owner/${job.id}`);
  };

  const handleCreateJob = () => {
    router.push(`/dashboard/company-owner/create`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "jobs":
        return (
          <JobPostingsPage
            jobs={data.jobs}
            stats={data.stats}
            onSelectJob={handleSelectJob}
            onCreateJob={handleCreateJob}
          />
        );
      case "team":
        return <TeamPage team={data.team} />;
      case "stats":
        return <MonthlyStatsPage stats={data.monthlyStats} />;
      case "profile":
        return (
          <CompanyProfilePage
            profile={data.profile}
            setProfile={(newProfile) =>
              setData({ ...data, profile: newProfile })
            }
          />
        );
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <JobPostingsPage
            jobs={data.jobs}
            stats={data.stats}
            onSelectJob={handleSelectJob}
            onCreateJob={handleCreateJob}
          />
        );
    }
  };

  return (
    <>
      <CompanyDashboardLayout
        currentPage={currentPage}
        onNavigate={handleNavigation}
        notifications={notifications}
      >
        {renderPage()}
      </CompanyDashboardLayout>
    </>
  );
}
