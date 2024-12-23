import ProductCard from "@/components/ProductCard";
import {conn} from '@/libs/mysql'

async function loadProducts() {
  const products = await conn.query('SELECT * FROM children')
  return products
}

export const dynamic = 'force-dynamic'

async function ProductsPage() {
  const products = await loadProducts();

  return <div className="pt-10 px-3 grid gap-4 grid-cols-4">
    {products.map(children => (
        <ProductCard children={children} key={children.id} />
    ))}
  </div>;
}


export default ProductsPage;
