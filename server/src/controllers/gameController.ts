import {Request, Response} from "express";
import {prisma} from "../config/db";

export const getGames = async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search as string | undefined;

    try {
        let results;

        if (search) {
            results = await prisma.$queryRaw<any[]>`
                SELECT
                    g.id AS "gameId",
                    g.title,
                    g."baseImage",
                    p.id AS "productId",
                    p.platform,
                    p.region,
                    p."distributionType",
                    p."currentPrice",
                    p."originalPrice",
                    p.currency,
                    p."cashbackAmount",
                    p."stockStatus",
                    similarity(g.title, ${search}) AS sim
                FROM "product" p
                         JOIN "game" g ON g.id = p."gameId"
                WHERE
                    similarity(g.title, ${search}) > 0.15
                   OR g.title ILIKE ${`%${search}%`}
                ORDER BY
                    sim DESC,
                    p."currentPrice" ASC
                    LIMIT 50;
            `;

            // Convert Decimal → number
            results = results.map(r => ({
                ...r,
                currentPrice: Number(r.currentPrice),
                originalPrice: Number(r.originalPrice),
                cashbackAmount: r.cashbackAmount ? Number(r.cashbackAmount) : 0
            }));

        } else {
            const games = await prisma.game.findMany({
                include: {products: true},
                take: 20
            });

            results = games.flatMap(g =>
                g.products.map(p => ({
                    gameId: g.id,
                    title: g.title,
                    baseImage: g.baseImage,
                    productId: p.id,
                    platform: p.platform,
                    region: p.region,
                    distributionType: p.distributionType,
                    currentPrice: p.currentPrice.toNumber(),
                    originalPrice: p.originalPrice.toNumber(),
                    currency: p.currency,
                    cashbackAmount: p.cashbackAmount?.toNumber() ?? 0,
                    stockStatus: p.stockStatus
                }))
            );
        }

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
};