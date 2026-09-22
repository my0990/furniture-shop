export const categories = [
  {
    slug: "living",
    name: "거실",
    description: "소파, 거실장, 테이블 등 리빙 가구",
    image: "/images/categories/living.jpg",
  },
  {
    slug: "bedroom",
    name: "침실",
    description: "침대, 매트리스, 옷장으로 완성하는 침실",
    image: "/images/categories/bedroom.jpg",
  },
  {
    slug: "kitchen",
    name: "주방/다이닝",
    description: "다이닝테이블, 식탁의자, 주방 수납",
    image: "/images/categories/kitchen.jpg",
  },
  {
    slug: "office",
    name: "홈오피스",
    description: "책상, 의자, 책장으로 꾸미는 작업 공간",
    image: "/images/categories/office.jpg",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
