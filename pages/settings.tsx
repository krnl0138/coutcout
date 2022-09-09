import { ProtectedRoute } from "../ui/features/protectedRoute/ProtectedRoute";
import { SettingsPage } from "../ui/features/settingsPage/SettingsPage";

const Settings = () => {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
};
export default Settings;
