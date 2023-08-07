import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function DELETE(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const movie = await prismadb.movie.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  if (movie) {
    return NextResponse.json({ success: true, id: params.id });
  }
  return NextResponse.json({ success: false, id: params.id });
}
