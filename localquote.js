const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}



// Show new quote
function newQuote(){
    loading();
    // Pick a random quote from localQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

    // Check if author field is blank, and relace it with 'uknown'
    if (!quote.author) {
        authorText.textContent = '-- Unknown';
    } else{
        authorText.textContent = "-- " + quote.author;
    }

    // Check the quote length to determine the font size.
    if (quote.text.length >100) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote and hide loading animation
    quoteText.textContent = quote.text;
    complete();
}


// Get the quote from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Cathc error here

    }
}

// Allow user to tweet the quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${'"'+quoteText.textContent+'"'}  ${authorText.textContent}`;
window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
