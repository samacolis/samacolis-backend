"use client";

import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', content: '' });

    // Ici, vous intégreriez la logique d'envoi du formulaire (ex: via une API)
    // Pour l'exemple, nous allons simuler une réponse
    try {
      // Simuler un envoi réussi
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatusMessage({ type: 'success', content: 'Votre message a été envoyé avec succès !' });
      // Réinitialiser le formulaire
      setName('');
      setEmail('');
      setMessageContent('');
    } catch (error) {
      setStatusMessage({ type: 'error', content: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer." });
    }
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Contactez-nous</h1>
      <p className="text-center mb-8">Une question ? Un devis ? L’équipe SamaColis est là pour vous répondre rapidement.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Formulaire */}
        <form className="flex-1 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {statusMessage.content && (
            <div className={`p-4 mb-4 text-center rounded-md flex items-center justify-center ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {statusMessage.type === 'success' ? '✅' : '❌'} <span className="ml-2">{statusMessage.content}</span>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom :</label>
            <input type="text" id="name" name="name" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail :</label>
            <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message :</label>
            <textarea id="message" name="message" rows="5" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={messageContent} onChange={(e) => setMessageContent(e.target.value)}></textarea>
          </div>

          <button type="submit" className="bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 font-semibold w-full">Envoyer</button>
        </form>

        {/* Infos */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Informations</h2>
          <p className="mb-3 text-gray-700"><strong className="font-bold">Email :</strong> <a href="mailto:samacolis1@gmail.com" className="text-emerald-600 hover:underline">samacolis1@gmail.com</a></p>
          <p className="mb-3 text-gray-700"><strong className="font-bold">WhatsApp :</strong> +33 6 00 00 00 00</p>
          <p className="mb-3 text-gray-700"><strong className="font-bold">Adresse :</strong> Paris, France (entrepôt)</p>
        </div>
      </div>
    </section>
  );
}
