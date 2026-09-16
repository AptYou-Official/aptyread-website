import sharp from "sharp";

const width = 1200;
const height = 630;
const photoPanelWidth = 610;
const photoWidth = 570;
const photoHeight = 321;
const photoTop = 154;
const photoCard = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="14" y="134" width="${photoPanelWidth - 28}" height="361" rx="28" fill="#FFFFFF" stroke="#C8EAF4" stroke-width="2"/>
</svg>`;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${photoPanelWidth}" width="${width - photoPanelWidth}" height="${height}" fill="#E6F6FB"/>
  <circle cx="1110" cy="92" r="150" fill="#00A7D9" opacity="0.12"/>
  <text x="690" y="128" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#173A8A">Apty<tspan fill="#00A7D9">Read</tspan></text>
  <text x="690" y="235" font-family="Arial, sans-serif" font-size="61" font-weight="700" fill="#173A8A">Every child</text>
  <text x="690" y="307" font-family="Arial, sans-serif" font-size="61" font-weight="700" fill="#173A8A">can learn to read.</text>
  <text x="690" y="383" font-family="Arial, sans-serif" font-size="27" fill="#50627C">English reading for ages 4 to 10.</text>
  <text x="690" y="425" font-family="Arial, sans-serif" font-size="27" fill="#50627C">Five levels. One path.</text>
  <rect x="690" y="480" width="250" height="54" rx="27" fill="#008DA8"/>
  <text x="723" y="516" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="#FFFFFF">Start Lesson 1</text>
</svg>`;

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: "#FFFDF8",
  },
})
  .composite([
    { input: Buffer.from(photoCard), left: 0, top: 0 },
    {
      input: await sharp("public/images/parent-child-reading.png")
        .resize(photoWidth, photoHeight, { fit: "contain" })
        .composite([
          {
            input: Buffer.from(
              `<svg width="${photoWidth}" height="${photoHeight}"><rect width="${photoWidth}" height="${photoHeight}" rx="18" fill="white"/></svg>`,
            ),
            blend: "dest-in",
          },
        ])
        .png()
        .toBuffer(),
      left: 20,
      top: photoTop,
    },
    { input: Buffer.from(svg), left: 0, top: 0 },
  ])
  .png({ quality: 90 })
  .toFile("public/images/aptyread-social-share.png");
