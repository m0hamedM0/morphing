document.addEventListener("DOMContentLoaded", function () {
    // Function to truncate text
    function truncateText(element, maxLength) {
      var fullText = element.getAttribute("data-full-text") || element.innerText;
      if (fullText.split(" ").length > maxLength) {
        return fullText.split(" ").slice(0, maxLength).join(" ") + "...";
      }
      return fullText;
    }
  
    // Toggle Read More/Less
    function toggleReadMore(button) {
      var para = button.previousElementSibling;
      var isTruncated = para.getAttribute("data-truncated") === "true";
  
      if (isTruncated) {
        para.style.transition = "max-height 1s ease-in-out"; // Enable transition for expanding
        para.style.maxHeight = para.scrollHeight * 4 + "px"; // Set to expanded height
        para.innerText = para.getAttribute("data-full-text");
        button.innerText = "Read Less";
        para.setAttribute("data-truncated", "false");
      } else {
        para.style.transition = "max-height 1s ease-in-out"; // Enable transition for collapsing
        para.style.maxHeight = "90px"; // Start collapsing animation
  
        // Change text after the transition is complete
        setTimeout(() => {
          para.innerText = truncateText(para, 30);
        }, 1000); // Timeout should match the transition duration
  
        button.innerText = "Read More";
        para.setAttribute("data-truncated", "true");
      }
    }
  
    // Initialize paragraphs
    document.querySelectorAll(".truncate").forEach(function (para) {
      var fullText = para.innerText;
      para.setAttribute("data-full-text", fullText);
      para.setAttribute("data-truncated", "true");
      para.innerText = truncateText(para, 30);
      para.style.maxHeight = "90px"; // Initial max height for truncated text
    });
  
    // Set up click events
    document.querySelectorAll(".read-more").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleReadMore(this);
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1, // Adjust as needed
      }
    );
  
    document.querySelectorAll(".fade-in-section").forEach((section) => {
      observer.observe(section);
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysContainer = document.querySelector(".days");
    const monthNameElement = document.querySelector(".month-name");
    const prevMonthElement = document.querySelector(".prev-month");
    const nextMonthElement = document.querySelector(".next-month");
  
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    let currentDisplayedMonth = currentMonth;
    let currentDisplayedYear = currentYear;
  
    function renderCalendar(month, year) {
      daysContainer.innerHTML = "";
      monthNameElement.textContent = months[month] + " " + year;
  
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = i;
        dayElement.classList.add("day");
  
        if (
          i === currentDate.getDate() &&
          month === currentMonth &&
          year === currentYear
        ) {
          dayElement.classList.add("current-day");
        }
  
        if (i === 15 && month === currentMonth) {
          dayElement.classList.add("concert-day");
          dayElement.setAttribute("data-url", "https://www.morphingmusic.com/t");
          dayElement.addEventListener("click", function () {
            const url = this.getAttribute("data-url");
            window.open(url, "_blank");
          });
        }
  
        daysContainer.appendChild(dayElement);
      }
    }
  
    renderCalendar(currentMonth, currentYear);
  
    prevMonthElement.addEventListener("click", function () {
      currentDisplayedMonth--;
      if (currentDisplayedMonth < 0) {
        currentDisplayedMonth = 11;
        currentDisplayedYear--;
      }
      renderCalendar(currentDisplayedMonth, currentDisplayedYear);
    });
  
    nextMonthElement.addEventListener("click", function () {
      currentDisplayedMonth++;
      if (currentDisplayedMonth > 11) {
        currentDisplayedMonth = 0;
        currentDisplayedYear++;
      }
      renderCalendar(currentDisplayedMonth, currentDisplayedYear);
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    // Select all links with hashes
    const smoothScrollLinks = document.querySelectorAll('.navbar a[href^="#"]');
  
    // Add an event listener to each link
    smoothScrollLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        // On-click, prevent the default anchor behavior
        event.preventDefault();
  
        // Get the target element's ID from the href attribute
        const targetId = this.getAttribute("href");
        if (targetId !== "#") {
          const targetElement = document.querySelector(targetId);
  
          // Scroll to the target element smoothly
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  });
  

  
  window.addEventListener("scroll", () => {
    const videos = document.querySelectorAll(".video-background");
    videos.forEach((video) => {
      const videoTop = video.getBoundingClientRect().top;
      const videoBottom = video.getBoundingClientRect().bottom;
  
      if (videoTop < window.innerHeight && videoBottom >= 0) {
        video.classList.add("visible");
      } else {
        video.classList.remove("visible");
      }
    });
  });
  
  document.addEventListener("scroll", function () {
    var bottomImage = document.getElementById("bottom-image");
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY;
    var documentHeight = document.body.offsetHeight;
  
    // Calculate the distance from the bottom of the page
    var distanceFromBottom = documentHeight - (scrollY + windowHeight);
  
    // Check if the user is near the bottom of the page
    if (distanceFromBottom < 10) {
      // 100 is the threshold in pixels
      bottomImage.style.opacity = 0.6; // Fade in
    } else {
      bottomImage.style.opacity = 0; // Fade out
    }
  });
  
  document.addEventListener("scroll", function () {
    var bottomImage = document.getElementById("bottom-image");
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY;
    var documentHeight = document.body.offsetHeight;
  
    // Calculate the distance from the bottom of the page
    var distanceFromBottom = documentHeight - (scrollY + windowHeight);
  
    // Image will be fully visible when at the bottom
    if (distanceFromBottom <= 0) {
      bottomImage.style.opacity = 1;
    } else {
      // Start fading out the image as the user scrolls up
      var opacity = 1 - distanceFromBottom / windowHeight;
      bottomImage.style.opacity = opacity;
    }
  });
  
  function changeLanguage(lang) {
    window.location.href = lang === "de" ? "indexgerman.html" : "index.html";
  }
  
  // Using vanilla JavaScript
  
  $(document).ready(function () {
    $(".dropdown-toggle").click(function (el) {
      $(".dropdown-menu").removeClass("show");
      if ($(this).hasClass("show")) {
        $(this).removeClass("show");
        $(this).parent().removeClass("show");
      } else {
        $(this).addClass("show");
      }
    });
  
    $(".btnMenu").click(function (ev) {
      ev.preventDefault();
    });
  
    $(".dropdown-toggle").hover(function (el) {
      document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
        menu.classList.remove("show");
      });
    });
  });
  
  document
    .querySelectorAll(".dropdown-toggle")
    .forEach(function (dropdownToggle) {
      dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault();
        var dropdownMenu = this.nextElementSibling;
        var isMenuOpen = dropdownMenu.classList.contains("show");
  
        // Close all dropdown menus
        document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
          menu.classList.remove("show");
        });
  
        // Toggle this dropdown menu
        if (!isMenuOpen) {
          dropdownMenu.classList.add("show");
        }
      });
      dropdownToggle.addEventListener("hover", function (event) {
        event.preventDefault();
        var dropdownMenu = this.nextElementSibling;
        var isMenuOpen = dropdownMenu.classList.contains("show");
  
        // Close all dropdown menus
        document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
          menu.classList.remove("show");
        });
  
        // Toggle this dropdown menu
        if (!isMenuOpen) {
          dropdownMenu.classList.add("show");
        }
      });
    });
  
  // Clicking outside of dropdowns closes them
  window.addEventListener("click", function (event) {
    if (!event.target.matches(".dropdown-toggle")) {
      document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
        menu.classList.remove("show");
      });
    }
  });
  
  function toggleReadMore() {
    var moreText = document.getElementById("more-text");
    var readMoreLink = document.querySelector(".read-more1");
  
    if (moreText.style.display === "none" || !moreText.style.display) {
      moreText.style.display = "block";
      readMoreLink.textContent = "read less";
    } else {
      moreText.style.display = "none";
      readMoreLink.textContent = "read more";
    }
  }

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".image-in-gallery");

  // Function to close enlarged image
  function closeEnlargedImg() {
    const enlarged = document.querySelector('.enlarged-image-container');
    if (enlarged) {
      enlarged.classList.remove("enlarged-image-container");
      enlarged.querySelector('.image-in-gallery').classList.remove("enlarged-image");
      enlarged.querySelector('.close-button').style.display = 'none';
      document.body.style.overflow = 'auto'; // Enable scrolling
      document.body.classList.remove("image-enlarged"); // Remove the flag indicating an image is enlarged
    }
  }

  images.forEach(img => {
    img.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent this click from being caught by the window click listener
      const container = this.parentElement;
      container.classList.add("enlarged-image-container");
      this.classList.add("enlarged-image");
      container.querySelector('.close-button').style.display = 'block';
      document.body.style.overflow = 'hidden'; // Disable scrolling
      document.body.classList.add("image-enlarged"); // Add a flag indicating an image is enlarged
    });
  });

  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent the click from closing the image immediately
      closeEnlargedImg();
    });
  });

  // Close image if clicking outside of it
  window.addEventListener("click", function(event) {
    if (document.body.classList.contains("image-enlarged") && !event.target.classList.contains("image-in-gallery")) {
      closeEnlargedImg();
    }
  });
});




  $(document).ready(function () {
    $('#video-carousel').carousel({
      touch: false
    });
  });
