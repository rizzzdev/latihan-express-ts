import express,  {  type Application, type Request, type Response } from "express"; 
import type { Product } from "./interface";

const app: Application = express(); 
const PORT = 4000;

app.use(express.json());

let products: Product[] = [
    {id:1, name:"Laptop", price:100000000, deskripsi:"ROG Strix G15 G513IH-HN004W 15.6 FHD 144Hz R7-4800H 8GB 512GB SSD GTX1650Ti W10"},
    {id:2, name:"Aqua", price:2000},
];

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/products", (req: Request, res: Response) => {
  res.status(200).json({
    Sukses: true,
    Pesan: "Berhasil mengambil semua produk",
    Data: products,
  });
});

app.get('/products/:id', (req: Request, res: Response) => {
  const idDicari = Number(req.params.id);
  
  const product = products.find(item => item.id === idDicari);

  if (!product) {
    return res.status(404).json({
      Sukses: false,
      Pesan: 'product dengan id ${idDicari} tidak ditemukan',
    });
  }
  res.status(200).json({
    Sukses: true,
    Data: product,
  });
});

app.post('/products', (req: Request, res: Response) => {
  const { name, price, deskripsi } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      Sukses: false,
      Pesan: 'Nama dan harga produk harus diisi',
    });
  }

  const newProduct: Product = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    deskripsi,
  };

  products.push(newProduct);

  res.status(201).json({
    Sukses: true,
    Pesan: 'Produk berhasil ditambahkan',
    Data: newProduct,
  });
});