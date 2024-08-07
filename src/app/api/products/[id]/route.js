const { NextResponse } = require("next/server");
const { default: prisma } = require("../../../../../prisma/client");

export async function GET(request, { params }) {
  const id = parseInt(params.id);

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    return NextResponse.json(
      {
        success: true,
        message: "Detail data product no found",
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Detail data product",
      data: product,
    },
    { status: 200 }
  );
}

export async function PATCH(request, { params }) {
  const id = parseInt(params.id);

  const { name, price, stock, description, image } = await request.json();

  const product = await prisma.product.update({
    where: {
      id,
    },
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
      message: "Data product updated",
      data: product,
    },
    { status: 200 }
  );
}

export async function DELETE(request, {params}) {
    const id = parseInt(params.id);

    await prisma.product.delete({
        where: {
            id,
        },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Data product delete"
        },
        { status: 200 }
    )
}