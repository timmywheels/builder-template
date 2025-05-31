export function TrustLogos() {
  const companies = [
    "Simple Analytics",
    "Revisto",
    "Nvidia",
    "Creativeforce",
    "Ubiops",
    "Homestra",
    "Weglot",
    "Center Parcs",
    "Goochem Media",
  ];

  return (
    <section className="py-8 px-4 bg-gray-50/50 dark:bg-gray-900/20">
      <div className="container mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-light text-muted-foreground mb-5">
          Trusted by 500+ Companies & Agencies
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {companies.map((company) => (
            <div
              key={company}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <div className="text-xs font-light text-gray-700 dark:text-gray-400">{company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
