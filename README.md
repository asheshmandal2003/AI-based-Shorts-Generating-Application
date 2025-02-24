# ShortsBot

**ShortsBot** is an AI-powered short video generation platform designed to transform text scripts into captivating videos effortlessly. Using cutting-edge technologies such as the **Gemini API**, **Google Cloud**, **Text-to-Speech API**, **AssemblyAI**, and **Replicate**, ShortsBot automates the creation of video scripts, audio, captions, and images. All generated media assets are securely stored in **Firebase Storage**, ensuring reliable and scalable data management. The platform utilizes **Remotion.js** for seamless video rendering, delivering high-quality outputs.

As a **Software-as-a-Service (SaaS)** solution, ShortsBot offers a **starter plan** with **30 free credits** for users to explore its capabilities. Once the free credits are exhausted, users can purchase additional tokens to continue creating videos. The platform integrates **Razorpay** for secure and hassle-free payment processing.

To enhance performance and ensure fast data retrieval, ShortsBot incorporates a **caching service powered by Redis**. The entire application is built using modern web technologies, including **Next.js** for server-side rendering, **Tailwind CSS** for responsive and sleek UI design, and **ShadCN** for reusable and customizable components.

## Demo

[![ShortsBot Demo](https://img.youtube.com/vi/TYKHKoPzNRo/0.jpg)](https://youtu.be/TYKHKoPzNRo)

## Features

- **AI-Powered Video Generation**: Automatically generates video scripts, audio, captions, and images.
- **Multi-API Integration**: Utilizes Gemini API, AssemblyAI, Google Cloud Text-to-Speech, and Replicate.
- **Secure Storage**: All media assets are stored in Firebase Storage.
- **Authentication**: Handled via Clerk.js.
- **Real-Time User Data Synchronization**: Ensures data consistency using ngrok and Clerk webhooks.
- **SaaS Model**: Offers a starter plan with 30 free credits and subscription-based pricing.
- **Payment Integration**: Seamless payments via Razorpay.
- **Fast Data Retrieval**: Caching implemented using Redis for improved performance.
- **Modern Tech Stack**: Built with Next.js, Tailwind CSS, and ShadCN for a responsive and scalable UI.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, ShadCN
- **Backend**: Next.js API routes, Firebase
- **APIs**: Gemini API, AssemblyAI, Google Cloud Text-to-Speech, Replicate
- **Database**: Neon Postgres
- **Storage**: Firebase Storage
- **Caching**: Redis
- **Authentication**: Clerk.js
- **Payments**: Razorpay
- **Video Rendering**: Remotion.js

## Prerequisites

- [Clerk.js API Tokens](https://dashboard.clerk.com)  
- [Ngrok](https://dashboard.ngrok.com)  
- [Gemini API Key](https://ai.google.dev/)  
- [AssemblyAI API Tokens](https://www.assemblyai.com/)  
- Google Cloud API Key for Text-to-Speech  
- [Replicate API Key](https://replicate.com/)  
- [Neon Setup](https://console.neon.tech/)  
- Redis Setup
- [Razorpay API tokens](https://dashboard.razorpay.com/)

## Installation

Follow these steps to set up ShortsBot locally:

1. Clone the repository.
   ```bash
   git clone https://github.com/asheshmandal2003/ShortsBot.git
   ```
2. Navigate to the `ShortsBot` directory.
3. Install the dependencies.
   ```bash
   npm install
   ```
4. Create a `.env.local` file inside the root directory and setup all the environment variables as per the `.example.env` file.
5. Create a `drizzle.config.js` file inside the root directory.
   ```bash
   import { defineConfig } from "drizzle-kit";

    export default defineConfig({
      dialect: "postgresql",
      schema: "./config/schema.js",
      out: "./drizzle",
      dbCredentials: {
        url: Your neon postgres database URL,
      },
    });

   ```
6. Generate database migrations.
   ```bash
   npm run db:generate
   ```
7. Apply migrations.
   ```bash
   npm run db:migrate
   ```
8. Start ngrok server.
   ```bash
   ngrok http 3000
   ```
9. Copy the `ngrok` forwarding URL.
    - Go to the Clerk dashboard → Configure section.
    - In the side navigation menu, click on Webhooks.
    - Create a webhook using the ngrok forwarding URL and name it as `<forwardingURL>/api/webhooks`.(Example: `https://16b3-117-194-63-28.ngrok-free.app/api/webhooks`).
10. Start the development server.
    ```bash
    npm run dev
    ```
11. Access `ShortsBot` at http://localhost:3000








