export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}) {
  return (
    <div className={`section-heading ${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
