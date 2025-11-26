import mongoose from "mongoose";
import Product from "../model/product.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  // ====== Smartphones / Mobiles ======
  { title: "iPhone 15", price: 79999, rating: 4.7, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689159/i15_cdntht.jpg", category: "Smartphones,Mobiles,Deals" },
  { title: "iPhone 16", price: 89999, rating: 4.8, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689159/iphone16_vxr5h3.jpg", category: "Smartphones,Mobiles,New Releases" },
  { title: "OnePlus 13R", price: 45999, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689153/1plus_j1jkra.jpg", category: "Smartphones,Mobiles" },
  { title: "Realme GT 7 Pro", price: 34999, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689154/mi7_eebdfr.jpg", category: "Smartphones,Mobiles" },
  { title: "iQOO 13", price: 55999, rating: 4.6, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689160/iq13_wf2l5d.jpg", category: "Smartphones,Mobiles,Deals" },
  { title: "iQOO 13 Pro", price: 59999, rating: 4.7, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689160/iq13_wf2l5d.jpg", category: "Smartphones,Deals" },
  { title: "Xiaomi 16 Civi", price: 44999, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689158/xi14_zb8mdn.jpg", category: "Smartphones,Mobiles" },
  { title: "Samsung S24", price: 69999, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689154/s24_teslhb.jpg", category: "Smartphones,Mobiles" },

  // ====== Laptops / Computers ======
  { title: "MacBook Air M2", price: 104999, rating: 4.8, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689153/macm1_hslv19.jpg", category: "Laptops,Computers,Deals" },
  { title: "MacBook Pro 16", price: 154999, rating: 4.9, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689159/macpro16.jpg", category: "Laptops,New Releases" },
  { title: "Dell Inspiron 14", price: 54999, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689311/dvsx2a5yfs8neuglc1bj.jpg", category: "Laptops,Computers" },
  { title: "HP 15 Laptop", price: 56999, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689158/hp15_m30ajh.jpg", category: "Laptops,Computers" },
  { title: "Asus VivoBook", price: 62999, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689156/asus_pqexvg.jpg", category: "Laptops,Computers" },

  // ====== Electronics & Accessories ======
  { title: "Smart Watch", price: 4999, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689594/71XA0QCW5lL_k7wdel.jpg", category: "Electronics,Bestsellers" },
  { title: "Headset", price: 1299, rating: 4.1, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689157/filter_shahxa.jpg", category: "Electronics" },
  { title: "JBL Soundbox", price: 3299, rating: 4.6, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689160/jbl_ji5hoz.jpg", category: "Electronics" },
  { title: "HP Pendrive 64GB", price: 699, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689156/usb_g44bwp.jpg", category: "Electronics" },
  { title: "Air Buds", price: 2499, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689153/air_buds_mwudcl.jpg", category: "Electronics" },
  { title: "Amazon Fire Stick", price: 4999, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689155/amazonstick_lp9cdo.jpg", category: "Electronics,Smart Home" },

  // ====== Home Appliances ======
  { title: "Voltas AC", price: 34999, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689153/ac_npcecb.jpg", category: "Home Appliances,Home & Kitchen" },
  { title: "Washing Machine", price: 24999, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689157/wt_machine_qpwxfh.jpg", category: "Home Appliances,Home & Kitchen" },
  { title: "Hair Dryer", price: 999, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689157/dryer_xlkzpt.jpg", category: "Home Appliances,Beauty" },
  { title: "Induction Stove", price: 2999, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689159/indstove_qx1szi.jpg", category: "Home Appliances,Home & Kitchen" },
  { title: "Refrigerator Utility Box", price: 899, rating: 4.1, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689158/fridge_utility_xjn5lh.jpg", category: "Home Appliances,Home & Kitchen" },
  { title: "Fridge", price: 34999, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689158/fridge_bekvrj.jpg", category: "Home Appliances,Home & Kitchen" },
  { title: "Mini Fan", price: 799, rating: 4.0, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689157/fan_ki6uef.jpg", category: "Home Appliances,Home & Kitchen" },

  // ====== Fashion ======
  { title: "Women's Handbag", price: 2299, rating: 4.6, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689515/images_du60lq.jpg", category: "Fashion,Women's Fashion" },
  { title: "Women's Salwar", price: 1999, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689896/images_twefrb.jpg", category: "Fashion,Women's Fashion" },
  { title: "Men's Stylish Shirt", price: 1299, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689413/images_shiayi.jpg", category: "Fashion,Men's Fashion" },
  { title: "Socks Set", price: 399, rating: 4.0, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689155/socks_pplt1f.jpg", category: "Fashion,Men's Fashion,Women's Fashion" },
  { title: "T-shirt Women", price: 1499, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443137/cld-sample-3.jpg", category: "Fashion,Women's Fashion" },
  { title: "Jeans for Men", price: 1999, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443137/cld-sample-5.jpg", category: "Fashion,Men's Fashion" },

  // ====== Health & Beauty ======
  { title: "Odomos", price: 199, rating: 4.0, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689154/odomos_evaudq.jpg", category: "Health,Home Essentials" },
  { title: "Serums Box", price: 699, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689155/Serums_u7olzq.jpg", category: "Beauty,Health" },

  // ====== Kitchen ======
  { title: "Toaster", price: 1599, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689156/toaster_gfezma.jpg", category: "Kitchen,Home & Kitchen" },
  { title: "Mixy", price: 2899, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689154/mixy_oy8na5.jpg", category: "Kitchen,Home & Kitchen" },
  { title: "Mosquito Bat", price: 699, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689154/mosqito_bat_vxpgw9.jpg", category: "Home Essentials,Home & Kitchen" },

  // ====== Decor & Furniture ======
  { title: "Decor Owl", price: 599, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689157/decor_ohfbvr.jpg", category: "Decor,Home & Kitchen" },
  { title: "Astronaut Decor", price: 799, rating: 4.6, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689157/vases_obsoic.jpg", category: "Decor,Home & Kitchen" },
  { title: "Lighting Globe", price: 1199, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689160/light_zcafrk.jpg", category: "Decor,Home & Kitchen" },
  { title: "Bed Sheet Set", price: 1299, rating: 4.5, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689155/bed_sheet_fu5rf1.jpg", category: "Home & Living,Home & Kitchen" },
  { title: "Table Decor", price: 2499, rating: 4.4, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689158/furniture_iychjl.jpg", category: "Furniture,Home & Kitchen" },
  { title: "Chair", price: 1799, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1762689156/table_ibbsqj.jpg", category: "Furniture,Home & Kitchen" },

  // ====== Miscellaneous ======
  { title: "Coffee Cup", price: 299, rating: 4.1, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443136/samples/cup-on-a-table.jpg", category: "Kitchen,Home & Living" },
  { title: "Sofa Set", price: 15999, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443136/samples/chair-and-coffee-table.jpg", category: "Home & Living,Furniture" },
  { title: "Women Picnic Wear", price: 1999, rating: 4.3, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443135/samples/outdoor-woman.jpg", category: "Fashion,Women's Fashion" },
  { title: "Men Fashion", price: 1499, rating: 4.0, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443135/samples/look-up.jpg", category: "Fashion,Men's Fashion" },
  { title: "Analog Watch", price: 3999, rating: 4.2, image: "https://res.cloudinary.com/djyoekol7/image/upload/v1729443127/samples/ecommerce/analog-classic.jpg", category: "Electronics,Watches" }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
