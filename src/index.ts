import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import type { Product } from "./interface";
import { prisma } from "./db";

const app: Application = express();
const PORT = 4000;

app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();

  res.status(200).json({
    Sukses: true,
    Pesan: "vinganteng dan paling sopan serta berwibawah",
    Data: products,
  });
});

app.get("/products/:id", async (req: Request, res: Response) => {
  const idDicari: number = Number(req.params.id);

  const product = await prisma.product.findFirst({
    where: {
      id: idDicari,
    },
  });

  if (!product) {
    return res.status(404).json({
      Sukses: false,
      Pesan: `product dengan id ${idDicari} tidak ditemukan`,
    });
  }
  res.status(200).json({
    Sukses: true,
    Data: product,
  });
});

app.delete("/products/:id", async (req, res) => {
  const id = Number(req.params.id);

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(404).json({
      Sukses: false,
      Pesan: `Produk ${id} tidak ditemukan.`,
    });
  }

  res.status(201).json({
    Sukses: true,
    Pesan: "Produk berhasil dihapus",
    Data: product,
  });
});

app.patch("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, price, description, stock } = req.body;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(404).json({
      Sukses: false,
      Pesan: `Produk ${id} tidak ditemukan.`,
    });
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      description,
      stock,
    },
  });

  res.status(200).json({
    Sukses: true,
    Pesan: "Produk berhasil diperbarui",
    Data: updatedProduct,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// repository => hanya untuk berhubungan ke database
// service => logic business
// controller => menerima request dan mengirim response
// route => endpoint
