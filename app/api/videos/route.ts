import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET(response: NextResponse) {
  const movies = await prismadb.movie.findMany();

  if (movies) {
    return NextResponse.json(movies);
  }

  return NextResponse.json({ success: false });
}
