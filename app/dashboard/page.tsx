import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import SummaryCard from '../../components/summarycard';
import AttendanceOverview from '../../components/attendanceoverview';

import { Separator } from "@/components/ui/separator"


const Dashboard = () => {
  return (
    //<div className="flex-1 p-4 sm:p-10 overflow-auto">


    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-10">
        {/* Header */}
        <Header />
      
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard title="Total Employee" value="560" percentageChange="+12%" />
          <SummaryCard title="Total Applicant" value="1050" percentageChange="+5%" />
          <SummaryCard title="Today Attendance" value="470" percentageChange="-8%" isPositive={false} />
          <SummaryCard title="Total Projects" value="250" percentageChange="+12%" />
        </div>
        <Separator/>
        {/* Main Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <AttendanceOverview  />
          
          
        </div>
        
      </div>
    </div>
   // </div>
  );
};

export default Dashboard;
