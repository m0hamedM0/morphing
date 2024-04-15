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

    const concerts = [
      { date: 22, month: 3, year: 2024, url: "https://konzerthaus.at/konzert/eventid/61188" }, // April 22
      { date: 19, month: 4, year: 2024, url: "https://konzerthaus.at/konzert/eventid/61188" }  // Mai 19
    ];

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

      // Wochentage (optional)
      const weekdays = [];
      weekdays.forEach((weekday) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day", "weekday");
        dayElement.textContent = weekday;
        daysContainer.appendChild(dayElement);
      });

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

        // Konzert-Tage dynamisch hinzufügen
        for (const concert of concerts) {
          if (concert.month === month && concert.year === year && concert.date === i) {
            dayElement.classList.add("concert-day");
            dayElement.setAttribute("data-url", concert.url);
            dayElement.addEventListener("click", function () {
              const url = this.getAttribute("data-url");
              window.open(url, "_blank");
            });
          }
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
    // Check if the screen width is greater than 768 pixels
    if (window.innerWidth > 768) {
      const images = document.querySelectorAll(".image-in-gallery");
  
      function closeEnlargedImg() {
        const enlarged = document.querySelector('.enlarged-image-container');
        if (enlarged) {
          enlarged.classList.remove("enlarged-image-container");
          enlarged.querySelector('.image-in-gallery').classList.remove("enlarged-image");
          enlarged.querySelector('.close-button').style.display = 'none';
          document.body.style.overflow = 'auto';
          document.body.classList.remove("image-enlarged");
        }
      }
  
      images.forEach(img => {
        img.addEventListener("click", function(event) {
          event.stopPropagation();
          const container = this.parentElement;
          container.classList.add("enlarged-image-container");
          this.classList.add("enlarged-image");
          container.querySelector('.close-button').style.display = 'block';
          document.body.style.overflow = 'hidden';
          document.body.classList.add("image-enlarged");
        });
      });
  
      const closeButtons = document.querySelectorAll('.close-button');
      closeButtons.forEach(button => {
        button.addEventListener("click", function(event) {
          event.stopPropagation();
          closeEnlargedImg();
        });
      });
  
      window.addEventListener("click", function(event) {
        if (document.body.classList.contains("image-enlarged") && !event.target.classList.contains("image-in-gallery")) {
          closeEnlargedImg();
        }
      });
    }
  });
  




  $(document).ready(function () {
    $('#video-carousel').carousel({
      touch: false
    });
  });








  document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.people-container');
    const images = container.querySelectorAll('img'); // Select all images inside the container

    // Disable default drag behavior for images
    images.forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3;
        container.scrollLeft = scrollLeft - walk;
    });

    // Adjusted: Disable horizontal scrolling with the mouse wheel
    container.addEventListener('wheel', (e) => {
        if (e.deltaX !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaX;
        }
    }, { passive: false });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
        if (!e.touches.length) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX);
        container.scrollLeft = scrollLeft - walk;
    });
});



document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.people-container');

  // Disable scrolling functionality on mobile
  function disableScroll(e) {
      e.preventDefault();
  }

  if (window.innerWidth <= 768) {
      container.addEventListener('touchmove', disableScroll, { passive: false });
  }
});





function adjustCarouselHeight() {
  var carousel = document.getElementById('video-carousel');
  var activeProject = carousel.querySelector('.carousel-item.active');

  if (activeProject.classList.contains('project1')) {
    carousel.style.height = '200vh';
  } else if (activeProject.classList.contains('project2')) {
    carousel.style.height = '180vh';
  } else if (activeProject.classList.contains('project3')) {
    carousel.style.height = '100vh';
  } 
  else {
    carousel.style.height = '300vh';
  }
}

// Run this function on carousel slide change event
$('#video-carousel').on('slide.bs.carousel', adjustCarouselHeight);

// Also run this function when the page loads
window.onload = adjustCarouselHeight;








document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];

  toggleButton.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var currentPage = window.location.href;
  
  var enLink = document.querySelector('.nav-link[href="index.html"]');
  var deLink = document.querySelector('.nav-link[href="indexgerman.html"]');
  
  // Remove underline from both links initially
  enLink.style.textDecoration = 'none';
  deLink.style.textDecoration = 'none';

  if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) { // Assuming index.html is your default
    enLink.style.textDecoration = 'underline';
  } else if (currentPage.endsWith('indexgerman.html')) {
    deLink.style.textDecoration = 'underline';
  }
});





document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.querySelector('.toggle-button');
  toggleButton.addEventListener('click', function() {
      this.classList.toggle('is-active');
  });
});





document.addEventListener("DOMContentLoaded", function() {
  var languageSwitcher = document.getElementById('languageSwitcher');
  var navbar = document.querySelector('.navbar'); // Adjust the selector as needed
  var originalParent = languageSwitcher.parentElement;
  var desktopBreakpoint = 768; // Adjust as per your breakpoint

  function moveLanguageSwitcher() {
      if (window.innerWidth >= desktopBreakpoint) {
          // Move to navbar
          navbar.appendChild(languageSwitcher);
      } else {
          // Move back to original location
          originalParent.appendChild(languageSwitcher);
      }
  }

  window.addEventListener('resize', moveLanguageSwitcher);
  moveLanguageSwitcher(); // Initial check
});









function countdown() {
  const countToDate = new Date("2025-01-01T00:00:00").getTime();
  const now = new Date().getTime();
  const difference = countToDate - now;

  if (difference < 0) {
      document.getElementById('timer').innerText = "Event has started!";
      return; // Stop the countdown when the date is reached
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('timer').innerText = `Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  setTimeout(countdown, 1000);
}

countdown();
console.log(`Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
