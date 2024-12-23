"use client";
import React, { useState } from 'react';

const SuscribeForm = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [donorName, setDonorName] = useState('Anónimo');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const handleAmountClick = (value) => {
    setAmount(value);
    setCustomAmount('');
    setSelectedAmount(value);
  };

  const handleCustomAmountChange = (e) => {
    setAmount('');
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ amount: customAmount || amount, message, donorName, selectedPaymentMethod });
  };

  return (
    <div className="flex justify-center items-center mt-3">
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg ">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Formulario de Suscripción</h1>

      <div className="space-y-6 ">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona un monto</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {['1000', '2500', '5000', '7500', '10000'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAmountClick(value)}
                className={`w-full py-2 text-gray-700 rounded-md ${selectedAmount === value ? 'bg-[#869EA6] text-white' : 'bg-[#95B6BF] hover:bg-gray-300'}`}
              >
                ${value}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleAmountClick('')}
              className={`w-full py-2 text-gray-700 rounded-md ${selectedAmount === '' ? 'bg-[#869EA6] text-white' : 'bg-[#95B6BF] hover:bg-gray-300'}`}
            >
              Otro
            </button>
          </div>

          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Otro monto"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Mínimo $1.000</p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Enviar un mensaje junto a la suscripción</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje para el destinatario"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Nombre del donante */}
        <div>
          <label htmlFor="donorName" className="block text-sm font-semibold text-gray-700 mb-2">Nombre del suscriptor</label>
          <input
            type="text"
            id="donorName"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Método de pago */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Método de pago</h2>
          <div className="flex space-x-4 mb-4">
            {['MercadoPago', 'Webpay'].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => handlePaymentMethodSelection(method)}
                className={`w-full py-2 px-4 border rounded-md ${selectedPaymentMethod === method ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Resumen de la donación */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">Resumen de tu suscripción</h3>
          <p className="text-gray-700">Monto: ${customAmount || amount}</p>
          <p className="text-gray-700">Método de pago: {selectedPaymentMethod}</p>
        </div>

        {/* Botón de envío */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-[#447380] hover:bg-[#95B6BF] text-white font-semibold rounded-md transition duration-300"
          >
            Suscribirse
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default SuscribeForm;
