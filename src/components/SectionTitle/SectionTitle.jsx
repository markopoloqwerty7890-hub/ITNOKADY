export default function SectionTitle({ eyebrow, title, align = "left", className = "", eyebrowClassName, titleClassName, }) {
    const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
    const eyebrowStyles = eyebrowClassName ?? "text-xs font-bold uppercase tracking-[0.12em] text-brand-red";
    const titleStyles = titleClassName ?? "text-3xl font-extrabold text-brand-ink sm:text-4xl";
    return (<div className={`flex flex-col gap-2 ${alignment} ${className}`}>
      {eyebrow && (<span className={eyebrowStyles}>
          {eyebrow}
        </span>)}
      <h2 className={titleStyles}>{title}</h2>
    </div>);
}
