import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.deal.deleteMany({})
    await prisma.deal.create({
        data: {
            catId:15,
            nom:"Intel 1",
            prix:115.99,
            promo:85.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlIntel1"
        },
    })
    await prisma.deal.create({
        data: {
            catId:15,
            nom:"Intel 2",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlIntel2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:16,
            nom:"Nvidia 2",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlNvidia2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:16,
            nom:"Nvidia 1",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlNvidia1"
        },
    })
    await prisma.deal.create({
        data: {
            catId:17,
            nom:"Carte mère 2",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlCartemère2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:17,
            nom:"Carte mère 1",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlCartemère1"
        },
    })
    await prisma.deal.create({
        data: {
            catId:17,
            nom:"Carte mère 2",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlCartemère2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:17,
            nom:"Carte mère 1",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlCartemère1"
        },
    })
    await prisma.deal.create({
        data: {
            catId:18,
            nom:"Ram2",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlRam2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:18,
            nom:"Ram1",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlRam1"
        },
    })
    await prisma.deal.create({
        data: {
            catId:20,
            nom:"Boitier1",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlBoitier1"
        },
    })
    await prisma.deal.create({
        data: {
            catId:20,
            nom:"Boitier2",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlBoitier2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:21,
            nom:"Barracuda",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlBarracuda"
        },
    })
    await prisma.deal.create({
        data: {
            catId:21,
            nom:"Seagate",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlSeagate"
        },
    })
    await prisma.deal.create({
        data: {
            catId:22,
            nom:"Seasonic1",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlSeasonic"
        },
    })
    await prisma.deal.create({
        data: {
            catId:22,
            nom:"Bequiet",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"urlBequiet"
        },
    })
    await prisma.deal.create({
        data: {
            catId:23,
            nom:"Souris",
            prix:110.99,
            promo:50.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"Souris2"
        },
    })
    await prisma.deal.create({
        data: {
            catId:23,
            nom:"Clavier",
            prix:220.99,
            promo:150.99,
            date: new Date(),
            detail: "vram:12gb;price:120€;color:black",
            imgId:"background",
            urlWeb:"Clavier1"
        },
    })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })