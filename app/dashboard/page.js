import DashboardPage from "../../pages/dashboard/DashboardPage"
import { DashboardContextProvider } from '@/contextApi/DashboardContext';

export default function DashboardRoutePage() {
  return (
    <DashboardContextProvider>
      <DashboardPage />
    </DashboardContextProvider>
  );
} 