'use client';

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddFormPage from "@/app/dashboard/form/addform/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  purpose: string;
  image: string;
  description?: string;
  detailDescription?: string;
};

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch products from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product))
      );
    });
    return () => unsubscribe();
  }, []);

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Check console.");
    }
  };

  // Open edit form
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <>
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Original Price</TableHead>
            <TableHead>Discounted Price</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Image src={p.image} alt={p.title} width={80} height={1000}className="rounded" />
              </TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>${p.originalPrice}</TableCell>
              <TableCell>${p.discountPrice}</TableCell>
              <TableCell>{p.purpose}</TableCell>
              <TableCell className="flex gap-2 mt-4">
                <Button
                  className="bg-blue-500 text-white"
                  onClick={() => handleEditProduct(p)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit/Add Dialog */}
      {isDialogOpen && editingProduct && (
        <AddFormPage
          productToEdit={editingProduct}
          onClose={() => {
            setEditingProduct(null);
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ProductTable;
