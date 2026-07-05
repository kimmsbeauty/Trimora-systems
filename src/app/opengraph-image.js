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
//
// Paper & Ink re-skin: matches the site's light editorial palette, not
// the old gold-on-black theme. Uses Instrument Serif (regular + italic)
// instead of Space Grotesk, consistent with the rest of the site.
export default async function Image() {
  const [regularFontData, italicFontData] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"
      )
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff"
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
          backgroundColor: "#f5f3ee",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 2,
            backgroundColor: "#0d0d0d",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 84,
            fontWeight: 400,
            color: "#0d0d0d",
            letterSpacing: -1,
          }}
        >
          Trimora Systems
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 32,
            fontWeight: 400,
            color: "#35507a",
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
          name: "Instrument Serif",
          data: regularFontData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Instrument Serif",
          data: italicFontData,
          weight: 400,
          style: "italic",
        },
      ],
    }
  );
}
