import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method != 'POST' && req.method != "DELETE") {
        return res.status(405).end();
    }

    try {
        const { userId } = req.body;
        const { currentUser } = await serverAuth(req);
        if (!userId || typeof userId != 'string') {
            throw new Error('Invalid id');
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('Invalid id');
        }
        let updatedFollowingId = [...(user.followingId || [])];

        if (req.method == "POST") {
            updatedFollowingId.push(userId);
            try {
                if (userId) {
                    await prisma.notification.create({
                        data: {
                            userId,
                            body: 'Someone followed you!'
                        }
                    });
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data : {
                            hasNotification: true
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (req.method == "DELETE") {
            updatedFollowingId = updatedFollowingId.filter(
                followingId => followingId != userId
            );
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingId: updatedFollowingId
            }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}