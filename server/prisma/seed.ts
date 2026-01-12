import {PrismaClient} from './generated/client';
import {PrismaPg} from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({adapter});

async function main() {
    await prisma.product.deleteMany();
    await prisma.game.deleteMany();

    const gamesData = [
        {
            title: "Split Fiction",
            baseImage: "/uploads/split-fiction-base.jpg",
            products: [
                {
                    platform: "PC",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 40.93,
                    originalPrice: 49.99,
                    cashbackAmount: 4.50
                },
                {
                    platform: "XBOX",
                    region: "EUROPE",
                    distributionType: "KEY",
                    currentPrice: 34.14,
                    originalPrice: 49.99,
                    cashbackAmount: 1.76
                },
                {
                    platform: "NINTENDO",
                    region: "EUROPE",
                    distributionType: "KEY",
                    currentPrice: 36.25,
                    originalPrice: 49.99,
                    cashbackAmount: 1.99
                }
            ]
        },
        {
            title: "FIFA 23",
            baseImage: "/uploads/fifa-23.jpg",
            products: [
                {
                    platform: "PC",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 19.99,
                    originalPrice: 69.99,
                    cashbackAmount: 0.50
                },
                {
                    platform: "PLAYSTATION",
                    region: "USA",
                    distributionType: "ACCOUNT",
                    currentPrice: 15.00,
                    originalPrice: 59.99
                }
            ]
        },
        {
            title: "Red Dead Redemption 2",
            baseImage: "/uploads/rdr2.jpg",
            products: [
                {
                    platform: "PC",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 19.80,
                    originalPrice: 59.99,
                    cashbackAmount: 2.10
                },
                {platform: "XBOX", region: "GLOBAL", distributionType: "KEY", currentPrice: 24.50, originalPrice: 59.99}
            ]
        },
        {
            title: "Cyberpunk 2077",
            baseImage: "/uploads/cyberpunk.jpg",
            products: [
                {
                    platform: "PC",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 29.99,
                    originalPrice: 59.99,
                    cashbackAmount: 3.00
                },
                {
                    platform: "PLAYSTATION",
                    region: "EUROPE",
                    distributionType: "KEY",
                    currentPrice: 35.00,
                    originalPrice: 69.99
                }
            ]
        },
        {
            title: "Elden Ring",
            baseImage: "/uploads/elden-ring.jpg",
            products: [
                {
                    platform: "PC",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 42.15,
                    originalPrice: 59.99,
                    cashbackAmount: 4.20
                },
                {platform: "XBOX", region: "EUROPE", distributionType: "KEY", currentPrice: 38.50, originalPrice: 59.99}
            ]
        },
        {
            title: "The Witcher 3: Wild Hunt",
            baseImage: "/uploads/witcher3.jpg",
            products: [
                {platform: "PC", region: "GLOBAL", distributionType: "KEY", currentPrice: 9.99, originalPrice: 29.99},
                {
                    platform: "NINTENDO",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 15.99,
                    originalPrice: 39.99
                }
            ]
        },
        {
            title: "Minecraft",
            baseImage: "/uploads/minecraft.jpg",
            products: [
                {platform: "PC", region: "GLOBAL", distributionType: "KEY", currentPrice: 23.50, originalPrice: 23.50},
                {
                    platform: "NINTENDO",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 28.00,
                    originalPrice: 29.99
                }
            ]
        },
        {
            title: "Hogwarts Legacy",
            baseImage: "/uploads/hogwarts.jpg",
            products: [
                {
                    platform: "PC",
                    region: "GLOBAL",
                    distributionType: "KEY",
                    currentPrice: 45.99,
                    originalPrice: 59.99,
                    cashbackAmount: 5.00
                },
                {
                    platform: "PLAYSTATION",
                    region: "EUROPE",
                    distributionType: "KEY",
                    currentPrice: 49.99,
                    originalPrice: 69.99
                }
            ]
        }
    ];

    for (const gameData of gamesData) {
        const {products, ...gameInfo} = gameData;
        await prisma.game.create({
            data: {
                ...gameInfo,
                products: {
                    create: products
                }
            }
        });
    }

    console.log("Seed data created successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
