export function TrustLogos() {
  const companies = [
    { name: "Shopify", size: "text-xl" },
    { name: "HubSpot", size: "text-lg" },
    { name: "Stripe", size: "text-xl" },
    { name: "Webflow", size: "text-lg" },
    { name: "Intercom", size: "text-lg" },
  ];

  return (
    <section className="py-8 px-4 bg-gray-50/50 dark:bg-gray-900/20">
      <div className="container mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-light text-muted-foreground mb-6">
          Trusted by 500+ leading companies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <span className={`${company.size} font-medium tracking-tight`}>{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
