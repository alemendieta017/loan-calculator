import { useState } from "react";
import logo from "./logo-sudameris.svg";
import "./App.scss";

function App() {
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
        principal: Math.abs(principal).toLocaleString('es', { maximumFractionDigits: 0 }),
        interest: Math.abs(interest).toLocaleString('es', { maximumFractionDigits: 0 }),
        monthlyPayment: Math.abs(monthlyPayment).toLocaleString('es', { maximumFractionDigits: 0 }),
        remaining: Math.abs(remaining).toLocaleString('es', { maximumFractionDigits: 0 })
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
    <div className="container min-vh-100 d-flex align-items-center flex-column">
      <div className="container text-center my-5">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Calculadora de préstamo</h2>
      {results.length > 0 && <div class="alert alert-success" role="alert">
      Calculado con éxito! Cuota mensual <strong>{results[0].monthlyPayment}</strong> Gs.
      </div>}
      <form
        className="w-100 d-flex flex-column form"
        onSubmit={handleSubmit}
      >
        <label>Importe</label>
        <input
          type="number"
          defaultValue={formData.amount}
          onChange={handleChange}
          name="amount"
          placeholder="Monto del préstamo solicitado"
          required
        ></input>
        <label>Tasa de Interes</label>
        <input
          type="number"
          defaultValue={formData.rate}
          onChange={handleChange}
          name="rate"
          placeholder="Cargue el dato con números, ejemplo si es 15%, cargue 15"
          required
        ></input>
        <label>Plazo (en meses)</label>
        <input
          type="number"
          defaultValue={formData.periods}
          onChange={handleChange}
          name="periods"
          placeholder="Ejemplo si es para 1 año, cargue 12"
          required
        ></input>
        <input type="submit" className="btn btn-primary mt-3 text-white" />
      </form>

      <div className="container rounded-5 mt-4">
        {results.length > 0 && (
          <table className="table table-striped table-responsive">
            <thead className="table-primary">
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
      <p>
        Obs: En el cálculo realizado no se consideran las comisiones de la
        operación. Por lo tanto, el resultado puede variar con respecto al monto
        final a pagar en concepto de cuota, la cual generalmente incluye las
        comisiones y/o otros costos asociados al producto.
      </p>
    </div>
  );
}

export default App;
