import React from "react";
import Hover from "./HoverPath/Hover";
import styles from "./CommunityList.module.css";

interface IUser {
  id: string;
  name: string;
  role?: string;
  initials?: string;
  avatarUrl?: string;
}

interface ICompany {
  id: string | number;
  name: string;
  industry?: string | null;
  logoUrl?: string | null;
}

type Item = IUser | ICompany;

interface ICommunityListProps {
  title: string;
  items: Item[];
  totalItems: number;
  variant?: "user" | "company";
  onShowAll?: () => void;
}

const CommunityList: React.FC<ICommunityListProps> = ({
  title,
  items,
  totalItems,
  variant = "user",
  onShowAll,
}) => {
  return (
    <div
      className={`bg-gradient-to-b from-[#1a1a2e] to-[#101024] p-4 rounded-lg shadow-lg ${
        styles.communityContainer
      }`}
    >
      <h2
        className={`text-lg font-semibold text-white ${styles.communityTitle}`}
      >
        {title} ({totalItems})
      </h2>

      <div className={styles.userList}>
        {items.map((item) => {
          const key = String(item.id);
          return (
            <Hover key={key} cardClassName="flexible">
              <div
                role="button"
                tabIndex={0}
                className={`flex items-center justify-between p-2 rounded-lg transition duration-300 ${
                  styles.userItem
                } ${variant === "company" ? styles.companyRow : "hover:bg-purple-500/10"}`}
              >
                <div className={`flex items-center`}>
                  {variant === "company" ? (
                    // Company layout: logo (if available) + name + industry
                    <>
                      <div className={styles.companyLogoWrap}>
                        {"logoUrl" in item && item.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.logoUrl}
                            alt={item.name}
                            className={styles.companyLogo}
                          />
                        ) : (
                          <div className={styles.companyInitials}>
                            {item.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className={`ml-3`}>
                        <p className={`text-white font-semibold`}>
                          {item.name}
                        </p>
                        <p className={`text-gray-300 text-sm`}>
                          {("industry" in item && item.industry) || "Company"}
                        </p>
                      </div>
                    </>
                  ) : (
                    // User layout: avatar/initials + name + role
                    <>
                      <div
                        className={`w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold ${
                          styles.userAvatar
                        }`}
                      >
                        {("initials" in item && item.initials) ||
                          item.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className={`ml-3`}>
                        <p className={`text-white font-semibold`}>
                          {item.name}
                        </p>
                        <p className={`text-gray-300 text-sm`}>
                          {("role" in item && item.role) || "Member"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Hover>
          );
        })}
      </div>

      <button
        onClick={onShowAll}
        className={`mt-4 text-blue-400 hover:underline ${styles.showAllButton}`}
      >
        Show All
      </button>
    </div>
  );
};

export default CommunityList;
