document.getElementById("auditForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const websiteUrl = document.getElementById("websiteUrl").value.trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    try {
        // 🔹 Call backend API
        const res = await fetch("http://localhost:5000/api/audit/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: websiteUrl })
        });

        const auditResults = await res.json();

        // 🔹 If backend doesn’t return structured results yet,
        // you can temporarily use demoResults here instead
        const results = auditResults.results || [
            { title: "Security Check", message: "No SQL injection vulnerability found.", status: "good", icon: "🔒" },
            { title: "SEO Analysis", message: "Meta description is missing.", status: "warning", icon: "📈" },
            { title: "Performance", message: "Page load time is 3.2s. Consider optimizing images.", status: "warning", icon: "⚡" },
            { title: "Accessibility", message: "Contrast ratio is sufficient. All ARIA labels are present.", status: "good", icon: "♿" },
            { title: "Critical Vulnerability", message: "XSS vulnerability detected! Immediate fix required.", status: "critical", icon: "❌" }
        ];

        // 🔹 Render results dynamically
        results.forEach(result => {
            const div = document.createElement("div");
            div.classList.add("result-item");

            let badgeText = "";
            if(result.status === "good") {
                div.style.background = "linear-gradient(135deg, #d4edda, #a3e4c8)";
                badgeText = "Good ✅";
            } else if(result.status === "warning") {
                div.style.background = "linear-gradient(135deg, #fff3cd, #ffe08a)";
                badgeText = "Warning ⚠";
            } else if(result.status === "critical") {
                div.style.background = "linear-gradient(135deg, #f8d7da, #f5a3a0)";
                badgeText = "Critical ❌";
            }

            div.innerHTML = `
                <div class="result-header">
                    <h3>${result.icon} ${result.title}</h3>
                    <span class="status-badge">${badgeText}</span>
                </div>
                <p class="result-message">${result.message}</p>
            `;

            // Collapsible effect
            const messageP = div.querySelector(".result-message");
            messageP.style.display = "none";

            div.querySelector(".result-header").addEventListener("click", () => {
                messageP.style.display = (messageP.style.display === "none") ? "block" : "none";
            });

            resultsDiv.appendChild(div);
        });

        resultsDiv.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
        console.error("Error:", err);
        resultsDiv.innerHTML = "<p style='color:red'>Failed to fetch audit results. Check backend.</p>";
    }
});


// Optional: auto-load past reports from backend
async function loadReports() {
  try {
    const res = await fetch("http://localhost:5000/api/reports");
    const data = await res.json();
    console.log("Reports:", data);
  } catch (err) {
    console.error("Error loading reports:", err);
  }
}
loadReports();