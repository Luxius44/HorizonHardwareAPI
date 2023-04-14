import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.categorie.deleteMany({})
    await prisma.categorie.create({
        data: {
            nom:"Processeur",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Carte Graphique",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Carte Mère",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"RAM",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Alimentation",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Boitier",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Stockage",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Alimentation",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Périphériques",
            imgId:"background"
        },
    }),
    await prisma.categorie.create({
        data: {
            nom:"Ecran",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Refroidissement",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Périphériques",
            imgId:"background"
        },
    })
    await prisma.categorie.create({
        data: {
            nom:"Autre",
            imgId:"background"
        },
    })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })