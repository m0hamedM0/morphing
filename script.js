/*const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var docHeight = $(document).height();

    if (scroll + windowHeight > docHeight - 50) { // Adjust 50 to the threshold you prefer
        $("#bottom-image").css('opacity', '0.75');
    } else {
        $("#bottom-image").css('opacity', '0');
    }
});




const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const header = item.querySelector('h2');
        const description = item.querySelector('.description');

        header.addEventListener('mouseover', () => {
            description.classList.add('active');
        });

        header.addEventListener('mouseout', () => {
            if (!item.classList.contains('clicked')) {
                description.classList.remove('active');
            }
        });

        header.addEventListener('click', () => {
            if (item.classList.contains('clicked')) {
                description.classList.remove('active');
                item.classList.remove('clicked');
            } else {
                // Remove 'clicked' class from all other items
                items.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('clicked');
                        otherItem.querySelector('.description').classList.remove('active');
                    }
                });

                description.classList.add('active');
                item.classList.add('clicked');
            }
        });
    });


    window.addEventListener('load', () => {
        const slide = document.querySelector('.carousel-slide');
        const images = slide.querySelectorAll('.carousel-image');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        
        let counter = 1; // Start with the first image (index 0) being the 'previous' one so that the second image can be the 'active' one.
      
        // Function to update the active image
        function updateActiveImage() {
          images.forEach((img, index) => {
            img.classList.remove('active');
            if (index === counter) {
              img.classList.add('active');
            }
          });
        }
      
        // Initial update
        updateActiveImage();
      
        const imageWidth = images[0].clientWidth;
        const imageMarginRight = parseInt(window.getComputedStyle(images[0]).marginRight);
        const size = imageWidth + imageMarginRight;
      
        next.addEventListener('click', () => {
          if (counter < images.length - 2) { // Adjust the number based on how many images you want to show
            counter++;
            slide.style.transform = 'translateX(' + (-size * (counter - 1)) + 'px)';
            updateActiveImage();
          }
        });
      
        prev.addEventListener('click', () => {
          if (counter > 1) {
            counter--;
            slide.style.transform = 'translateX(' + (-size * (counter - 1)) + 'px)';
            updateActiveImage();
          }
        });
      
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        if (counter < document.querySelectorAll('.carousel-image').length - 3) {
          counter++;
          slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
      }
      if (e.key === 'ArrowLeft') {
        if (counter > 0) {
          counter--;
          slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
      }
    });
*/
//testtesttest

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
  
  /*images swiper
  document.addEventListener('DOMContentLoaded', function() {
      const track = document.getElementById("image-track");
  
      const handleOnDown = e => {
          track.dataset.mouseDownAt = e.clientX;
          // Other code if needed
      };
  
      const handleOnUp = () => {
          track.dataset.mouseDownAt = "0";  
          track.dataset.prevPercentage = track.dataset.percentage;
          // Other code if needed
      };
  
      const handleOnMove = e => {
          if (track.dataset.mouseDownAt === "0") return;
          
          const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
          const maxDelta = window.innerWidth / 2;
          const percentage = (mouseDelta / maxDelta) * -100;
          const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
          const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
          track.dataset.percentage = nextPercentage;
  
          track.animate({
              transform: `translate(${nextPercentage}%, -50%)`
          }, { duration: 1200, fill: "forwards" });
  
          for (const image of track.getElementsByClassName("image")) {
              image.animate({
                  objectPosition: `${100 + nextPercentage}% center`
              }, { duration: 1200, fill: "forwards" });
          }
      };
  
      // Move these inside the DOMContentLoaded listener
      window.onmousedown = e => handleOnDown(e);
      window.ontouchstart = e => handleOnDown(e.touches[0]);
      window.onmouseup = e => handleOnUp(e);
      window.ontouchend = e => handleOnUp(e.changedTouches[0]); // Use changedTouches for touchend
      window.onmousemove = e => handleOnMove(e);
      window.ontouchmove = e => handleOnMove(e.touches[0]);
  });
  */
  
  /* scrollbar images musicians
  document.addEventListener('DOMContentLoaded', (event) => {
      const imageTrack = document.getElementById('image-track');
      const violinistImage = document.getElementById('violinist-image');
    
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // Check if violinist image is intersecting with the image track
          if (entry.isIntersecting) {
            violinistImage.style.opacity = '0'; // Fade out
          } else {
            violinistImage.style.opacity = '1'; // Fade in
          }
        });
      }, { threshold: [0.3] }); // Adjust the threshold value as needed
    
      // Observe the image track
      observer.observe(imageTrack);
    });
  */
  
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

  images.forEach(img => {
    img.addEventListener("click", function() {
      const container = this.parentElement;
      container.classList.add("enlarged-image-container");
      this.classList.add("enlarged-image");
      container.querySelector('.close-button').style.display = 'block';
      document.body.style.overflow = 'hidden'; // Disable scrolling
    });
  });

  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent the click from closing the image immediately
      const container = this.parentElement;
      container.classList.remove("enlarged-image-container");
      container.querySelector('.image-in-gallery').classList.remove("enlarged-image");
      this.style.display = 'none';
      document.body.style.overflow = 'auto'; // Enable scrolling
    });
  });
});



  $(document).ready(function () {
    $('#video-carousel').carousel({
      touch: false
    });
  });
