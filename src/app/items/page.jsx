import ProductCard from "@/components/ProductCard";
import {conn} from '@/libs/mysql'


async function loadItems() {
  const items = await conn.query('SELECT * FROM item')
  return items
}

export const dynamic = 'force-dynamic'

async function ProductsPage() {
  const products = await loadItems();

  return <div className="grid gap-4 grid-cols-4">
    {products.map(item => (
        <ProductCard item={item} key={item.id} />
    ))}
  </div>;
}

export default ProductsPage;
