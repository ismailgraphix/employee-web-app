import React from "react";
import Image from "next/image";
import logo from "../assets/picture.jpg"
import { CiUser } from "react-icons/ci";
import { IoIosLock } from "react-icons/io";
import { SiGooglemeet } from "react-icons/si";
interface NotificationProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const notifications = [
  {
    icon: <Image src={logo} alt="Leave Request" className="w-10 h-10 rounded-full" />, // Replace with the actual avatar image
    title: "Leave Request",
    description: "@Robert Fox has applied for leave",
    time: "Just Now",
  },
  {
    icon: <div className="w-10 h-10 rounded-full"><CiUser /></div>, // Replace with an actual icon or avatar
    title: "Check In Issue",
    description: "@Alexa shared a message regarding check-in issue",
    time: "11:16 AM",
  },
  {
    icon: <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white"><IoIosLock /></div>, // Replace with an actual icon or avatar
    title: "Applied job for “Sales Manager” Position",
    description: "@Shane Watson has applied for job",
    time: "09:00 AM",
  },
  {
    icon: <Image src={logo} alt="Feedback" className="w-10 h-10 rounded-full" />, // Replace with the actual avatar image
    title: "Robert Fox has shared his feedback",
    description: `"It was an amazing experience with your organization"`,
    time: "Yesterday",
  },
  {
    icon: <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"><SiGooglemeet /></div>, // Replace with an actual icon or avatar
    title: "Password Updated Successfully",
    description: "Your password has been updated successfully",
    time: "Yesterday",
  },
];

const Notification: React.FC<NotificationProps> = ({ icon, title, description, time }) => (
  <div className="flex items-start justify-between py-6 border-b last:border-b-0">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
    <div className="text-gray-400 text-sm">{time}</div>
  </div>
);

const NotificationList: React.FC = () => {
  return (
    <div className="bg-white p-9 rounded-lg shadow">
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          icon={notification.icon}
          title={notification.title}
          description={notification.description}
          time={notification.time}
        />
      ))}
    </div>
  );
};

export default NotificationList;
