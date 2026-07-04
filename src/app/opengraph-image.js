import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Trimora Systems — Building the Future of Business Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Temporary, honest OG image: brand colors + wordmark only, no fabricated
// logo mark or product screenshot. Once the real Trimora Systems logo
// (Item 3) is supplied, this file is the only place that needs updating —
// swap the wordmark text block for an <img> of the real mark. Nothing
// referencing this image elsewhere (metadata, layout) needs to change.
export default async function Image() {
  const [boldFontData, mediumFontData] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff"
      )
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff"
      )
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0908",
          backgroundImage:
            "linear-gradient(135deg, #0a0908 0%, #14120f 60%, #211d17 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 4,
            backgroundColor: "#d4a537",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: 76,
            fontWeight: 700,
            color: "#f2ede0",
            letterSpacing: -1,
          }}
        >
          Trimora Systems
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontFamily: "Space Grotesk",
            fontSize: 30,
            fontWeight: 500,
            color: "#e8bc52",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Building the Future of Business Management
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: boldFontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Space Grotesk",
          data: mediumFontData,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
