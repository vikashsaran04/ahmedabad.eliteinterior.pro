/**
 * Elite Interior - Main Vanilla JavaScript
 * Subdomain: https://about.eliteinterior.pro/
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNav();
  initActiveNav();
  initFaqAccordion();
  initProjectFilters();
  initGuideSearch();
  initBeforeAfterSlider();
  initCostCalculator();
  initEnquiryForm();
});

/* --------------------------------------------------------------------------
   Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector(".nav-toggle-btn");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-drawer-overlay");
  const closeBtn = document.querySelector(".mobile-drawer-close");

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    drawer.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    drawer.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   Highlight Active Navigation Item
   -------------------------------------------------------------------------- */
function initActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("/").pop();

    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html") ||
      (currentPath === "/" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

/* --------------------------------------------------------------------------
   FAQ Accordions
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close other accordions in the same list if needed
      const parent = item.closest(".faq-list");
      if (parent) {
        parent.querySelectorAll(".faq-item").forEach((other) => {
          if (other !== item) {
            other.classList.remove("active");
            const otherBtn = other.querySelector(".faq-question-btn");
            const otherAns = other.querySelector(".faq-answer");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });
      }

      if (isActive) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Project Filter Tabs
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll(".project-filter-tab");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");

      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        const categories = category.split(" ");
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Interior Guides Search & Filter
   -------------------------------------------------------------------------- */
function initGuideSearch() {
  const searchInput = document.getElementById("guide-search");
  const guideCards = document.querySelectorAll(".guide-card");
  const guideFilterBtns = document.querySelectorAll(".guide-filter-btn");

  let currentCategory = "all";
  let currentSearchQuery = "";

  const applyFilters = () => {
    guideCards.forEach((card) => {
      const title = (card.querySelector(".card-title")?.textContent || "").toLowerCase();
      const desc = (card.querySelector("p")?.textContent || "").toLowerCase();
      const category = (card.getAttribute("data-category") || "").toLowerCase();

      const matchesCategory = currentCategory === "all" || category === currentCategory;
      const matchesSearch =
        !currentSearchQuery ||
        title.includes(currentSearchQuery) ||
        desc.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  if (guideFilterBtns.length) {
    guideFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        guideFilterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category") || "all";
        applyFilters();
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Interactive Before & After Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const containers = document.querySelectorAll(".ba-container");

  containers.forEach((container) => {
    const beforeWrap = container.querySelector(".ba-before-wrap");
    const handle = container.querySelector(".ba-handle");
    if (!beforeWrap || !handle) return;

    let isDown = false;

    const setPosition = (x) => {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;
      beforeWrap.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      setPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      setPosition(e.clientX);
    });

    // Touch support for mobile
    container.addEventListener("touchstart", (e) => {
      isDown = true;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDown = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDown || !e.touches[0]) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* --------------------------------------------------------------------------
   Interactive Ahmedabad Interior Cost Calculator
   -------------------------------------------------------------------------- */
function initCostCalculator() {
  const configPills = document.querySelectorAll("[data-calc-config]");
  const tierPills = document.querySelectorAll("[data-calc-tier]");
  const addonChecks = document.querySelectorAll("[data-calc-addon]");
  const resultDisplay = document.getElementById("calc-result-range");
  const ctaBtn = document.getElementById("calc-whatsapp-btn");

  if (!resultDisplay) return;

  const baseValues = {
    "2bhk": { min: 450000, max: 650000, label: "2BHK Flat" },
    "3bhk": { min: 700000, max: 1050000, label: "3BHK Flat" },
    "4bhk": { min: 1200000, max: 1750000, label: "4BHK Flat" },
    "villa": { min: 1800000, max: 2800000, label: "Bungalow / Villa" }
  };

  const tierMultipliers = {
    "basic": 0.85,
    "standard": 1.0,
    "premium": 1.45
  };

  let selectedConfig = "3bhk";
  let selectedTier = "standard";

  function updateEstimate() {
    const base = baseValues[selectedConfig] || baseValues["3bhk"];
    const mult = tierMultipliers[selectedTier] || 1.0;

    let min = base.min * mult;
    let max = base.max * mult;

    let selectedAddonsList = [];
    addonChecks.forEach((chk) => {
      if (chk.checked) {
        const val = parseInt(chk.value, 10) || 0;
        min += val * 0.9;
        max += val * 1.25;
        const label = chk.getAttribute("data-addon-name");
        if (label) selectedAddonsList.push(label);
      }
    });

    // Format Indian currency (Lakhs)
    const formatLakh = (num) => {
      const inLakhs = (num / 100000).toFixed(1);
      return `₹${inLakhs} Lakh`;
    };

    resultDisplay.textContent = `${formatLakh(min)} – ${formatLakh(max)}`;

    if (ctaBtn) {
      const tierLabel = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
      const msg = `Hello Elite Interior, I calculated an approximate estimate for my ${base.label} (${tierLabel} Finish) in Ahmedabad: Approx ${formatLakh(min)} - ${formatLakh(max)}. Included items: ${selectedAddonsList.join(", ") || "Standard Turnkey"}. Please share detailed scope and site consultation schedule.`;
      ctaBtn.href = `https://wa.me/918529326036?text=${encodeURIComponent(msg)}`;
    }
  }

  configPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      configPills.forEach((p) => p.classList.remove("selected"));
      pill.classList.add("selected");
      selectedConfig = pill.getAttribute("data-calc-config");
      updateEstimate();
    });
  });

  tierPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      tierPills.forEach((p) => p.classList.remove("selected"));
      pill.classList.add("selected");
      selectedTier = pill.getAttribute("data-calc-tier");
      updateEstimate();
    });
  });

  addonChecks.forEach((chk) => {
    chk.addEventListener("change", updateEstimate);
  });

  updateEstimate();
}

/* --------------------------------------------------------------------------
   Lead Generation Form & WhatsApp URL Generator
   -------------------------------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById("elite-enquiry-form");
  if (!form) return;

  const alertBox = document.getElementById("form-status-alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasErrors = false;

    // Helper validation
    const validateField = (id, condition) => {
      const input = document.getElementById(id);
      if (!input) return true;
      if (!condition(input.value.trim())) {
        input.classList.add("error");
        hasErrors = true;
        return false;
      } else {
        input.classList.remove("error");
        return true;
      }
    };

    // 1. Full Name (Required, min 2 chars)
    validateField("form-fullname", (val) => val.length >= 2);

    // 2. Mobile Number (Required, 10 digits Indian format)
    validateField("form-mobile", (val) => /^[6-9]\d{9}$/.test(val.replace(/[\s-+]/g, "").slice(-10)));

    // 3. Locality / Address (Required, min 3 chars)
    validateField("form-locality", (val) => val.length >= 3);

    // 4. Configuration (Required)
    validateField("form-config", (val) => val !== "");

    // 5. Property Type (Required)
    validateField("form-property-type", (val) => val !== "");

    // 6. Project Requirements (Required, min 10 chars)
    validateField("form-requirements", (val) => val.length >= 10);

    // 7. Consent (Required)
    const consentInput = document.getElementById("form-consent");
    if (consentInput && !consentInput.checked) {
      consentInput.parentElement.style.color = "#D32F2F";
      hasErrors = true;
    } else if (consentInput) {
      consentInput.parentElement.style.color = "";
    }

    if (hasErrors) {
      if (alertBox) {
        alertBox.className = "form-alert-banner info";
        alertBox.style.display = "block";
        alertBox.innerHTML = "<strong>Please review highlighted fields:</strong> Name, valid 10-digit mobile number, property locality, configuration, property type, brief requirements, and consent are required.";
      }
      return;
    }

    // Gather values
    const fullName = document.getElementById("form-fullname")?.value.trim() || "";
    const mobile = document.getElementById("form-mobile")?.value.trim() || "";
    const locality = document.getElementById("form-locality")?.value.trim() || "";
    const config = document.getElementById("form-config")?.value || "";
    const propType = document.getElementById("form-property-type")?.value || "";
    const size = document.getElementById("form-size")?.value.trim() || "Not specified";
    const budget = document.getElementById("form-budget")?.value || "To be discussed";
    const startDate = document.getElementById("form-start-date")?.value || "Flexible";
    const requirements = document.getElementById("form-requirements")?.value.trim() || "";

    // Gather selected checkboxes for services
    const servicesChecked = [];
    document.querySelectorAll("input[name='services']:checked").forEach((chk) => {
      servicesChecked.push(chk.value);
    });
    const servicesStr = servicesChecked.length ? servicesChecked.join(", ") : "Complete Home Turnkey";

    // Format WhatsApp message
    const waText = 
`*NEW INTERIOR PROJECT ENQUIRY*
----------------------------------------
• *Client Name:* ${fullName}
• *Mobile Number:* ${mobile}
• *Property Locality:* ${locality}
• *Configuration:* ${config}
• *Property Type:* ${propType}
• *Approx. Carpet Area:* ${size}
• *Required Services:* ${servicesStr}
• *Expected Budget Range:* ${budget}
• *Expected Start Timeline:* ${startDate}
• *Project Details / Scope:*
${requirements}
----------------------------------------
_Initiated via Elite Interior Authority Portal (about.eliteinterior.pro)_`;

    const encodedMsg = encodeURIComponent(waText);
    const waUrl = `https://wa.me/918529326036?text=${encodedMsg}`;

    // Display transparent guidance
    if (alertBox) {
      alertBox.className = "form-alert-banner success";
      alertBox.style.display = "block";
      alertBox.innerHTML = `
        <strong>Enquiry Formatted for WhatsApp!</strong><br>
        We have prepared your project specifications. Please click <strong>"Send"</strong> in WhatsApp to deliver your enquiry directly to the Elite Interior design team.<br><br>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="margin-right: 0.5rem;">
          Open in WhatsApp Now &rarr;
        </a>
        <a href="tel:+918529326036" class="btn btn-dark btn-sm">
          Or Call +91 8529326036
        </a>
      `;
    }

    // Open WhatsApp
    window.open(waUrl, "_blank");
  });
}
