import { MenuCategory } from "./MegaMenu";

export const menuData: Record<string, MenuCategory> = {
 WOMEN: {
    id: 'women',
    featuredImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    featuredTitle: 'The Autumn Edit',
    columns: [
      {
        title: 'Clothing',
        items: [
          'New Arrivals',
          'Dresses',
          'Coats & Jackets',
          'Knitwear',
          'Trousers',
          'Blazers',
        ],
      },
      {
        title: 'Shoes',
        items: ['Boots', 'Heels', 'Loafers', 'Sneakers', 'Sandals'],
      },
      {
        title: 'Accessories',
        items: ['Bags', 'Jewelry', 'Scarves', 'Belts', 'Sunglasses'],
      },
    ],
  },
  MEN: {
    id: 'men',
    featuredImage:
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    featuredTitle: 'Modern Tailoring',
    columns: [
      {
        title: 'Clothing',
        items: [
          'New Arrivals',
          'Suits',
          'Shirts',
          'Knitwear',
          'Trousers',
          'Outerwear',
        ],
      },
      {
        title: 'Shoes',
        items: ['Oxfords', 'Loafers', 'Boots', 'Sneakers'],
      },
      {
        title: 'Accessories',
        items: ['Watches', 'Ties', 'Bags', 'Belts'],
      },
    ],
  },
  KIDS: {
    id: 'kids',
    featuredImage:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    featuredTitle: 'Runway 2024',
    columns: [
      {
        title: 'Seasons',
        items: ['Spring/Summer 2024', 'Autumn/Winter 2024', 'Resort 2025'],
      },
      {
        title: 'Designers',
        items: ['Alexander McQueen', 'Saint Laurent', 'The Row', 'Khaite'],
      },
      {
        title: 'Curated',
        items: ['Evening Wear', 'Workwear', 'Vacation Edit', 'Bridal'],
      },
    ],
  },
COLLECTION: {
    id: 'collection',
    featuredImage:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
    featuredTitle: 'Stories',
    columns: [
      {
        title: 'Features',
        items: ['Cover Stories', 'Interviews', 'Opinion', 'Fashion Week'],
      },
      {
        title: 'Trends',
        items: ['Street Style', 'Runway Reports', 'Shopping Guides'],
      },
      {
        title: 'Culture',
        items: ['Art', 'Design', 'Travel', 'Beauty'],
      },
    ],
  },
}