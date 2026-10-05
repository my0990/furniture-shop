import { sql } from "@/lib/db";

function parseJsonColumn(value, fallback) {
  if (Array.isArray(value) || (value && typeof value === "object")) return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
}

function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    originalPrice: row.original_price,
    image: row.image,
    description: row.description,
    tags: row.tags || [],
    rating: Number(row.rating),
    reviewCount: row.review_count,
    colors: row.colors || [],
    options: parseJsonColumn(row.options, []),
    detailBlocks: parseJsonColumn(row.detail_blocks, []),
  };
}

export async function getAllProducts() {
  const rows = await sql("SELECT * FROM products ORDER BY created_at ASC");
  return rows.map(rowToProduct);
}

export async function getProductById(id) {
  const rows = await sql("SELECT * FROM products WHERE id = $1", [id]);
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function getProductsByCategory(slug) {
  const rows = await sql(
    "SELECT * FROM products WHERE category = $1 ORDER BY created_at ASC",
    [slug]
  );
  return rows.map(rowToProduct);
}

export async function getBestsellers() {
  const rows = await sql(
    "SELECT * FROM products WHERE 'bestseller' = ANY(tags) ORDER BY created_at ASC"
  );
  return rows.map(rowToProduct);
}

export async function getNewArrivals() {
  const rows = await sql(
    "SELECT * FROM products WHERE 'new' = ANY(tags) ORDER BY created_at ASC"
  );
  return rows.map(rowToProduct);
}

export async function createProduct(input) {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    image,
    description,
    tags,
    rating,
    reviewCount,
    options,
    detailBlocks,
  } = input;
  await sql(
    `INSERT INTO products
      (id, name, category, price, original_price, image, description, tags, rating, review_count, options, detail_blocks)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12::jsonb)`,
    [
      id,
      name,
      category,
      price,
      originalPrice,
      image,
      description,
      tags,
      rating,
      reviewCount,
      JSON.stringify(options || []),
      JSON.stringify(detailBlocks || []),
    ]
  );
}

export async function updateProduct(id, input) {
  const {
    name,
    category,
    price,
    originalPrice,
    image,
    description,
    tags,
    rating,
    reviewCount,
    options,
    detailBlocks,
  } = input;
  await sql(
    `UPDATE products SET
       name = $2, category = $3, price = $4, original_price = $5, image = $6,
       description = $7, tags = $8, rating = $9, review_count = $10,
       options = $11::jsonb, detail_blocks = $12::jsonb,
       updated_at = now()
     WHERE id = $1`,
    [
      id,
      name,
      category,
      price,
      originalPrice,
      image,
      description,
      tags,
      rating,
      reviewCount,
      JSON.stringify(options || []),
      JSON.stringify(detailBlocks || []),
    ]
  );
}

export async function deleteProduct(id) {
  await sql("DELETE FROM products WHERE id = $1", [id]);
}

// 가격 표시 형식 변환은 DB와 무관한 순수 함수라 lib/format.js로 분리해서 재사용
export { formatPrice } from "@/lib/format";
