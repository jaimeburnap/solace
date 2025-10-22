import db from "..";
import { advocates } from "../schema";

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const firstNames = [
  "John", "Jane", "Alice", "Michael", "Emily", "Chris", "Jessica", "David",
  "Laura", "Daniel", "Sarah", "James", "Megan", "Joshua", "Amanda", "Robert",
  "Jennifer", "William", "Elizabeth", "Richard", "Maria", "Joseph", "Susan",
  "Thomas", "Karen", "Charles", "Nancy", "Christopher", "Lisa", "Matthew",
  "Betty", "Anthony", "Dorothy", "Mark", "Sandra", "Donald", "Ashley",
  "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Kenneth",
  "Michelle", "George", "Carol", "Kevin", "Amanda", "Brian", "Melissa",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen",
  "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera",
  "Campbell", "Mitchell", "Carter", "Roberts",
];

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis",
  "Seattle", "Denver", "Washington", "Boston", "El Paso", "Detroit", "Nashville",
  "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore",
  "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City",
  "Long Beach", "Mesa", "Atlanta", "Colorado Springs", "Virginia Beach", "Raleigh",
  "Omaha", "Miami", "Oakland", "Minneapolis", "Tulsa", "Wichita", "New Orleans",
];

const degrees = ["MD", "PhD", "MSW", "PsyD", "LCSW", "LPC", "LMFT"];

const randomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomSpecialty = () => {
  const count = Math.floor(Math.random() * 8) + 1;
  const shuffled = [...specialties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const randomPhoneNumber = (): number => {
  const npa = Math.floor(Math.random() * 900) + 100;
  const nxx = Math.floor(Math.random() * 900) + 100;
  const xxxx = Math.floor(Math.random() * 10000);
  return parseInt(`${npa}${nxx.toString().padStart(3, '0')}${xxxx.toString().padStart(4, '0')}`);
};

const advocateData = Array.from({ length: 1000 }, () => ({
  firstName: randomElement(firstNames),
  lastName: randomElement(lastNames),
  city: randomElement(cities),
  degree: randomElement(degrees),
  specialties: randomSpecialty(),
  yearsOfExperience: Math.floor(Math.random() * 25) + 1,
  phoneNumber: randomPhoneNumber(),
}));

export { advocateData };
