import { join } from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import { getUploadUrl } from "@/libs/helper";

export async function GET(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const movie = await prismadb.movie.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (movie) {
    return NextResponse.json(movie);
  }

  return NextResponse.json({ success: false });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.formData();
  const imageFile: File | null = data.get("imageFile") as unknown as File;
  const videoFile: File | null = data.get("videoFile") as unknown as File;

  if (!imageFile || !videoFile) {
    return NextResponse.json({ success: false });
  }

  const imageBytes = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);

  const imagePath = join("public", "files", imageFile.name);
  await writeFile(imagePath, imageBuffer);

  const videoBytes = await videoFile.arrayBuffer();
  const videoBuffer = Buffer.from(videoBytes);

  const videoPath = join("public", "files", videoFile.name);
  await writeFile(videoPath, videoBuffer);

  const movie = await prismadb.movie.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: data.get("title") as string,
      description: data.get("title") as string,
      videoUrl: getUploadUrl(videoPath),
      thumbnailUrl: getUploadUrl(imagePath),
      genre: "Comedy",
      rating: 5,
      duration: "15 mins",
    },
  });

  return NextResponse.json({
    success: true,
    data: { title: data.get("title"), description: data.get("description") },
  });
}
