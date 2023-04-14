// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNzRdlcfQeoN8a7L0jA04zhDamdpwyyJI",
  authDomain: "learnfirebase-f2755.firebaseapp.com",
  databaseURL: "https://learnfirebase-f2755-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "learnfirebase-f2755",
  storageBucket: "learnfirebase-f2755.appspot.com",
  messagingSenderId: "994018527725",
  appId: "1:994018527725:web:d6978ce0e350bd778effe4",
  measurementId: "G-WBPJCQ3BK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);
const dbRef = ref(db);

const rakeBtns = document.querySelectorAll(".rakeBtn");
rakeBtns.forEach(function(rakeBtn) {
  rakeBtn.addEventListener("click", async function() {
    const rakeId = rakeBtn.dataset.rakeId;
    const temperature = await fetchTemperatureData(rakeId);
    // Update the modal content with the fetched temperature data
     const modalBody = document.querySelector(".modal-body");
     modalBody.innerHTML = `${temperature}`;
    //  console.log(`${temperature}`);
    // Dummy condition to change Rake 1 button to yellow (denotes warning) when temperature goes above 87 F
     if(`${temperature}`>'Temperature: 87 F'){
      document.querySelector("[data-rake-id='RAKE 1']").style.background = 'yellow';
     }
     else{
      document.querySelector("[data-rake-id='RAKE 1']").style.background = '#F0F0F0';
     }
  });
});

async function fetchTemperatureData(rakeId) {
  // Function to fetch temperature data for the specified rake ID
  console.log(rakeId)
  try {
    const snapshot = await get(child(dbRef, `rakes/${rakeId}/rakeTemperature`));
    if (snapshot.exists()) {
      const temp = snapshot.val().rakeTemperature;
      return temp;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    throw error;
  }
}

