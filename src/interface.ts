export interface Product {
  id: number;
  name: string;
  price: number;
  deskripsi?: string;
}

export interface CreateProductBody {
  name: string;
  price: number;
  deskripsi?: string;
}

export interface IdParams {
  id: string;
}
