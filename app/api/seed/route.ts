import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const cars = [
  {
    make: "Toyota", model: "Land Cruiser", year: 2022, price: 95000000,
    mileage: 18000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Pearl White", condition: "Foreign Used",
    engine: "4.0L V6", drivetrain: "4WD", seats: 7, featured: true,
    images: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Sunroof", "Leather Seats", "Navigation", "360 Camera", "Heated Seats", "Apple CarPlay"],
    description: "Immaculate Toyota Land Cruiser in pristine condition. Full service history, one careful owner. Perfect for Nigerian roads.",
  },
  {
    make: "Lexus", model: "RX 350", year: 2021, price: 48000000,
    mileage: 24000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Obsidian Black", condition: "Foreign Used",
    engine: "3.5L V6", drivetrain: "AWD", seats: 5, featured: true,
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Panoramic Roof", "Mark Levinson Audio", "Pre-collision System", "Blind Spot Monitor"],
    description: "Executive SUV with ultra-premium Mark Levinson sound system. Exceptionally smooth ride.",
  },
  {
    make: "Mercedes-Benz", model: "GLE 350", year: 2022, price: 72000000,
    mileage: 15000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Selenite Grey", condition: "Foreign Used",
    engine: "2.0L Turbo I4", drivetrain: "4MATIC", seats: 5, featured: true,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["MBUX Infotainment", "Burmester Sound", "Active Brake Assist", "AMG Line Package"],
    description: "German engineering meets Nigerian luxury. Low mileage, spotless interior.",
  },
  {
    make: "BMW", model: "X5 xDrive40i", year: 2021, price: 65000000,
    mileage: 28000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Mineral White", condition: "Foreign Used",
    engine: "3.0L TwinPower I6", drivetrain: "xDrive AWD", seats: 7, featured: true,
    images: [
      "https://images.unsplash.com/photo-1555215695-3d98c02e7ef1?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Executive Package", "Harman Kardon", "Panoramic Roof", "Gesture Control", "Wireless Charging"],
    description: "The BMW X5 combines sports car agility with superior comfort. Third-row seating for the family.",
  },
  {
    make: "Toyota", model: "Camry XSE", year: 2022, price: 28000000,
    mileage: 20000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "Sedan", color: "Midnight Black", condition: "Foreign Used",
    engine: "2.5L I4", drivetrain: "FWD", seats: 5, featured: false,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Sport Package", "JBL Audio", "Wireless CarPlay", "Adaptive Cruise"],
    description: "The XSE Sport trim elevates the legendary Camry with a bold look and dynamic drive.",
  },
  {
    make: "Honda", model: "Accord Sport", year: 2021, price: 22000000,
    mileage: 32000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "Sedan", color: "Sonic Grey", condition: "Foreign Used",
    engine: "1.5L Turbo I4", drivetrain: "FWD", seats: 5, featured: false,
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Honda Sensing", "Sport Trim", "Apple CarPlay", "Android Auto"],
    description: "Reliable, stylish and efficient. The Honda Accord is Africa's top-rated sedan for good reason.",
  },
  {
    make: "Lexus", model: "ES 350", year: 2022, price: 45000000,
    mileage: 12000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "Sedan", color: "Nebula Gray", condition: "Foreign Used",
    engine: "3.5L V6", drivetrain: "FWD", seats: 5, featured: true,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Ultra Luxury Package", "Semi-Aniline Leather", "Panoramic Glass Roof", "Mark Levinson 17-Speaker"],
    description: "The pinnacle of Lexus craftsmanship. Ultra-quiet cabin with relentless attention to detail.",
  },
  {
    make: "Range Rover", model: "Sport HSE", year: 2020, price: 85000000,
    mileage: 38000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Santorini Black", condition: "Foreign Used",
    engine: "3.0L Supercharged V6", drivetrain: "4WD", seats: 5, featured: true,
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Air Suspension", "Terrain Response 2", "Meridian Sound", "Sliding Panoramic Roof", "Head-Up Display"],
    description: "Icon of British luxury. Conquers any terrain while delivering unmatched cabin sophistication.",
  },
  {
    make: "Mercedes-Benz", model: "C300 AMG Line", year: 2021, price: 38000000,
    mileage: 25000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "Sedan", color: "Polar White", condition: "Foreign Used",
    engine: "2.0L Turbo I4", drivetrain: "RWD", seats: 5, featured: false,
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["AMG Styling Package", "Widescreen Cockpit", "Active Park Assist", "LED Intelligent Light"],
    description: "AMG sport styling meets Mercedes luxury in this stunning C-Class. Statement car for the executive.",
  },
  {
    make: "Toyota", model: "Highlander XLE", year: 2022, price: 42000000,
    mileage: 16000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Blueprint", condition: "Foreign Used",
    engine: "3.5L V6", drivetrain: "AWD", seats: 8, featured: false,
    images: [
      "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["8-Seat Capacity", "Toyota Safety Sense", "JBL Audio", "Hands-Free Liftgate"],
    description: "Perfect family hauler with 8-passenger seating, advanced safety tech, and premium comfort.",
  },
  {
    make: "BMW", model: "530i M Sport", year: 2022, price: 55000000,
    mileage: 18000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "Sedan", color: "Carbon Black", condition: "Foreign Used",
    engine: "2.0L TwinPower I4", drivetrain: "RWD", seats: 5, featured: false,
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["M Sport Package", "Vernasca Leather", "Harman Kardon", "Gesture Control", "BMW Live Cockpit Pro"],
    description: "The 530i M Sport is the driver's choice — perfectly balanced performance with luxury.",
  },
  {
    make: "Lexus", model: "GX 460 Premium", year: 2020, price: 58000000,
    mileage: 42000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Starfire Pearl", condition: "Foreign Used",
    engine: "4.6L V8", drivetrain: "4WD", seats: 7, featured: false,
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Kinetic Dynamic Suspension", "Crawl Control", "3rd Row Seating", "Mark Levinson Audio"],
    description: "The V8-powered GX 460 handles the toughest terrains while pampering occupants in luxury.",
  },
  {
    make: "Ford", model: "Explorer Limited", year: 2021, price: 36000000,
    mileage: 29000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "SUV", color: "Oxford White", condition: "Foreign Used",
    engine: "2.3L EcoBoost I4", drivetrain: "4WD", seats: 7, featured: false,
    images: [
      "https://images.unsplash.com/photo-1551522435-a13afa10f103?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Ford Co-Pilot360", "SYNC 4A", "B&O Sound", "Power Liftgate", "Heated/Cooled Seats"],
    description: "America's best-selling SUV brings rugged capability and advanced tech in one package.",
  },
  {
    make: "Toyota", model: "Venza XLE Hybrid", year: 2022, price: 39000000,
    mileage: 14000, fuelType: "Hybrid", transmission: "Automatic",
    bodyType: "SUV", color: "Cypress Green", condition: "Foreign Used",
    engine: "2.5L Hybrid I4", drivetrain: "AWD", seats: 5, featured: false,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["Panoramic View Monitor", "Electrochromic Panoramic Roof", "JBL Premium Audio", "Wireless Charging"],
    description: "Eco-smart luxury SUV. The Venza Hybrid is perfect for city driving without compromise.",
  },
  {
    make: "Mercedes-Benz", model: "E350 AMG", year: 2021, price: 62000000,
    mileage: 22000, fuelType: "Petrol", transmission: "Automatic",
    bodyType: "Sedan", color: "Graphite Grey", condition: "Foreign Used",
    engine: "2.0L Turbo I4", drivetrain: "RWD", seats: 5, featured: false,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    ],
    features: ["AMG Line", "Burmester 3D Sound", "Multi-contour Seats", "Widescreen Cockpit", "MBUX AI"],
    description: "The E-Class is the gold standard of executive sedans. Timeless elegance with modern intelligence.",
  },
];

export async function POST() {
  try {
    const existing = await prisma.adminUser.findUnique({ where: { username: "admin" } });
    if (!existing) {
      const hash = await bcrypt.hash("jmk2024!", 10);
      await prisma.adminUser.create({ data: { username: "admin", passwordHash: hash } });
    }

    await prisma.car.deleteMany();
    await prisma.car.createMany({ data: cars });

    await prisma.siteSetting.upsert({
      where: { key: "whatsapp" },
      update: { value: "2348012345678" },
      create: { key: "whatsapp", value: "2348012345678" },
    });
    await prisma.siteSetting.upsert({
      where: { key: "phone" },
      update: { value: "+234 801 234 5678" },
      create: { key: "phone", value: "+234 801 234 5678" },
    });

    return NextResponse.json({ ok: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("[POST /api/seed]", error);
    return NextResponse.json({ error: "Seed failed", detail: String(error) }, { status: 500 });
  }
}
