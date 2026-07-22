import { Navigate } from "react-router-dom";

// Public and portal payment collection remains disabled until the Trustees have
// verified a bank account in the legal name Global Health Access Trust, approved
// the settlement details and expressly enabled the relevant provider settings.
export const DonationFormPage = () => <Navigate to="/donate" replace />;
