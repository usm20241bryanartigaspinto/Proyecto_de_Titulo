"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const DonationForm = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [donorName, setDonorName] = useState("Anónimo");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [error, setError] = useState("");

  const handleAmountClick = (value) => {
    setAmount(value);
    setCustomAmount("");
    setSelectedAmount(value);
    setError("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setAmount("");
    setCustomAmount(value);
    setSelectedAmount("");
    setError("");
  };

  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalAmount = customAmount || amount;

    if (!finalAmount || finalAmount < 1000) {
      setError("El monto debe ser al menos $1,000.");
      return;
    }

    if (!selectedPaymentMethod) {
      setError("Por favor, selecciona un método de pago.");
      return;
    }

    if (!session?.user?.id) {
      setError("No se ha encontrado un usuario logueado.");
      return;
    }

    const formData = new FormData();
    formData.append('user_id', session.user.id);
    formData.append('dona_monto', finalAmount);
    formData.append('dona_mensaje', message);
    formData.append('dona_name', donorName || "Anónimo");
    formData.append('dona_metodo', selectedPaymentMethod);

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al procesar la donación.");
        return;
      }

      alert("¡Gracias por tu donación!");
      setAmount("");
      setCustomAmount("");
      setMessage("");
      setDonorName("Anónimo");
      setSelectedPaymentMethod("");
      setSelectedAmount("");
      setError("");
    } catch (error) {
      console.error('Error al enviar la donación:', error);
      setError("Error al enviar la donación. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Formulario de Donación
        </h1>

        {error && (
          <div className="mb-4 text-red-500 text-sm font-semibold">{error}</div>
        )}

        <div className="space-y-6">
        
          {/* Campo de monto */}
          <div>
            <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
              Monto de la Donación
            </label>
            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                className={`py-2 px-4 bg-[#447380] text-white rounded-md ${
                  selectedAmount === "1000" ? "bg-[#95B6BF]" : ""
                }`}
                onClick={() => handleAmountClick("1000")}
              >
                $1,000
              </button>
              <button
                type="button"
                className={`py-2 px-4 bg-[#447380] text-white rounded-md ${
                  selectedAmount === "2000" ? "bg-[#95B6BF]" : ""
                }`}
                onClick={() => handleAmountClick("2000")}
              >
                $2,000
              </button>
              <button
                type="button"
                className={`py-2 px-4 bg-[#447380] text-white rounded-md ${
                  selectedAmount === "5000" ? "bg-[#95B6BF]" : ""
                }`}
                onClick={() => handleAmountClick("5000")}
              >
                $5,000
              </button>
            </div>
            <input
              type="number"
              id="customAmount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="mt-2 w-full px-4 py-2 border rounded-md"
              placeholder="Monto personalizado"
            />
          </div>

          {/* Campo de mensaje */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
              Mensaje (Opcional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full px-4 py-2 border rounded-md"
              placeholder="Escribe un mensaje para el destinatario"
            />
          </div>

          {/* Campo de nombre del donante */}
          <div>
            <label htmlFor="donorName" className="block text-lg font-medium text-gray-700">
              Nombre del Donante
            </label>
            <input
              type="text"
              id="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border rounded-md"
              placeholder="Nombre del donante"
            />
          </div>

          {/* Métodos de pago */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Método de pago</label>
            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                className={`py-2 px-4 bg-[#447380] text-white rounded-md ${
                  selectedPaymentMethod === "tarjeta" ? "bg-[#95B6BF]" : ""
                }`}
                onClick={() => handlePaymentMethodSelection("tarjeta")}
              >
                Tarjeta
              </button>
              <button
                type="button"
                className={`py-2 px-4 bg-[#447380] text-white rounded-md ${
                  selectedPaymentMethod === "mercadoPago" ? "bg-[#95B6BF]" : ""
                }`}
                onClick={() => handlePaymentMethodSelection("mercadoPago")}
              >
                Mercado Pago
              </button>
              <button
                type="button"
                className={`py-2 px-4 bg-[#447380] text-white rounded-md ${
                  selectedPaymentMethod === "webpay" ? "bg-[#95B6BF]" : ""
                }`}
                onClick={() => handlePaymentMethodSelection("webpay")}
              >
                Webpay
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-md transition duration-300 ${
                !selectedPaymentMethod || (!customAmount && !amount)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#447380] hover:bg-[#95B6BF]"
              }`}
              disabled={!selectedPaymentMethod || (!customAmount && !amount)}
            >
              Donar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;