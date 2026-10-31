
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// COLOQUE AQUI SUA CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    appId: "SEU_APP_ID"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// CADASTRO
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
    cadastroForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );

            alert("Cadastro realizado com sucesso!");

            window.location.href = "index.html";

        } catch (error) {
            alert("Erro no cadastro: " + error.message);
        }
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );

            window.location.href = "home.html";

        } catch (error) {
            alert("E-mail ou senha incorretos!");
        }
    });
}

// PROTEÇÃO DA PÁGINA PRINCIPAL
if (window.location.pathname.endsWith("home.html")) {

    onAuthStateChanged(auth, (usuario) => {

        if (!usuario) {
            window.location.href = "index.html";
        }

    });
}

// SAIR DA CONTA
const botaoSair = document.getElementById("sair");

if (botaoSair) {
    botaoSair.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "index.html";
    });
}
