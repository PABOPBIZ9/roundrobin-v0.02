/** Shared subnav for PuckGold Affiliates pages */
(function () {
  const page = (location.pathname.split("/").pop() || "").toLowerCase();
  const links = [
    { href: "affiliates.html", label: "Overview", match: ["affiliates.html", ""] },
    { href: "affiliates-create.html", label: "Create Content", match: ["affiliates-create.html"] },
    { href: "affiliates-links.html", label: "Generate Links", match: ["affiliates-links.html"] },
    { href: "affiliates-earn.html", label: "Earn Cash", match: ["affiliates-earn.html"] },
    { href: "affiliates-faqs.html", label: "FAQs", match: ["affiliates-faqs.html"] },
  ];
  const el = document.getElementById("aff-subnav");
  if (!el) return;
  el.innerHTML = links
    .map((l) => {
      const on = l.match.includes(page);
      return `<a href="${l.href}" class="${on ? "is-active" : ""}">${l.label}</a>`;
    })
    .join("") + `<a href="talent.html?role=affiliate" class="aff-cta">Sign Up</a>`;
})();
