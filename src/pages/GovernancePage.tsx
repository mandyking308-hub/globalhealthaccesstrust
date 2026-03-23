export const GovernancePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="mb-4">Governance & Oversight</h1>
          <p className="text-[15px] text-muted-foreground leading-[1.7] max-w-3xl">
            Our commitment to transparent, accountable, and ethical governance.
          </p>
        </div>
      </section>

      {/* Governance Philosophy */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Governance Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="section-container">
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                The Global Health Access Trust operates under a governance framework designed to 
                ensure accountability, transparency, and effectiveness in all our activities. 
                We are committed to the highest standards of institutional integrity and public trust.
              </p>
            </div>
            <div className="section-container">
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                Our governance approach is built on the principles of fiduciary duty, collective 
                responsibility, and prudent stewardship of charitable resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Board of Trustees</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Composition & Appointment</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                The Board comprises individuals with diverse expertise in global health, 
                governance, finance, and law. Trustees are appointed based on their commitment to 
                our charitable objectives and their professional competence.
              </p>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Key Responsibilities</h3>
              <ul className="space-y-2 text-[15px] text-muted-foreground leading-[1.7]">
                <li>• Setting strategic direction and charitable objectives</li>
                <li>• Ensuring compliance with legal and regulatory requirements</li>
                <li>• Overseeing financial management and risk assessment</li>
                <li>• Monitoring performance and impact measurement</li>
                <li>• Safeguarding the Trust's reputation and public trust</li>
              </ul>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Meeting Structure</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                The Board meets quarterly, with additional meetings convened as necessary. 
                All meetings follow formal procedures with documented minutes and action tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision-Making */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Decision-Making Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Delegated Authority</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                Clear delegation of authority ensures efficient decision-making while maintaining 
                appropriate oversight. Major decisions require full Board approval.
              </p>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Committee Structure</h3>
              <ul className="space-y-2 text-[15px] text-muted-foreground leading-[1.7]">
                <li><strong>Audit:</strong> Financial oversight and risk management</li>
                <li><strong>Programme:</strong> Strategic direction and impact</li>
                <li><strong>Governance:</strong> Board effectiveness and compliance</li>
              </ul>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Voting & Quorum</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                All significant decisions require a quorum and are made by majority vote, 
                with the Chair having a casting vote in case of deadlock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk & Conflicts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Risk & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Conflicts of Interest</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-3">
                All trustees and senior staff maintain registers of interests and declare any 
                potential conflicts at the beginning of each meeting. Conflicts are managed 
                through withdrawal from discussions as appropriate.
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                Registers are reviewed annually. The Governance Committee monitors compliance.
              </p>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Risk Management</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-3">
                The Trust maintains a comprehensive risk register covering strategic, operational, 
                financial, and reputational risks.
              </p>
              <ul className="space-y-1 text-[13px] text-muted-foreground">
                <li>• Regulatory compliance and legal obligations</li>
                <li>• Financial management and sustainability</li>
                <li>• Programme delivery and impact</li>
                <li>• Information security and data protection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Governance & Transparency */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Financial Governance & Transparency</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Financial Controls</h3>
              <ul className="space-y-2 text-[15px] text-muted-foreground leading-[1.7]">
                <li>• Segregation of duties in financial processes</li>
                <li>• Dual authorisation for significant expenditures</li>
                <li>• Regular financial monitoring and reporting</li>
                <li>• Annual external audit by qualified auditors</li>
              </ul>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Public Reporting</h3>
              <ul className="space-y-2 text-[15px] text-muted-foreground leading-[1.7]">
                <li>• Annual reports filed with the Charity Commission</li>
                <li>• Financial statements per SORP requirements</li>
                <li>• Impact reporting demonstrating outcomes</li>
                <li>• Public access to governance documents</li>
              </ul>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Performance Monitoring</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                The Board monitors performance against strategic objectives using agreed KPIs 
                covering programme outcomes, financial efficiency, and governance effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="section-container">
            <h3 className="mb-3 text-foreground">Governance Enquiries</h3>
            <p className="text-[15px] text-muted-foreground leading-[1.7]">
              <strong>Contact:</strong>{" "}
              <a href="/contact" className="text-primary hover:underline">
                Please use the Contact Form
              </a>
              {" "}— include "Governance" in the subject line.
              Annual reports are available on request and via the Charity Commission.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
