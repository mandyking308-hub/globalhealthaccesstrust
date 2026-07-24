import conflictAfrica from "@/assets/conflict-africa-humanitarian.jpg";
import emergencyRelief from "@/assets/emergency-relief-hero.jpg";
import healthcareAccess from "@/assets/healthcare-access-hero.jpg";
import familyMedicalCare from "@/assets/family-medical-care.jpg";
import conflictUkraine from "@/assets/conflict-ukraine-humanitarian.jpg";
import educationTraining from "@/assets/education-training-hero.jpg";
import capacityTraining from "@/assets/ghat-capacity-training.jpg";
import fieldClinic from "@/assets/ghat-field-clinic-humanitarian.jpg";

type VisualRecord = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

const visualRecords: Record<string, VisualRecord[]> = {
  "/our-history/1991-1999": [
    {
      src: conflictAfrica,
      alt: "Humanitarian workers moving through a conflict-affected African setting",
      title: "Humanitarian response across borders",
      caption: "A thematic editorial image reflecting conflict response, displacement and the community networks described in this chapter.",
    },
    {
      src: emergencyRelief,
      alt: "Emergency relief supplies prepared for distribution",
      title: "Practical support in times of crisis",
      caption: "A thematic editorial image reflecting fundraising, essential goods and direct community support during the 1990s.",
    },
  ],
  "/our-history/2000-2009": [
    {
      src: healthcareAccess,
      alt: "Healthcare access in an underserved community setting",
      title: "Healthcare access and humanitarian need",
      caption: "A thematic editorial image reflecting the chapter's focus on health access, disaster response and vulnerable communities.",
    },
    {
      src: familyMedicalCare,
      alt: "A family receiving medical support in a community setting",
      title: "Children, families and continuity of care",
      caption: "A thematic editorial image reflecting child health, disability inclusion and sustained family support.",
    },
  ],
  "/our-history/2010-2019": [
    {
      src: conflictUkraine,
      alt: "Humanitarian support in a conflict-affected European setting",
      title: "Conflict, displacement and recovery",
      caption: "A thematic editorial image reflecting the decade's work around refugees, conflict response and communities under pressure.",
    },
    {
      src: educationTraining,
      alt: "Professionals taking part in a field training session",
      title: "Professional learning and wider capability",
      caption: "A thematic editorial image reflecting the growing international network, training and shared professional purpose.",
    },
  ],
  "/our-history/2020-2026": [
    {
      src: capacityTraining,
      alt: "A multi-region group of professionals in a field training session",
      title: "A coordinated international network",
      caption: "A thematic editorial image reflecting the clinical, professional and community relationships that supported the work during this period.",
    },
    {
      src: fieldClinic,
      alt: "A field clinic providing humanitarian healthcare",
      title: "From voluntary service to a permanent Trust",
      caption: "A thematic editorial image reflecting frontline health access, practical delivery and the formal development of GHAT.",
    },
  ],
};

export const HistoryVisualInterlude = ({ pathname }: { pathname: string }) => {
  const records = visualRecords[pathname];
  if (!records) return null;

  return (
    <section className="history-visual-interlude" aria-label="Thematic visual record">
      <div className="history-visual-interlude__heading">
        <p>Visual record</p>
        <h2>Images that reflect the chapter</h2>
        <span>
          These are carefully selected thematic editorial images. They do not identify a named beneficiary or claim to depict one specific recorded event.
        </span>
      </div>
      <div className="history-visual-interlude__grid">
        {records.map((record, index) => (
          <figure
            key={record.title}
            className={index === 1 ? "history-visual-interlude__figure history-visual-interlude__figure--offset" : "history-visual-interlude__figure"}
          >
            <div className="history-visual-interlude__image-wrap">
              <img src={record.src} alt={record.alt} loading="lazy" />
              <span>Editorial archive · {pathname.split("/").pop()}</span>
            </div>
            <figcaption>
              <strong>{record.title}</strong>
              <span>{record.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
