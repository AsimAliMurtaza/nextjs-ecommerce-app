// src/shop_data.ts

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string; // Optional if not every product has a description
  category: string;
}

const SHOP_DATA: Product[] = [
  {
    id: 1,
    name: 'Brown Brim',
    imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
    price: 25,
    description: 'A stylish brown brim hat.',
    category: 'Hats'
  },
  {
    id: 2,
    name: 'Blue Beanie',
    imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
    price: 18,
    description: 'A warm blue beanie.',
    category: 'Hats'
  },
  {
    id: 3,
    name: 'Brown Cowboy',
    imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
    price: 35,
    description: 'A rugged brown cowboy hat.',
    category: 'Hats'
  },
  {
    id: 4,
    name: 'Grey Brim',
    imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
    price: 25,
    description: 'A sleek grey brim hat.',
    category: 'Hats'
  },
  {
    id: 5,
    name: 'Green Beanie',
    imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
    price: 18,
    description: 'A cozy green beanie.',
    category: 'Hats'
  },
  {
    id: 6,
    name: 'Palm Tree Cap',
    imageUrl: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png',
    price: 14,
    description: 'A cool palm tree cap.',
    category: 'Hats'
  },
  {
    id: 7,
    name: 'Red Beanie',
    imageUrl: 'https://i.ibb.co/bLB646Z/red-beanie.png',
    price: 18,
    description: 'A vibrant red beanie.',
    category: 'Hats'
  },
  {
    id: 8,
    name: 'Wolf Cap',
    imageUrl: 'https://i.ibb.co/1f2nWMM/wolf-cap.png',
    price: 14,
    description: 'A fierce wolf cap.',
    category: 'Hats'
  },
  {
    id: 9,
    name: 'Blue Snapback',
    imageUrl: 'https://i.ibb.co/X2VJP2W/blue-snapback.png',
    price: 16,
    description: 'A trendy blue snapback.',
    category: 'Hats'
  },
  {
    id: 10,
    name: 'Adidas NMD',
    imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
    price: 220,
    description: 'Comfortable and stylish Adidas NMD.',
    category: 'Sneakers'
  },
  {
    id: 11,
    name: 'Adidas Yeezy',
    imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
    price: 280,
    description: 'Trendy Adidas Yeezy sneakers.',
    category: 'Sneakers'
  },
  {
    id: 12,
    name: 'Black Converse',
    imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
    price: 110,
    description: 'Classic black Converse sneakers.',
    category: 'Sneakers'
  },
  {
    id: 13,
    name: 'Nike White AirForce',
    imageUrl: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
    price: 160,
    description: 'Stylish white Nike AirForce.',
    category: 'Sneakers'
  },
  {
    id: 14,
    name: 'Nike Red High Tops',
    imageUrl: 'https://i.ibb.co/QcvzydB/nikes-red.png',
    price: 160,
    description: 'Eye-catching red Nike high tops.',
    category: 'Sneakers'
  },
  {
    id: 15,
    name: 'Nike Brown High Tops',
    imageUrl: 'https://i.ibb.co/fMTV342/nike-brown.png',
    price: 160,
    description: 'Cool brown Nike high tops.',
    category: 'Sneakers'
  },
  {
    id: 16,
    name: 'Air Jordan Limited',
    imageUrl: 'https://i.ibb.co/w4k6Ws9/nike-funky.png',
    price: 190,
    description: 'Limited edition Air Jordan sneakers.',
    category: 'Sneakers'
  },
  {
    id: 17,
    name: 'Timberlands',
    imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
    price: 200,
    description: 'Durable and rugged Timberlands.',
    category: 'Sneakers'
  },
  {
    id: 18,
    name: 'Black Jean Shearling',
    imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
    price: 125,
    description: 'Warm black jean shearling jacket.',
    category: 'Jackets'
  },
  {
    id: 19,
    name: 'Blue Jean Jacket',
    imageUrl: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
    price: 90,
    description: 'Classic blue jean jacket.',
    category: 'Jackets'
  },
  {
    id: 20,
    name: 'Grey Jean Jacket',
    imageUrl: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
    price: 90,
    description: 'Stylish grey jean jacket.',
    category: 'Jackets'
  },
  {
    id: 21,
    name: 'Brown Shearling',
    imageUrl: 'https://i.ibb.co/s96FpdP/brown-shearling.png',
    price: 165,
    description: 'Cozy brown shearling jacket.',
    category: 'Jackets'
  },
  {
    id: 22,
    name: 'Tan Trench',
    imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
    price: 185,
    description: 'Elegant tan trench coat.',
    category: 'Jackets'
  },
  {
    id: 23,
    name: 'Blue Tanktop',
    imageUrl: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
    price: 25,
    description: 'Casual blue tanktop.',
    category: 'Womens'
  },
  {
    id: 24,
    name: 'Floral Blouse',
    imageUrl: 'https://i.ibb.co/4W2DGKm/floral-blouse.png',
    price: 20,
    description: 'Pretty floral blouse.',
    category: 'Womens'
  },
  {
    id: 25,
    name: 'Floral Dress',
    imageUrl: 'https://i.ibb.co/KV18Ysr/floral-skirt.png',
    price: 80,
    description: 'Elegant floral dress.',
    category: 'Womens'
  },
  {
    id: 26,
    name: 'Red Dots Dress',
    imageUrl: 'https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png',
    price: 80,
    description: 'Fun red polka dot dress.',
    category: 'Womens'
  },
  {
    id: 27,
    name: 'Striped Sweater',
    imageUrl: 'https://i.ibb.co/KmSkMbH/striped-sweater.png',
    price: 45,
    description: 'Cozy striped sweater.',
    category: 'Womens'
  },
  {
    id: 28,
    name: 'Yellow Track Suit',
    imageUrl: 'https://i.ibb.co/v1cvwNf/yellow-track-suit.png',
    price: 135,
    description: 'Bright yellow track suit.',
    category: 'Womens'
  },
  {
    id: 29,
    name: 'White Blouse',
    imageUrl: 'https://i.ibb.co/qBcrsJg/white-vest.png',
    price: 20,
    description: 'Elegant white blouse.',
    category: 'Womens'
  },
  {
    id: 30,
    name: 'Camo Down Vest',
    imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
    price: 325,
    description: 'Warm camo down vest.',
    category: 'Mens'
  },
  {
    id: 31,
    name: 'Floral T-shirt',
    imageUrl: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
    price: 20,
    description: 'Stylish floral t-shirt.',
    category: 'Mens'
  },
  {
    id: 32,
    name: 'Black & White Longsleeve',
    imageUrl: 'https://i.ibb.co/55z32tw/long-sleeve.png',
    price: 25,
    description: 'Classic black & white longsleeve.',
    category: 'Mens'
  },
  {
    id: 33,
    name: 'Pink T-shirt',
    imageUrl: 'https://i.ibb.co/RvwnBL8/pink-shirt.png',
    price: 25,
    description: 'Casual pink t-shirt.',
    category: 'Mens'
  },
  {
    id: 34,
    name: 'Jean Long Sleeve',
    imageUrl: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png',
    price: 40,
    description: 'Comfortable jean long sleeve.',
    category: 'Mens'
  },
  {
    id: 35,
    name: 'Burgundy T-shirt',
    imageUrl: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
    price: 25,
    description: 'Trendy burgundy t-shirt.',
    category: 'Mens'
  }
];

export default SHOP_DATA;
