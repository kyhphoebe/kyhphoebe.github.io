document.addEventListener("DOMContentLoaded", () => {
    // Grab all the links in your top navigation bar
    const navLinks = document.querySelectorAll(".masthead a"); 
    const mainContent = document.querySelector(".page__inner-wrap");
  
    navLinks.forEach(link => {
      link.addEventListener("click", async (e) => {
        // Prevent the browser's default full-page reload
        e.preventDefault(); 
        
        const targetUrl = link.href;
  
        try {
          // Fetch the HTML of the destination page in the background
          const response = await fetch(targetUrl);
          const htmlText = await response.text();
  
          // Parse the fetched HTML into a temporary document
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
  
          // Extract the new content section and swap it into the current page
          const newContent = doc.querySelector(".page__inner-wrap").innerHTML;
          mainContent.innerHTML = newContent;
  
          // Update the browser's URL bar so history/back buttons still work
          window.history.pushState({}, "", targetUrl);
  
        } catch (error) {
          console.error("Failed to fetch new page:", error);
          // Fallback to normal navigation if the fetch fails
          window.location.href = targetUrl; 
        }
      });
    });
  });