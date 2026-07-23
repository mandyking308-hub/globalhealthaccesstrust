import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const ContactTheTrustPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Contact the Trust"
        description="Contact the Global Health Access Trust about healthcare-access and system projects, professional contribution, partnerships, support, legal matters and confidential reporting routes."
        canonical="/contact-the-trust"
      />
      <h1>Contact the Trust</h1>

      <p className="featured-text">Discreet. Professional. Accountable.</p>

      <p>The Global Health Access Trust welcomes enquiries from individuals, communities, professionals, institutions, supporters and advisers with a genuine interest in its charitable work.</p>
      <p>Enquiries may concern:</p>
      <ul>
        <li>A healthcare-access, infrastructure, workforce or community-system challenge</li>
        <li>Technical, research, operational or professional contribution</li>
        <li>Joining a project team or volunteering with the Trust</li>
        <li>Organisational, institutional or community partnership</li>
        <li>Active-project support, commissioned projects or general donations</li>
        <li>Major, restricted, institutional or legacy support</li>
        <li>Legal, governance, media or general matters</li>
      </ul>
      <p>Personal information is handled in accordance with the Trust's privacy, safeguarding and data-protection arrangements.</p>

      <div className="section-container">
        <h2>Find the Right Route</h2>
        <p>Different enquiries require different systems, safeguards and forms of review. Please select the route that most closely reflects the reason for your approach.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="section-container">
          <h2>1. Bring a Healthcare-Access or System Proposition</h2>
          <p>Individuals, communities, professionals and organisations may approach the Trust regarding a defined healthcare-access, infrastructure, workforce, logistics, education, research or community-system challenge.</p>
          <p>Please explain:</p>
          <ul>
            <li>The access, service or system problem being addressed</li>
            <li>The population, community or service context</li>
            <li>The country or setting</li>
            <li>The proposed charitable project or enabling support</li>
            <li>Any material urgency, safeguarding or delivery considerations</li>
          </ul>
          <p>Supporters who are ready to create and fund a new project can submit it through the commissioned-project system in the secure donor dashboard.</p>
          <p>An initial enquiry or submission does not constitute project approval. Projects proceed through scoping, charitable-purpose assessment, feasibility review, safeguarding, due diligence and Trustee consideration.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild variant="outline"><Link to="/contact">Submit a Project Proposition</Link></Button>
            <Button asChild><Link to="/commission-projects">Commission a New Project</Link></Button>
          </div>
        </div>

        <div className="section-container">
          <h2>2. Join a Project Team or Contribute Expertise</h2>
          <p>Clinicians, technologists, artificial-intelligence specialists, researchers, educators, operational professionals and other experienced contributors may register an interest in supporting the Trust's charitable projects.</p>
          <p>Applicants should provide appropriate information about:</p>
          <ul>
            <li>Professional expertise and relevant experience</li>
            <li>Qualifications, registrations or specialist capability</li>
            <li>Countries, languages or settings in which they can contribute</li>
            <li>Availability and preferred form of participation</li>
            <li>Any professional, contractual or safeguarding requirements</li>
          </ul>
          <p>Participation may be voluntary, advisory, professional or project-based, depending on the approved project and the role required.</p>
          <p>Registration does not guarantee assignment. Project participation remains subject to identity and professional verification, safeguarding, appropriate agreements and a defined project need.</p>
          <p>Clinical roles within a project are undertaken within the governance and professional responsibility of the relevant regulated healthcare provider.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild><Link to="/volunteer-apply">Apply to Join a Project Team</Link></Button>
            <Button asChild variant="outline"><Link to="/project-team-login">Project Team Login</Link></Button>
          </div>
        </div>

        <div className="section-container">
          <h2>3. Work With or Volunteer for the Trust</h2>
          <p>Employment, internship and general volunteering opportunities will be published when available.</p>
          <p>This route is appropriate for:</p>
          <ul>
            <li>General volunteering</li>
            <li>Administrative or operational support</li>
            <li>Internships and structured placements</li>
            <li>Future employment enquiries</li>
            <li>People wishing to support the Trust who are not applying for a specialist project role</li>
          </ul>
          <p>Applications should be made through the designated opportunity or volunteer route. Applicants should not send unnecessary sensitive information or speculative personal documents through the general contact form.</p>
          <Button asChild className="mt-5"><Link to="/volunteer-apply">View Volunteer and Participation Opportunities</Link></Button>
        </div>

        <div className="section-container">
          <h2>4. Organisational and Institutional Partnerships</h2>
          <p>The Trust welcomes approaches from organisations able to contribute expertise, delivery capability, research, technology, infrastructure, local access, logistics, professional teams or funding to defined charitable work.</p>
          <p>Potential partners may include:</p>
          <ul>
            <li>Hospitals, clinics and health systems acting within their own regulatory responsibilities</li>
            <li>Universities and research institutions</li>
            <li>Charities, community organisations and faith-based bodies</li>
            <li>Technology, data and artificial-intelligence organisations</li>
            <li>Food-system, logistics and infrastructure organisations</li>
            <li>Public and international institutions</li>
            <li>Foundations, family offices and responsible businesses</li>
          </ul>
          <p>Please describe the organisation, the proposed contribution, the system or access problem to be addressed and the form of partnership envisaged.</p>
          <p>Partnership discussions do not constitute approval or endorsement. Relationships remain subject to charitable alignment, independence, due diligence, safeguarding, legal review and Trustee oversight.</p>
          <Button asChild className="mt-5"><Link to="/contact">Discuss an Organisational Partnership</Link></Button>
        </div>

        <div className="section-container">
          <h2>5. Support, Fund or Commission Work</h2>
          <p>Supporters may engage with the Trust in several ways:</p>
          <ul>
            <li>Contribute to an approved active project displayed on the website</li>
            <li>Make a general donation that the Trustees can apply where charitable need and opportunity are greatest</li>
            <li>Create and commission a new charitable project through the secure donor dashboard</li>
            <li>Discuss major, multi-year, restricted or institutional support</li>
            <li>Explore legacy, estate or endowment arrangements</li>
          </ul>
          <p>A new supporter does not need to contact the Trust before making an ordinary donation or supporting an active public project.</p>
          <p>Commissioned projects, restricted gifts and significant funding relationships remain subject to charitable purpose, feasibility, due diligence, gift acceptance, financial controls and Trustee approval.</p>
          <p>Support does not confer ownership of a project, governance authority or control over charitable decisions.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild variant="outline"><Link to="/support-the-trust">Support an Active Project</Link></Button>
            <Button asChild><Link to="/donation-form">Make a General Donation</Link></Button>
            <Button asChild variant="outline"><Link to="/commission-projects">Commission a New Project</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Discuss Major or Legacy Support</Link></Button>
          </div>
        </div>

        <div className="section-container">
          <h2>6. Existing Relationships and Confidential Matters</h2>
          <p>Existing donors and project commissioners should use secure dashboard messaging for questions concerning an existing contribution, commissioned project, agreement or project update.</p>
          <p>Existing project-team members should use the project-team portal or the support route associated with their assignment.</p>
          <p>Legal, legacy and media matters may be submitted through the secure contact form using the relevant subject.</p>
          <p>Safeguarding reports, complaints, suspected fraud and protected concerns must use the Trust's dedicated confidential reporting routes rather than the general contact form.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild><Link to="/donor-login">Donor Portal</Link></Button>
            <Button asChild variant="outline"><Link to="/project-team-login">Project Team Portal</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Legal, Legacy or Media Enquiry</Link></Button>
            <Button asChild variant="outline"><Link to="/safeguarding/report">Safeguarding Report</Link></Button>
            <Button asChild variant="outline"><Link to="/complaints/new">Submit a Complaint</Link></Button>
            <Button asChild variant="outline"><Link to="/protected-concerns/new">Report a Protected Concern</Link></Button>
          </div>
        </div>
      </div>

      <div className="section-container">
        <h2>General Enquiries</h2>
        <p>
          <strong>Global Health Access Trust</strong><br />
          2 Harley Street<br />
          London, England<br />
          United Kingdom
        </p>
        <p>The secure contact form may be used for general information, healthcare-access or system project propositions, professional contribution, organisational partnerships, institutional and funding discussions, legal and legacy matters, and media or press enquiries.</p>
        <p>Please provide only the information necessary for the Trust to understand and direct the enquiry.</p>
        <Button asChild className="mt-4"><Link to="/contact">Use the Secure Contact Form</Link></Button>
      </div>

      <div className="section-container">
        <h2>Legacy &amp; Legal Enquiries</h2>
        <p>Legal representatives, executors, estate advisers and supporters considering a legacy may contact the Trust through the secure form.</p>
        <p>Please use the subject <strong>“Legacy or Legal Matter – Confidential”</strong>.</p>
        <p>The Trust can provide its correct legal name, correspondence address and governing-document information and can liaise appropriately with a supporter's professional advisers.</p>
        <p>Supporters should obtain independent legal and tax advice before making or altering a will, trust, estate arrangement or significant restricted gift.</p>
      </div>

      <div className="section-container">
        <h2>Support the Trust</h2>
        <p>Support may begin through an active project, a general donation, a commissioned project or a direct institutional discussion.</p>
        <p>The Trust welcomes confidential enquiries concerning:</p>
        <ul>
          <li>Major or multi-year contributions</li>
          <li>Restricted project funding</li>
          <li>Family-office, foundation or institutional support</li>
          <li>Legacy and estate giving</li>
          <li>Endowment or long-term funding discussions</li>
          <li>Contributions involving professional capability, technology, infrastructure or delivery support as well as capital</li>
        </ul>
        <p>Contributions remain subject to charitable purpose, appropriate due diligence, gift acceptance, financial controls and Trustee oversight.</p>
        <p>Support does not confer ownership of charitable work, preferential access to beneficiaries, governance authority or control over Trustee decisions.</p>
      </div>

      <div className="section-container">
        <h2>Project &amp; Professional Enquiries</h2>
        <p>Professionals, technologists, researchers, community organisations and other contributors may contact the Trust regarding a healthcare-access, infrastructure, workforce or system proposition, or a potential contribution of expertise.</p>
        <p>Please explain:</p>
        <ul>
          <li>The access, infrastructure or system problem being addressed</li>
          <li>The population, community or service context</li>
          <li>The proposed enabling contribution or project</li>
          <li>Relevant professional or organisational capability</li>
          <li>Any material safeguarding, timing or delivery considerations</li>
        </ul>
        <p>The Trust may respond by seeking further information, beginning a scoping process, directing the applicant to the project-team system or determining that the proposition cannot presently be progressed.</p>
        <p>An enquiry does not constitute appointment, partnership or project approval.</p>
      </div>

      <div className="section-container">
        <h2>Review and Response</h2>
        <p className="featured-text">Enquiries are reviewed and directed according to their nature, urgency and the appropriate governance, project, professional or safeguarding route.</p>
        <p>Urgent safeguarding or protected concerns should not rely on the general enquiry queue and must use the dedicated confidential reporting route.</p>
        <p>The Trust does not guarantee that every project proposition, application or partnership approach can be progressed, but genuine enquiries will be considered with professionalism and care.</p>
      </div>
    </ContentLayout>
  );
};