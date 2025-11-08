export const portfolioData = {
  about: {
    name: "Nathishwar C",
    role: "Full Stack Developer",
    bio: "Passionate developer with expertise in building modern web applications. I love creating elegant solutions to complex problems.",
    location: "San Francisco, CA",
    education: "B.S. Computer Science",
  },
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      code: {
        language: "typescript",
        content: `// Payment processing with Stripe
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}`,
      },
      preview: null, // We'll set this to null for now since it contains JSX
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["React", "Firebase", "Tailwind CSS"],
      code: {
        language: "typescript",
        content: `// Real-time task updates with Firebase
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase-config';

export function subscribeToTasks(userId: string, callback: (tasks: Task[]) => void) {
  const q = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
    
    callback(tasks);
  });
}`,
      },
      preview: null, // We'll set this to null for now since it contains JSX
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather forecast application with data visualization",
      tech: ["React", "OpenWeather API", "Chart.js"],
      code: {
        language: "typescript",
        content: `// Fetch weather data from OpenWeather API
interface WeatherData {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}`,
      },
      preview: null, // We'll set this to null for now since it contains JSX
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    frontend: ["React", "Vue.js", "Tailwind CSS", "Next.js"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Vercel"],
  },
  contact: {
    email: "nathishwarc@gmail.com",
    github: "github.com/Nathishwar-prog",
    linkedin: "linkedin.com/in/nathishwar/",
    twitter: "@nathishwarc",
    website: "knowgrow.tech",
    instagram: "instagram.com/nathishwar",
  },
};