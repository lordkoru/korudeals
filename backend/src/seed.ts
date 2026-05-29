/**
 * ═══════════════════════════════════════════════════════════════════
 *  Script de Seed - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Carga productos de ejemplo en la base de datos para poder probar
 *  la aplicación rápidamente.
 *
 *  Uso:
 *    npx tsx src/seed.ts
 * ═══════════════════════════════════════════════════════════════════
 */
import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/productModel.js";

const sampleProducts = [
  {
    name: "Air Force 1 '07",
    brand: "Nike",
    description: "Un clásico que nunca pasa de moda. Cuero premium, suela acolchada y diseño icónico.",
    price: 2499,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Blanco", "Negro", "Beige"],
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "casual"
  },
  {
    name: "Stan Smith",
    brand: "Adidas",
    description: "Tenis blancos minimalistas con detalles verdes. Perfectos para cualquier ocasión casual.",
    price: 1899,
    sizes: [25, 26, 27, 28, 29],
    colors: ["Blanco", "Negro"],
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
    category: "casual"
  },
  {
    name: "Suede Classic",
    brand: "Puma",
    description: "Diseño retro con gamuza de alta calidad. Confort y estilo en cada paso.",
    price: 1599,
    sizes: [25, 26, 27, 28],
    colors: ["Rojo", "Azul", "Negro"],
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
    category: "urbano"
  },
  {
    name: "Old Skool",
    brand: "Vans",
    description: "El icónico modelo de skate de Vans. Lona resistente y suela de goma waffle.",
    price: 1299,
    sizes: [24, 25, 26, 27, 28],
    colors: ["Negro", "Blanco"],
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
    category: "skate"
  },
  {
    name: "Chuck Taylor All Star",
    brand: "Converse",
    description: "El tenis más vendido de la historia. Versátil y atemporal.",
    price: 999,
    sizes: [24, 25, 26, 27, 28, 29],
    colors: ["Negro", "Blanco", "Rojo", "Azul"],
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600",
    category: "casual"
  },
  {
    name: "574 Core",
    brand: "New Balance",
    description: "Comodidad superior con diseño retro. Ideal para usar todo el día.",
    price: 2199,
    sizes: [25, 26, 27, 28],
    colors: ["Gris", "Azul"],
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600",
    category: "deportivo"
  },
  {
    name: "Air Max 90",
    brand: "Nike",
    description: "La suela Air Max visible es un ícono. Comodidad y estilo en un solo modelo.",
    price: 2899,
    sizes: [25, 26, 27, 28],
    colors: ["Blanco", "Negro", "Gris"],
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
    category: "running"
  },
  {
    name: "Gazelle",
    brand: "Adidas",
    description: "Modelo retro con gamuza suave y detalles dorados. Estilo vintage.",
    price: 1799,
    sizes: [25, 26, 27],
    colors: ["Verde", "Azul", "Rojo"],
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600",
    category: "urbano"
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
    console.log("✅ Conectado a MongoDB");

    await Product.deleteMany({});
    console.log("🗑️  Productos previos eliminados");

    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} productos insertados correctamente`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
    process.exit(1);
  }
};

seed();
