import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const renderContent = () => {
    switch (page) {
      case "home":
        return (
          <section className="section">
            <h2>Welcome to the Home Page</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Sapiente,
              harum sit! Accusamus aperiam quis pariatur architecto laudantium,
              recusandae, asperiores odit voluptate quia fugiat officia deleniti
              velit corporis modi, enim sequi.
            </p>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.yljL4UrITx9xFDUb6__u9AHaEh&pid=Api&P=0&h=220"
              alt="Home Page"
            /> 
          </section>
        );
      case "about":
        return (
          <section className="section">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipiscing elit.
              Exercitationem eum quaerat asperiores. Magnam sunt suscipit nam
              aliquam eos asperiores nobis est unde, sapiente vel inventore, ab
              quae in autem corrupti.
            </p>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.lfkcSxloyGS55NOrRUqLHwHaF4&pid=Api&P=0&h=220"
              alt="About Us"
            />
          </section>
        );
      case "contact":
        return (
          <section className="section">
            <h2>Contact Us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
              vero perspiciatis doloribus ducimus iste nostrum! Doloribus quam
              dolorum quaerat obcaecati pariatur enim, aliquid nisi beatae totam
              quisquam alias, nesciunt fugit. <b>contact@myapp.com</b>.
            </p>
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.u0E7flrNMUrlwesaiBbpkwHaH0&pid=Api&P=0&h=220"
              alt="Contact Us"
            />
          </section>
        );
      case "cards":
        return (
          <section className="cards-section">
            <h2>Cards</h2>
            <div className="cards">
              {[1, 2, 3].map((num) => (
                <div key={num} className="card">
                  <h3>Card {num}</h3>
                  <p>This is card number {num}</p>
                  <button onClick={() => alert(`You clicked Card ${num}!`)}>
                    Click me
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      case "account":
        return (
          <section className="section account-section">
            <h2>My Account</h2>
            <div className="account-details">
              <p>
                <strong>Name:</strong> Arman Grigoryan
              </p>
              <p>
                <strong>Email:</strong> ani@example.com
              </p>
              <p>
                <strong>Account Creation Date:</strong> 06/22/2025
              </p>
              <button onClick={() => alert("Edit profile details")}>
                Edit
              </button>
              <button
                onClick={() => alert("You are logging out of your account")}
                style={{ backgroundColor: "#ef4444", marginLeft: "10px" }}
              >
                Log Out
              </button>
            </div>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.Q1yEeYg0gX0WnW4V2mCRkwHaHa&pid=Api&P=0&h=3"
              alt="Account"
              className="account-img"
            />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>My Multi-Page App</h1>
        <nav className="nav">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("about")}>About</button>
          <button onClick={() => setPage("contact")}>Contact</button>
          <button onClick={() => setPage("cards")}>Cards</button>
          <button onClick={() => setPage("account")}>Account</button>
        </nav>
      </header>

      <main className="main">{renderContent()}</main>

      <footer className="footer">
        <p>email: asdfghgfds@mail.ru</p>
      </footer>
    </div>
  );
}

export default App;
