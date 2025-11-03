const API_KEY = "AIzaSyBPFBJ_jV-EjsL770pmY6P3S6r_cT_CgOc"; // 🔑 thay bằng API key thật
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

sendBtn.onclick = async () => {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  addMessage("Đang suy nghĩ...", "bot");

  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userText }] }]
      })
    });

    const data = await res.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, mình không hiểu 😅";

    removeLastMessage(); // xoá dòng "Đang suy nghĩ..."
    addMessage(botReply, "bot");
  } catch (err) {
    removeLastMessage();
    addMessage("Lỗi kết nối đến Gemini API 😢", "bot");
    console.error(err);
  }
};

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastMessage() {
  const msgs = chatBox.getElementsByClassName("bot");
  if (msgs.length > 0) msgs[msgs.length - 1].remove();
}
