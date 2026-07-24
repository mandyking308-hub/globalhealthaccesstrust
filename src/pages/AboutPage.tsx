export const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-accent/20 to-gold/10">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="mb-6">Our vision is unwavering</h1>
          <p className="text-[15px] text-muted-foreground leading-[1.7] max-w-3xl">
            The Global Health Access Trust was established to uphold one of the most 
            sacred obligations of civil society: to protect the dignity of every human 
            life through access to health, healing, and hope—without border, bias, or exclusion.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Not charity. Legacy in motion.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="section-container">
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                Anchored in the enduring principles of duty, legacy, and public service, 
                we exist not to make noise—but to make a difference. Ours is not a campaign. 
                It is a trust. A covenant between conscience and capacity, designed to stand 
                the test of time.
              </p>
            </div>
            <div className="section-container">
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                We are governed not by trend or transaction, but by responsibility to those 
                left behind—the displaced, the overlooked, the abandoned. Founded by leaders 
                in global health, governance, and systems change, the Trust is built to convene 
                those who seek meaning beyond wealth.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="section-container text-center">
              <h3 className="mb-2 text-foreground">Principled</h3>
              <p className="text-[13px] text-muted-foreground">
                Governed by unwavering ethical standards
              </p>
            </div>
            <div className="section-container text-center">
              <h3 className="mb-2 text-foreground">Enduring</h3>
              <p className="text-[13px] text-muted-foreground">
                Built to stand the test of time
              </p>
            </div>
            <div className="section-container text-center">
              <h3 className="mb-2 text-foreground">Uncompromising</h3>
              <p className="text-[13px] text-muted-foreground">
                Never wavering in our commitment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Status */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Legal Status & Accountability</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="section-container">
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                Global Health Access Trust is a charitable trust established under the
                laws of England and Wales. It was constituted by Trust Deed with effect from
                1 December 2024 and is administered by its Board of Trustees exclusively for charitable purposes.
              </p>
            </div>
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Correspondence Address</h3>
              <div className="text-[15px] text-muted-foreground leading-[1.7]">
                <p>Global Health Access Trust</p>
                <p>2 Harley Street, London</p>
                <p>England, United Kingdom</p>
              </div>
              <p className="text-[13px] text-muted-foreground mt-3">
                This address is used for official correspondence, legal service, 
                and charity documentation.
              </p>
            </div>
          </div>
          
          <div className="section-container">
            <p className="text-[15px] text-muted-foreground leading-[1.7] mb-4">
              All donations, legacies, and grants received are held and applied for 
              exclusively charitable purposes, as defined under section 3 of the 
              Charities Act 2011.
            </p>
            <blockquote className="text-[15px] italic text-primary leading-[1.7]">
              "It is chartered under law, grounded in public duty, and built to endure."
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};