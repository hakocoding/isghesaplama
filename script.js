// Next Step Event Listener
document.getElementById("nextStep").addEventListener("click", function () {
    const selectedFactors = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    displayCurrentStates(selectedFactors);
});

// Display Current States Function
function displayCurrentStates(factors) {
    const currentStatesDiv = document.getElementById("currentStates");
    currentStatesDiv.innerHTML = '';

    factors.forEach(factor => {
        const factorDiv = document.createElement("div");
        factorDiv.classList.add("factor");
        factorDiv.innerHTML = `<h3>${factor}</h3>
            <label for="${factor}-durum">Tehlike:</label>
            <select id="${factor}-durum">
                ${generateOptions(factor)}
            </select>`;
        currentStatesDiv.appendChild(factorDiv);
    });

    document.getElementById("factorSelection").style.display = "none";
    document.getElementById("riskCalculation").style.display = "block";
}

// Back to Factors Event Listener
document.getElementById("backToFactors").addEventListener("click", function () {
    // Show factor selection section
    document.getElementById("factorSelection").style.display = "block";
    // Hide risk calculation section
    document.getElementById("riskCalculation").style.display = "none";
});

// Generate Options Function
function generateOptions(factor) {
    const options = {
        "Yangın tüpü": `
            <option value="Yok">Yok</option>
            <option value="Uygun yerde değil">Uygun yerde değil</option>
            <option value="Periyodik bakımı geçmiş">Periyodik bakımı geçmiş</option>
        `,
        "Kişisel Koruyucu Donanım": `
            <option value="Yetersiz">Yetersiz</option>
            <option value="Tamamen uygun">Tamamen uygun</option>
            <option value="Eğitim yok">Eğitim yok</option>
        `,
        "İş Sağlığı ve Güvenliği Eğitimi": `
            <option value="Eğitim yok">Eğitim yok</option>
            <option value="Güncel eğitim almış">Güncel eğitim almış</option>
            <option value="Eğitim almış ama güncel değil">Eğitim almış ama güncel değil</option>
        `
    };
    return options[factor];
}

// Calculate Risk Event Listener
document.getElementById("calculateRisk").addEventListener("click", function () {
    const results = {};
    const selectedFactors = ['Yangın tüpü', 'Kişisel Koruyucu Donanım', 'İş Sağlığı ve Güvenliği Eğitimi'];

    selectedFactors.forEach(factor => {
        const durumSelect = document.getElementById(`${factor}-durum`);
        if (durumSelect) {
            const durum = durumSelect.value;
            results[factor] = calculateRiskDetails(durum, factor);
        }
    });

    displayResults(results);
});

// Calculate Risk Details Function
function calculateRiskDetails(durum, factor) {
    let olasılık, şiddet, öneri, risk;

    switch (factor) {
        case "Yangın tüpü":
            switch (durum) {
                case "Yok":
                    olasılık = 4;
                    şiddet = 4;
                    risk = "Yangın durumunda can kaybı, maddi kayıp.";
                    öneri = "Düşük tehlike sınıfında her 500 m², orta ve yüksek tehlike sınıfında her 250 m² yapı inşaat alanı için 6 kg’lık yangın söndürücü bulundurulmalıdır.";
                    break;
                case "Uygun yerde değil":
                    olasılık = 3;
                    şiddet = 3;
                    öneri = "Söndürücüler duvara asılmalı ve yerden yüksekliği 90 cm’yi aşmamalıdır.";
                    risk = "Yangın durumunda ulaşamama";
                    break;
                case "Periyodik bakımı geçmiş":
                    olasılık = 3;
                    şiddet = 3;
                    risk = "Yangın durumunda fonksiyonunu yerine getirememe can kaybı, maddi kayıp.";
                    öneri = "Yangın söndürücülerinin periyodik bakımı yapılmalıdır.";
                    break;
            }
            break;

        case "Kişisel Koruyucu Donanım":
            switch (durum) {
                case "Yetersiz":
                    olasılık = 4;
                    şiddet = 4;
                    öneri = "Gerekli kişisel koruyucu donanım sağlanmalıdır.";
                    break;
                case "Tamamen uygun":
                    olasılık = 2;
                    şiddet = 2;
                    öneri = "Durum iyi, ama düzenli kontrol gereklidir.";
                    break;
                case "Eğitim yok":
                    olasılık = 4;
                    şiddet = 3;
                    öneri = "Çalışanlara gerekli eğitim verilmelidir.";
                    break;
            }
            break;

        case "İş Sağlığı ve Güvenliği Eğitimi":
            switch (durum) {
                case "Eğitim yok":
                    olasılık = 4;
                    şiddet = 4;
                    öneri = "İSG eğitimleri düzenlenmelidir.";
                    break;
                case "Güncel eğitim almış":
                    olasılık = 2;
                    şiddet = 2;
                    öneri = "Eğitim güncel, ama yenilenmesi gerekebilir.";
                    break;
                case "Eğitim almış ama güncel değil":
                    olasılık = 3;
                    şiddet = 3;
                    öneri = "Eğitimin güncellenmesi önerilir.";
                    break;
            }
            break;
    }

    const riskSkoru = olasılık * şiddet;

    return {
        olasılık,
        şiddet,
        riskSkoru,
        öneri,
        risk
    };
}

// Display Results Function
function displayResults(results) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    for (const factor in results) {
        const { olasılık, şiddet, riskSkoru, öneri, risk } = results[factor];
        resultDiv.innerHTML += `<h3>${factor}</h3>`;
        resultDiv.innerHTML += `<p>Risk: ${risk}</p>`;
        resultDiv.innerHTML += `<p>Olasılık: ${olasılık}</p>`;
        resultDiv.innerHTML += `<p>Şiddet: ${şiddet}</p>`;
        resultDiv.innerHTML += `<p>Risk Skoru: ${riskSkoru}</p>`;
        resultDiv.innerHTML += `<p>Öneri: ${öneri}</p>`;
    }

    document.getElementById("downloadExcel").style.display = "block";
}

// Download Excel Event Listener
document.getElementById("downloadExcel").addEventListener("click", function () {
    const results = {};
    const selectedFactors = ['Yangın tüpü', 'Kişisel Koruyucu Donanım', 'İş Sağlığı ve Güvenliği Eğitimi'];

    selectedFactors.forEach(factor => {
        const durumSelect = document.getElementById(`${factor}-durum`);
        if (durumSelect) {
            const durum = durumSelect.value; // Kullanıcının seçtiği mevcut durum
            results[factor] = calculateRiskDetails(durum, factor);
        }
    });

    // Başlıkları tanımlayın
    const headers = ["Tehlike Kaynağı", "Mevcut Durum", "Risk", "Olasılık", "Şiddet", "Risk Skoru", "Risk Sınıfı", "Öneri"];
    const rows = [];

    for (const factor in results) {
        const { olasılık, şiddet, riskSkoru, öneri, risk } = results[factor];
        const durumSelect = document.getElementById(`${factor}-durum`);
        const mevcutDurum = durumSelect ? durumSelect.value : ''; // Kullanıcının seçtiği durum

        const riskSınıfı = getRiskClass(riskSkoru);
        // Kullanıcının mevcut durumunu ve diğer bilgileri içeren satırı oluşturun
        const row = [
            factor,
            mevcutDurum,
            risk,
            olasılık,
            şiddet,
            riskSkoru,
            riskSınıfı,
            öneri
        ];

        rows.push(row);
    }

    // Excel dosyası oluşturma
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Risk Hesaplama Sonuçları");

    // Dosyayı indirme
    XLSX.writeFile(workbook, "risk_hesaplama_sonuclari.xlsx");
});

// Risk sınıfını belirleyen fonksiyon
function getRiskClass(riskSkoru) {
    if (riskSkoru >= 1 && riskSkoru <= 4) return "Düşük";
    if (riskSkoru >= 5 && riskSkoru <= 8) return "Orta";
    return "Yüksek"; // riskSkoru 9 ve üzeri
}
