import { NextResponse } from "next/server";

import prisma from "../../../../prisma/client";

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(
    {
      success: true,
      message: "List data product",
      data: products,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request) {
  const { name, price, stock, description, image } = await request.json();

  const product = await prisma.product.create({
    data: {
      name: name,
      price: price,
      stock: stock,
      description: description,
      image: image,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: "Post Created Successfully!",
      data: product,
    },
    { status: 201 }
  );
}
