/**
 * ═══════════════════════════════════════════════════════════════════
 *  Script de Seed - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Pobla la base de datos con productos y reseñas de prueba.
 *
 *  Uso:
 *    npm run seed
 * ═══════════════════════════════════════════════════════════════════
 */
import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/productModel.js";
import Review from "./models/reviewModel.js";

const products = [
  // ─── NIKE ──────────────────────────────────────────────────────────
  {
    name: "Air Force 1 '07",
    brand: "Nike",
    description:
      "Un clásico que nunca pasa de moda. Fabricado con cuero premium de alta calidad, suela acolchada con tecnología Air y diseño icónico que combina con cualquier outfit. El tenis más vendido de Nike, presente desde 1982.",
    price: 2499,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Blanco", "Negro", "Beige"],
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    category: "casual",
  },
  {
    name: "Air Max 90",
    brand: "Nike",
    description:
      "La unidad Air Max visible en la suela es su sello más icónico. Diseñado originalmente para running, se convirtió en un referente del estilo urbano. Amortiguación superior y silueta reconocible a nivel mundial.",
    price: 2899,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
    colors: ["Blanco", "Negro", "Gris", "Rojo"],
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
    category: "running",
  },
  {
    name: "Dunk Low Retro",
    brand: "Nike",
    description:
      "Nacido en las canchas de básquetbol universitario en 1985, el Dunk Low regresó con fuerza como símbolo de la cultura sneaker. Construcción en cuero con overlays en contraste y suela de goma vulcanizada.",
    price: 2799,
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Blanco/Negro", "Verde/Blanco", "Azul/Blanco"],
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
    category: "urbano",
  },
  {
    name: "React Infinity Run 3",
    brand: "Nike",
    description:
      "Diseñado para ayudar a reducir lesiones de running. La espuma React ofrece amortiguación suave y rebote energético. Suela Flyknit que se adapta al pie y garantiza soporte en cada kilómetro.",
    price: 3299,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28, 29],
    colors: ["Negro/Blanco", "Azul/Naranja", "Gris/Verde"],
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800",
    category: "running",
  },

  // ─── ADIDAS ────────────────────────────────────────────────────────
  {
    name: "Stan Smith",
    brand: "Adidas",
    description:
      "El tenis blanco por excelencia. Minimalista, atemporal y sostenible: fabricado con materiales reciclados. Los icónicos perforados en los laterales y el detalle verde lo hacen inconfundible desde 1965.",
    price: 1899,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28, 29],
    colors: ["Blanco/Verde", "Blanco/Negro", "Blanco/Azul"],
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    category: "casual",
  },
  {
    name: "Samba OG",
    brand: "Adidas",
    description:
      "Originalmente diseñado para fútbol en superficies heladas en los años 50. Hoy es tendencia global. Su suela de goma gruesa, la lengüeta acolchada y el panel de gamuza en el lateral son su firma inconfundible.",
    price: 2199,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Negro/Blanco", "Blanco/Verde", "Marrón/Goma"],
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    category: "casual",
  },
  {
    name: "Ultraboost 22",
    brand: "Adidas",
    description:
      "El tenis de running más avanzado de Adidas. La tecnología Boost devuelve energía en cada paso. Upper Primeknit+ que se adapta al movimiento natural del pie. Certificado como carbono neutro.",
    price: 3999,
    sizes: [25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
    colors: ["Negro", "Blanco", "Azul Marino"],
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800",
    category: "running",
  },
  {
    name: "Gazelle Indoor",
    brand: "Adidas",
    description:
      "Un retorno triunfal del archivo de los 70s. Gamuza suave, suela translúcida de goma y detalles en tono Gum hacen del Gazelle el favorito de las semanas de la moda. Silhouette delgada y ligera.",
    price: 1799,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5],
    colors: ["Verde/Blanco", "Azul/Blanco", "Rojo/Blanco", "Beige/Goma"],
    stock: 0,
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800",
    category: "urbano",
  },

  // ─── PUMA ──────────────────────────────────────────────────────────
  {
    name: "Suede Classic XXI",
    brand: "Puma",
    description:
      "El suede de Puma es un ícono desde 1968. Este modelo clásico mantiene la gamuza premium, la puntera redondeada y el logo Formstrip en el lateral. Cómodo para el día a día con un toque vintage.",
    price: 1599,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Rojo/Blanco", "Azul Marino/Blanco", "Negro/Blanco", "Verde"],
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    category: "urbano",
  },
  {
    name: "RS-X Efekt",
    brand: "Puma",
    description:
      "Máximo volumen y actitud. La silueta RS-X toma inspiración de los tenis de running de los 80s y los lleva al extremo con una construcción multicapa, colores en bloque y suela de goma gruesa ultra chunky.",
    price: 1999,
    sizes: [25, 26, 26.5, 27, 27.5, 28, 29],
    colors: ["Blanco/Azul/Rojo", "Negro/Amarillo", "Gris/Naranja"],
    stock: 7,
    imageUrl: "https://images.unsplash.com/photo-1584735175315-9d5df23be4be?w=800",
    category: "deportivo",
  },

  // ─── NEW BALANCE ───────────────────────────────────────────────────
  {
    name: "574 Core",
    brand: "New Balance",
    description:
      "El modelo más icónico de New Balance. Tecnología ENCAP en la suela para amortiguación duradera. Upper de malla y gamuza con el distintivo 'N' bordado. Diseñado para durar toda la vida.",
    price: 2199,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5],
    colors: ["Gris/Blanco", "Azul Marino/Blanco", "Verde Oliva"],
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800",
    category: "deportivo",
  },
  {
    name: "990v6",
    brand: "New Balance",
    description:
      "Fabricado en USA desde 1982. El 990v6 es la cúspide de la ingeniería de New Balance: espuma ENCAP y ABZORB en la entresuela, upper de gamuza premium y malla. El favorito de los entendidos.",
    price: 4499,
    sizes: [25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
    colors: ["Gris", "Navy", "Beige"],
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800",
    category: "running",
  },

  // ─── CONVERSE ──────────────────────────────────────────────────────
  {
    name: "Chuck Taylor All Star Hi",
    brand: "Converse",
    description:
      "El tenis de caña alta más vendido en la historia de la moda. Lona 100% algodón, suela de goma con diamantes y plantilla acolchada. Inmortalizado por músicos, artistas y generaciones enteras.",
    price: 1099,
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 29, 30],
    colors: ["Negro", "Blanco", "Rojo", "Azul Marino", "Verde"],
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800",
    category: "casual",
  },
  {
    name: "Run Star Hike",
    brand: "Converse",
    description:
      "Una reinvención atrevida del Chuck Taylor. La suela dentada oversized y los materiales en capas crean un tenis con personalidad única. Mezcla de plataforma y estética skate que domina las tendencias.",
    price: 1599,
    sizes: [24, 25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Blanco/Negro", "Negro/Blanco", "Beige/Goma"],
    stock: 9,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800",
    category: "urbano",
  },

  // ─── VANS ──────────────────────────────────────────────────────────
  {
    name: "Old Skool",
    brand: "Vans",
    description:
      "El primer tenis de Vans con la icónica franja de Jazz. Lona y gamuza reforzadas para aguantar los tramos más duros del skate. Suela Waffle de goma con máximo agarre. Un clásico absoluto desde 1977.",
    price: 1299,
    sizes: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 29],
    colors: ["Negro/Blanco", "Blanco/Blanco", "Rojo/Blanco", "Azul/Blanco"],
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    category: "skate",
  },
  {
    name: "Era",
    brand: "Vans",
    description:
      "Diseñado por los propios skaters Tony Alva y Stacy Peralta en 1976. El Era es el modelo más ligero de Vans, con doble costura en la puntera para mayor durabilidad y plantilla acolchada para larga comodidad.",
    price: 999,
    sizes: [24, 25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Negro", "Azul Marino", "Rojo", "Verde Botella"],
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1556906781-9c67316fdf2d?w=800",
    category: "skate",
  },

  // ─── REEBOK ────────────────────────────────────────────────────────
  {
    name: "Classic Leather",
    brand: "Reebok",
    description:
      "Presentado en 1983 como tenis de running de alto rendimiento. Hoy es un básico del guardarropa casual. Cuero suave de alta calidad, suela de goma ligera y plantilla EVA para amortiguación todo el día.",
    price: 1699,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28],
    colors: ["Blanco", "Beige/Goma", "Negro/Goma"],
    stock: 16,
    imageUrl: "https://images.unsplash.com/photo-1610545492543-e957bd0f3fb7?w=800",
    category: "casual",
  },
  {
    name: "Club C 85",
    brand: "Reebok",
    description:
      "Surgido de las canchas de tenis en 1985. Cuero blanco con detalles en verde y el logo Reebok bordado en el lateral. La elección de quienes buscan un tenis limpio, versátil y con historia detrás.",
    price: 1499,
    sizes: [25, 25.5, 26, 26.5, 27, 27.5, 28, 29],
    colors: ["Blanco/Verde", "Blanco/Azul", "Negro/Gris"],
    stock: 0,
    imageUrl: "https://images.unsplash.com/photo-1612902409622-3c0bb51f7a38?w=800",
    category: "casual",
  },
  {
    name: "Nano X3",
    brand: "Reebok",
    description:
      "El tenis de entrenamiento funcional más completo. Estabilidad lateral para levantamiento de pesas, flexibilidad en el antepié para sprints y amortiguación para saltos. El favorito de los atletas de CrossFit.",
    price: 2699,
    sizes: [25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
    colors: ["Negro/Blanco", "Azul/Naranja", "Gris/Verde"],
    stock: 11,
    imageUrl: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800",
    category: "deportivo",
  },
];

const seed = async () => {
  try {
    console.log("🔌 Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
    console.log("✅ Conexión exitosa\n");

    console.log("🗑️  Limpiando colecciones...");
    const deletedProducts = await Product.deleteMany({});
    const deletedReviews = await Review.deleteMany({});
    console.log(`   • ${deletedProducts.deletedCount} productos eliminados`);
    console.log(`   • ${deletedReviews.deletedCount} reseñas eliminadas\n`);

    console.log("📦 Insertando productos...");
    const inserted = await Product.insertMany(products);
    console.log(`✅ ${inserted.length} productos insertados:\n`);

    inserted.forEach((p, i) => {
      const stockLabel = p.stock === 0 ? "⛔ Agotado" : p.stock <= 10 ? `⚠️  ${p.stock} uds` : `✅ ${p.stock} uds`;
      console.log(`   ${String(i + 1).padStart(2, " ")}. ${p.brand} ${p.name} — $${p.price.toLocaleString("es-MX")} — ${stockLabel}`);
    });

    const byBrand: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    inserted.forEach((p) => {
      byBrand[p.brand] = (byBrand[p.brand] || 0) + 1;
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });

    console.log("\n📊 Resumen por marca:");
    Object.entries(byBrand).forEach(([brand, count]) => {
      console.log(`   • ${brand}: ${count} producto(s)`);
    });

    console.log("\n📊 Resumen por categoría:");
    Object.entries(byCategory).forEach(([cat, count]) => {
      console.log(`   • ${cat}: ${count} producto(s)`);
    });

    const agotados = inserted.filter((p) => p.stock === 0).length;
    console.log(`\n   Agotados: ${agotados} | En stock: ${inserted.length - agotados}`);

    console.log("\n🎉 Seed completado exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    process.exit(1);
  }
};

seed();
