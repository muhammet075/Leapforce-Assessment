const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

sitemap({
    baseUrl: "Next.com",
    pagesDirectory: path.resolve(__dirname, "../out/"),
    targetDirectory: path.resolve(__dirname, "../out/"),
    sitemapFilename: 'sitemap.xml',
    ignoredExtensions: ["js", "map", "json", "xml", "png", "css", "jpeg", "jpg", "icon", "svg"],
    ignoredPaths: [
        "404",
        "favicon",
    ],
    extraPaths: [
        "/",
    ]
})

