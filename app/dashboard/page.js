import { DashboardContextProvider } from '@/contextApi/DashboardContext';
import { DashboardPage } from '@/screens/dashboard/DashboardPage';

export default function DashboardRoutePage() {
  return (
    <DashboardContextProvider>
      <DashboardPage />
    </DashboardContextProvider>
  );
} 