import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://cold-asset.com";

// Public routes ONLY
const ROUTES = [
  "/",
  "/features",
  "/install",
  "/privacy",
  "/terms",
  "/security",
  "/cookie",
  "/contact",
  "/compliance",
];


function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildSitemapXml(siteUrl, routes) {
  const now = new Date().toISOString();
  const base = siteUrl.replace(/\/$/, "");

  const urls = routes
    .map((r) => {
      const loc = `${base}${r}`;
      const priority = r === "/" ? "1.0" : "0.7";
      return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobotsTxt(siteUrl) {
  const base = siteUrl.replace(/\/$/, "");
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}

function main() {
  const distDir = path.resolve(process.cwd(), "dist");
  fs.mkdirSync(distDir, { recursive: true });

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemapXml(SITE_URL, ROUTES), "utf8");
  fs.writeFileSync(path.join(distDir, "robots.txt"), buildRobotsTxt(SITE_URL), "utf8");

  console.log("✅ Generated dist/sitemap.xml and dist/robots.txt");
  console.log("SITE_URL:", SITE_URL);
  console.log("Routes:", ROUTES);
}

main();
