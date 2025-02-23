// import axios from "axios";
const form = document.querySelector("#form");

// handle form submit

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productName = document.querySelector("#product-name").value;
  const price = document.querySelector("#price").value;
  const brand = document.querySelector("#brand").value;

  const formData = new FormData(form);
  console.log(`Form data ${formData}`);
  await fetch("http://localhost:5500/api/products/", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log("POSTED");
      res.json();
    })
    .catch((err) => console.error("ERROR", err));

  console.log(productName);
  console.log(price);
  console.log(brand);
});
