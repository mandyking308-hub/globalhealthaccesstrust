import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const GetInvolvedPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Get Involved"
        description="Contribute expertise, capability, relationships or resources to charitable public-benefit projects developed by the Global Health Access Trust."
        canonical="/get-involved"
      />

      <h1>Get Involved</h1>

      <p className="featured-text">
        Bring expertise, capability, relationships or resources to work that enables better health, safety, dignity and human capability.
      </p>

      <p>
        The Global Health Access Trust brings together professional contributors, communities,
        organisations and supporters around clearly defined charitable projects.
      </p>
      <p>
        Participation is structured according to the needs of each project. It may involve
        professional expertise, practical delivery, institutional partnership, funding,
        technology, research, local knowledge or voluntary contribution.
      </p>

      <div className="section-container">
        <h2>Choose How You Wish to Engage</h2>
        <p>
          Select the route that most closely reflects the contribution, proposition or
          relationship you wish to explore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="section-container">
          <h2>Join a Project Team or Contribute Expertise</h2>
          <p>
            Clinicians, researchers, technologists, educators, operational specialists and
            other experienced contributors may register an interest in supporting approved
            projects.
          </p>
          <p>
            Applications should explain relevant expertise, experience, location, languages,
            availability and preferred form of contribution.
          </p>
          <p>
            Participation is subject to appropriate verification, safeguarding, agreements
            and an identified project requirement.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild><Link to="/volunteer-apply">Apply to Join a Project Team</Link></Button>
            <Button asChild variant="outline"><Link to="/project-team-login">Project Team Login</Link></Button>
          </div>
        </div>

        <div className="section-container">
          <h2>Discuss an Organisational Partnership</h2>
          <p>
            The Trust welcomes approaches from organisations able to contribute expertise,
            research, infrastructure, technology, logistics, local access, professional teams
            or delivery capability.
          </p>
          <p>
            Potential partners may include universities, healthcare institutions, charities,
            community and faith-based organisations, public bodies, foundations and
            responsible businesses.
          </p>
          <p>
            Partnership discussions remain subject to alignment with the Trust's charitable
            purposes, due diligence, safeguarding and Trustee approval.
          </p>
          <Button asChild className="mt-5"><Link to="/contact">Discuss a Partnership</Link></Button>
        </div>

        <div className="section-container">
          <h2>Support, Pledge or Commission Work</h2>
          <p>Supporters may:</p>
          <ul>
            <li>Pledge funding, time, expertise, equipment, premises or other resources</li>
            <li>Offer support for an approved active project</li>
            <li>Create and commission a new charitable project</li>
            <li>Discuss major, restricted, institutional or legacy support</li>
          </ul>
          <p>
            Every pledge is reviewed before acceptance. Financial supporters are taken through
            the appropriate donor-verification and due-diligence process before payment or transfer
            instructions are provided.
          </p>
          <p>
            Supporters may choose appropriate recognition and privacy arrangements. Support does
            not confer ownership, governance authority or control over charitable decisions.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild variant="outline"><Link to="/support-the-trust">Support the Trust</Link></Button>
            <Button asChild><Link to="/donate#pledge-form">Pledge a Contribution</Link></Button>
            <Button asChild variant="outline"><Link to="/commission-projects">Commission a Project</Link></Button>
            <Button asChild variant="outline"><Link to="/donor-login">Open Donor Portal</Link></Button>
          </div>
        </div>

        <div className="section-container">
          <h2>Bring a Public-Benefit Proposition</h2>
          <p>
            Individuals, communities and organisations may approach the Trust with a defined
            healthcare-access, infrastructure, housing, food-system, education, technology,
            workforce, logistics, humanitarian or community-system challenge connected to the
            Trust's charitable purposes.
          </p>
          <p>
            Please explain the problem, the setting, the population or service affected, the
            proposed enabling contribution and any material safeguarding or delivery
            considerations.
          </p>
          <p>
            An enquiry does not constitute project approval. Propositions proceed through
            scoping, feasibility review, due diligence and Trustee consideration.
          </p>
          <Button asChild className="mt-5"><Link to="/contact">Submit a Project Proposition</Link></Button>
        </div>
      </div>

      <div className="section-container">
        <h2>Volunteer and Future Opportunities</h2>
        <p>
          General volunteering, internships, administrative support and employment
          opportunities will be published when available.
        </p>
        <p>
          People wishing to offer general support should use the designated application route
          rather than sending speculative documents through the ordinary contact form.
        </p>
        <Button asChild className="mt-4"><Link to="/volunteer-apply">View Volunteer Opportunities</Link></Button>
      </div>

      <div className="section-container">
        <h2>Existing Relationships</h2>
        <p>Existing project-team members should use the Project Team Portal.</p>
        <p>
          Existing donors and project commissioners should use the Donor Portal and secure
          dashboard messaging for matters relating to an existing contribution or project.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button asChild><Link to="/project-team-login">Project Team Portal</Link></Button>
          <Button asChild variant="outline"><Link to="/donor-login">Donor Portal</Link></Button>
        </div>
      </div>

      <div className="section-container">
        <h2>How Participation Works</h2>
        <p>
          Expressions of interest are reviewed according to project need, capability,
          safeguarding, legal requirements and available capacity.
        </p>
        <p>
          Where there is a suitable opportunity, the Trust may request further information,
          conduct appropriate verification and establish the agreement, responsibilities and
          reporting arrangements required for the role.
        </p>
        <p>
          Registering an interest does not guarantee appointment, project assignment,
          partnership, acceptance of a contribution or funding.
        </p>
      </div>

      <div className="section-container">
        <h2>Stay Informed</h2>
        <p>
          Approved reports, research, project publications and institutional updates are made
          available through the Publications &amp; Documents page and the Trust's institutional-updates service.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button asChild><Link to="/publications">View Publications &amp; Documents</Link></Button>
          <Button asChild variant="outline"><Link to="/contact-the-trust">Find the Right Route</Link></Button>
        </div>
      </div>

      <div className="section-container">
        <p className="featured-text">
          Different people contribute in different ways. What matters is that every
          contribution serves a defined charitable purpose and strengthens the people and
          systems on which better health and public benefit depend.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <Button asChild><Link to="/contact-the-trust">Find the Right Route</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact the Trust</Link></Button>
        </div>
      </div>
    </ContentLayout>
  );
};
