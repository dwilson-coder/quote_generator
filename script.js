const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}



function showNewQuote(){
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

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
    removeLoadingSpinner();
}


// Get the quote from API
async function getQuotesFromAPI(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch (error) {
        // Catch error here

    }
}

// Allow user to tweet the quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${'"'+quoteText.textContent+'"'}  ${authorText.textContent}`;
window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotesFromAPI();
