export default function BrandLoader() {
  const text = "COLOURROSE";

  return (
    <div className="loader-wrapper flex flex-col items-center justify-center gap-6">

      {/* ============= Spinner ==============*/}
      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />

      {/*============== Brand text =============*/}
      <h1 className="brand-text text-[34px] lg:text-[64px] funnel-display tracking-wider">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block animate-fadeUp"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
