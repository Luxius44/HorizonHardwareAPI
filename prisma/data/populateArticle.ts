import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.article.deleteMany({})
    await prisma.article.create({
        data: {
            titre: "1080 Nvdia",
            description: "Voici une review de la superbe 1080 de chez Nvdia",
            contenu: "La NVIDIA GeForce GTX 1080 est une carte graphique haut de gamme sortie en 2016, et qui a été considérée comme la carte graphique la plus puissante à l'époque. Elle a été un choix populaire pour les joueurs exigeants et les créateurs de contenu qui ont besoin de performances graphiques élevées.  La GTX 1080 est basée sur l'architecture Pascal de NVIDIA, avec une gravure en 16 nm. Elle dispose de 2560 cœurs CUDA, d'une fréquence de base de 1607 MHz et d'une fréquence maximale en mode turbo de 1733 MHz. Elle dispose également de 8 Go de mémoire GDDR5X à une bande passante de 320 Go/s et d'une interface mémoire de 256 bits. La carte a un TDP de 180 watts.  En termes de performances, la GTX 1080 est capable de faire tourner tous les jeux modernes en ultra haute définition (UHD) à des fréquences d'images très élevées, ce qui en fait une carte graphique parfaite pour les joueurs exigeants. Elle est également capable de gérer facilement les applications de réalité virtuelle et les tâches de création de contenu telles que le rendu vidéo, la modélisation 3D et l'édition de photos.  La GTX 1080 dispose également de technologies modernes comme NVIDIA G-SYNC, NVIDIA Ansel, VRWorks et DirectX 12. Ces technologies permettent d'améliorer l'expérience de jeu en offrant des images plus fluides, une meilleure résolution et des effets visuels plus réalistes.  En termes de connectivité, la GTX 1080 prend en charge les ports DisplayPort 1.4, HDMI 2.0b et DL-DVI. Elle est également compatible avec les cartes mères PCIe 3.0 et les processeurs Intel et AMD.  En conclusion, la NVIDIA GeForce GTX 1080 est une carte graphique haut de gamme très puissante et polyvalente, capable de gérer les jeux les plus exigeants ainsi que les tâches de création de contenu. Bien qu'elle soit sortie il y a plusieurs années, elle reste une option viable pour ceux qui cherchent à construire un ordinateur de jeu ou de travail avec des performances graphiques élevées.",
            imgId: "background",
            imgsId: "1080Nvdia2A",
            tag: "Carte graphique",
            tags: "Nvidia:Gaming",
            date : new Date()

        },
    })
    await prisma.article.create({
        data: {
            titre: "Ryzen 2600",
            description: "Voici une review du superbe Ryzen 2600",
            contenu: "Le Ryzen 5 2600 est un processeur AMD de deuxième génération de la série Ryzen. Il est sorti en 2018 et est encore considéré comme l'un des meilleurs processeurs milieu de gamme sur le marché. Le Ryzen 5 2600 est basé sur l'architecture Zen+, avec une gravure en 12nm. Il dispose de six cœurs et de 12 threads, avec une fréquence de base de 3,4 GHz et une fréquence maximale en mode turbo de 3,9 GHz. Le processeur a également une mémoire cache L3 de 16 Mo et un TDP de 65 watts. L'une des principales caractéristiques du Ryzen 5 2600 est son excellent rapport qualité-prix. Il offre des performances comparables à celles des processeurs Intel plus chers, comme le Core i5-8600K, à un prix nettement inférieur. Le Ryzen 5 2600 est donc une excellente option pour ceux qui cherchent à construire un ordinateur puissant à un prix abordable. En termes de performances, le Ryzen 5 2600 est capable de gérer une grande variété de tâches, y compris les jeux vidéo, le multitâche, le traitement de données et le rendu vidéo. Il est également compatible avec les cartes graphiques haut de gamme, ce qui en fait un choix solide pour les joueurs qui cherchent à construire un PC de jeu performant sans avoir à dépenser trop d'argent. En termes de connectivité, le Ryzen 5 2600 prend en charge la plupart des technologies modernes, notamment PCIe 3.0, USB 3.1 et SATA 6 Gbps. Il est également compatible avec la plupart des cartes mères AM4, ce qui le rend facilement intégrable dans un large éventail de configurations. En conclusion, le Ryzen 5 2600 est un processeur AMD puissant et abordable, offrant des performances équivalentes à celles des processeurs Intel plus chers. Il est idéal pour les personnes cherchant à construire un ordinateur de bureau performant à un prix abordable et conviendra parfaitement aux joueurs et aux créateurs de contenu à la recherche d'un processeur polyvalent et efficace.",
            imgId: "background",
            imgsId: "Ryzen26002A:Ryzen26003A:Ryzen26004A",
            tag: "Processeur",
            tags: "Ryzen:Intel",
            date : new Date()

        },
    })
    await prisma.article.create({
        data: {
            titre: "Pc gamer",
            description: "Vous voulez un pc gamer pour moins de 500 euros",
            contenu: "Les jeux vidéo sont une activité très populaire, mais il peut être difficile de trouver un ordinateur capable de les faire fonctionner correctement sans dépenser une fortune. Heureusement, il est possible de se procurer un PC gamer à moins de 500 euros, mais cela nécessite de faire quelques compromis. Tout d'abord, il est important de comprendre que pour un PC gamer à ce prix, vous ne pourrez pas vous attendre à des performances de haut niveau. Cependant, vous devriez être capable de jouer à des jeux avec des graphismes raisonnables à des fréquences d'images décentes.",
            imgId: "background",
            imgsId: "Pcgamer2A:Pcgamer3A",
            tag: "Pc",
            tags: "Gamer:Nvidia:Intel",
            date : new Date()
        },
    })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })