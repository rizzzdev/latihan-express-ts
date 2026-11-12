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

  const products = await prisma.product.findMany()




  res.status(200).json({
    Sukses: true,
    Pesan: "Berhasil mengambil semua produk",
    Data: products,
  });
});

app.get("/products/:id", async (req: Request, res: Response) => {
  const idDicari = Number(req.params.id);

  const product = await prisma.product.findFirst({
    where: {
      id: idDicari
    }
  })

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

app.post("/products", async (req: Request, res: Response) => {
  const { name, price, description, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({
      Sukses: false,
      Pesan: "Nama, stok, dan harga produk harus diisi",
    });
  }
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      description,
      stock
    }
  })


  res.status(201).json({
    Sukses: true,
    Pesan: "Produk berhasil ditambahkan",
    Data: newProduct,
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
