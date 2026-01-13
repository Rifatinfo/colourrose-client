export default function BrandLoader() {
  const text = "COLOURROSE";

  return (
    <div className="loader-wrapper">
      <h1 className="brand-text text-[34px] lg:text-[64px] funnel-display">
        {text.split("").map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
