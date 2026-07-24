import { Navigate } from "react-router-dom";

/**
 * Legacy route retained only for compatibility.
 * GHAT does not operate the former fixed 20/80 allocation or immediate-payment form.
 */
export const DonationFormPage = () => <Navigate to="/donate#pledge-form" replace />;

export default DonationFormPage;
