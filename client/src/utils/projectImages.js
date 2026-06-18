import {
  shawlImg,
  scarf,
  sweaterImg,
  socksImg,
  default_yarn,
} from "../assets";

const imageLibrary = {
  shawl: shawlImg,
  scarf,
  sweater: sweaterImg,
  socks: socksImg,
  default: default_yarn,
};

export function getProjectImage(projectName) {
  const name = projectName.toLowerCase();

  if (name.includes("shawl")) return imageLibrary.shawl;
  if (name.includes("scarf")) return imageLibrary.scarf;
  if (name.includes("sweater")) return imageLibrary.sweater;
  if (name.includes("socks")) return imageLibrary.socks;

  return imageLibrary.default;
}