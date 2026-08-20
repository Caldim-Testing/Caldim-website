import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import productsData from "@/data/products.json";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  // Find the product to get its video URL
  const product = productsData.find((p) => p.id === productId);

  if (!product || !product.videoUrl) {
    return new NextResponse("Video not found", { status: 404 });
  }

  // If it's an external URL (e.g. YouTube, Vimeo), just redirect to it
  if (product.videoUrl.startsWith("http")) {
    return NextResponse.redirect(product.videoUrl);
  }

  // Resolve file path relative to current working directory (e.g. public/Product Videos/filename.mp4)
  let filePath = path.join(process.cwd(), "public", product.videoUrl);

  // VPS Fallback: If not found, check exact Linux server directory
  if (!fs.existsSync(filePath)) {
    const vpsPath = path.join("/var/www/Expo-Page/public", product.videoUrl);
    if (fs.existsSync(vpsPath)) {
      filePath = vpsPath;
    }
  }

  try {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
      // Handle range requests for video scrubbing (HTTP 206 Partial Content)
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        "Content-Type": "video/mp4",
      };

      return new NextResponse(file as any, {
        status: 206,
        headers: head,
      });
    } else {
      // Return the whole file if no range is requested (HTTP 200 OK)
      const head = {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
      };
      const file = fs.createReadStream(filePath);
      return new NextResponse(file as any, {
        status: 200,
        headers: head,
      });
    }
  } catch (error) {
    console.error("Error streaming video:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
