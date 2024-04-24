const placeholderImages = [
  "/Cheese-pizza.webp",
  "/chicken-burgar.webp",
  "/chicken-shwarma.jpeg",
  "/choco-corisant.jpeg",
  "/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg",
  "/mixed-fruit-salad.jpeg",
  "/paneer-tikka.jpeg",
  "/Pineapple-Pastry.jpg",
  "/veg-biriyani.jpeg",
  "/veg-sandwich.jpeg",
  "/watermelon-juice.jpg"
];

const getImage = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

export default getImage;
