import React, { useState } from "react";

function MyForm() {
  const [formData, setFormData] = useState({
    amount: "",
    rate: "",
    periods: "",
  });

  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = parseFloat(formData.amount);
    const rate = parseFloat(formData.rate) / 100 / 12;
    const periods = parseFloat(formData.periods);

    let remaining = amount;
    const monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -periods));
    const newResults = [];

    for (let i = 1; i <= periods; i++) {
      const interest = remaining * rate;
      const principal = monthlyPayment - interest;
      remaining -= principal;

      newResults.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
        remaining: remaining.toFixed(2),
      });
    }

    setResults(newResults);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Importe:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label htmlFor="rate">Tasa anual:</label>
        <input
          type="number"
          id="rate"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
          required
        />

        <label htmlFor="periods">Períodos (meses):</label>
        <input
          type="number"
          id="periods"
          name="periods"
          value={formData.periods}
          onChange={handleChange}
          required
        />

        <button type="submit">Calcular</button>
      </form>

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Capital</th>
              <th>Interés</th>
              <th>Pago Mensual</th>
              <th>Saldo de Deuda</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.month}>
                <td>{result.month}</td>
                <td>{result.principal}</td>
                <td>{result.interest}</td>
                <td>{result.monthlyPayment}</td>
                <td>{result.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyForm;
