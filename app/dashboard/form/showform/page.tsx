'use client'
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Product = {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  purpose: string;
  image: string;
};

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(
        snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Product)
        )
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Original Price</TableHead>
          <TableHead>Discounted Price</TableHead>
          <TableHead>Purpose</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>
              <img src={p.image} alt={p.title} width={80} className="rounded" />
            </TableCell>
            <TableCell>{p.title}</TableCell>
            <TableCell>${p.originalPrice}</TableCell>
            <TableCell>${p.discountPrice}</TableCell>
            <TableCell>{p.purpose}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
