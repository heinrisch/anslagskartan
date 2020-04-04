import { Post } from "../../models/post";

export const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticPosts), 2000);
  });
};

const staticPosts = [
  {
    position: { latitude: 59.29374, longitude: 18.05942 },
    name: "Karolinska Universitetssjukhuset",
  },
  {
    position: { latitude: 59.29628, longitude: 18.05375 },
    name: "Aleris Sports Medicine & Ortopedi",
  },
  {
    position: { latitude: 59.29102, longitude: 18.05719 },
    name: "Stockholms Sjukhem",
  },
  {
    position: { latitude: 59.30994, longitude: 18.05736 },
    name: "Smärtrehabiliteringen, Capio S:t Görans Sjukhus",
  },
  {
    position: { latitude: 59.31134, longitude: 18.05307 },
    name: "Capio Sankt Görans Sjukhus",
  },
  {
    position: { latitude: 59.33245, longitude: 18.01567 },
    name: "S:t Eriks Ögonsjukhus",
  },
  {
    position: { latitude: 59.3335, longitude: 18.02048 },
    name: "Cavalio AB",
  },
  {
    position: { latitude: 59.33315, longitude: 18.03731 },
    name: "Ersta sjukhus",
  },
  {
    position: { latitude: 59.35512, longitude: 17.94724 },
    name: "Capio Psykiatri Hemlösa",
  },
  {
    position: { latitude: 59.40612, longitude: 18.03671 },
    name: "Södersjukhuset Mammografi",
  },
  { position: { latitude: 59.4042, longitude: 18.04805 }, name: "SCÄ" },
  {
    position: { latitude: 59.40036, longitude: 18.04564 },
    name: "Psykiatri Södra Stockholm Affektiv- och ångestmottagning Rosenlund",
  },
  {
    position: { latitude: 59.40542, longitude: 18.02607 },
    name: "Autismcenter för små barn",
  },
  {
    position: { latitude: 59.36523, longitude: 18.13665 },
    name: "Närakut Rosenlund",
  },
  { position: { latitude: 59.36925, longitude: 18.14489 }, name: "SÖS" },
  {
    position: { latitude: 59.33689, longitude: 18.08754 },
    name: "Lilla Erstagården",
  },
  {
    position: { latitude: 59.33706, longitude: 18.08239 },
    name: "Habiliteringscenter Söderstaden barn",
  },
  {
    position: { latitude: 59.33566, longitude: 18.08548 },
    name: "Remeo Stockholm",
  },
  {
    position: { latitude: 59.33531, longitude: 18.09097 },
    name: "Farsta Neurologi",
  },
  {
    position: { latitude: 59.33461, longitude: 18.08445 },
    name: "Hagsätra Vantörs Psykiatriska Heldygnsvård",
  },
  {
    position: { latitude: 59.33584, longitude: 18.0793 },
    name: "Bromma Sjukhus",
  },
];
