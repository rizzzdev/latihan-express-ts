import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import type { Product } from "./interface";
import { prisma } from "./db";

const app: Application = express();
app.use(express.json());

app.post("/products", async (req: Request, res: Response) => {
  const { name, price, description, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({
      Sukses: false,
      Pesan: "Nama, stok, dan harga produk harus diisi",
    });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price), // Pastikan format angka jika dikirim dari JSON
        description,
        stock: Number(stock), // Pastikan format angka
      },
    });

    // Respons sukses harus berada di DALAM blok app.post
    return res.status(201).json({
      Sukses: true,
      Pesan: "Produk berhasil ditambahkan",
      Data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      Sukses: false,
      Pesan: "Gagal menambahkan produk ke database",
      Error: error instanceof Error ? error.message : error,
    });
  }
});