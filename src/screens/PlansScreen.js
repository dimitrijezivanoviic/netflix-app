import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./PlansScreen.css";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    //get data from firebase v9
    const colRef = collection(db, "products");
    getDocs(colRef).then((querySnapshot) => {
      const products = {};
      querySnapshot.docs.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  console.log(products);

  const homePageHandler = () => {
    alert("Thank you for subscription!");
    navigate("/");
  };

  const loadCheckout = async (priceId) => {
    const data = {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    };

    const docRef = await addDoc(collection(db, "customers"), data);
    // const docRef = await db
    //   .collection("customers")
    //   .doc(user.uid)
    //   .collection("checkout_sessions")
    //   .add({
    //     price: priceId,
    //     success_url: window.location.origin,
    //     cancel_url: window.location.origin,
    //   });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51KHnwDAAhbcxRJTSnFZJbCFdFv6sIFy0JJZG0dJIhzIiiVZovh7ogDVGKQLRjKBpdFo59XGCG3Z5ZalrOPTHKfaX0026WbMdUU"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //if users subscription is active
        return (
          <div className="plansScreen__plan" key={productId}>
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button className="plansScreen__plan" onClick={homePageHandler}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
